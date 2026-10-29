"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  CircleDot,
  Info,
  Loader2,
  Lock,
  Pause,
  Play,
  Search,
  Wrench,
  X,
  XOctagon,
} from "lucide-react";

/* 概念示範：所有資料皆為前端模擬，與任何公司實際系統無關。 */

type Status = "run" | "idle" | "down" | "pm";
type Role = "operator" | "engineer" | "manager";
type SortKey = "id" | "area" | "status" | "utilization" | "updatedAgo";

type Alarm = { code: string; message: string; acked: boolean };
type Tool = {
  id: string;
  area: string;
  status: Status;
  utilization: number;
  lot: string;
  recipe: string;
  updatedAgo: number;
  alarms: Alarm[];
};
type LogEntry = { id: number; text: string; role: Role };

const AREAS = ["黃光", "蝕刻", "薄膜", "研磨", "擴散"] as const;
const AREA_PREFIX: Record<string, string> = {
  黃光: "PH",
  蝕刻: "ET",
  薄膜: "CV",
  研磨: "CM",
  擴散: "DF",
};

const STATUS_META: Record<Status, { label: string; Icon: typeof CircleDot }> = {
  run: { label: "運轉", Icon: CheckCircle2 },
  idle: { label: "待機", Icon: CircleDot },
  down: { label: "異常", Icon: XOctagon },
  pm: { label: "保養", Icon: Wrench },
};
const STATUS_ORDER: Status[] = ["down", "pm", "idle", "run"];

const ROLE_META: Record<Role, { label: string; canAck: boolean; canPm: boolean; hint: string }> = {
  operator: { label: "作業員", canAck: false, canPm: false, hint: "可查看機台與告警，無法確認告警或切換保養。" },
  engineer: { label: "製程工程師", canAck: true, canPm: false, hint: "可確認告警；切換保養需由值班主管操作。" },
  manager: { label: "值班主管", canAck: true, canPm: true, hint: "可確認告警，也可以將機台切換為保養。" },
};

const INITIAL_NOTICE = "點選任一機台可查看告警與操作；右上角可切換檢視身分，比較不同權限。";

const ALARM_POOL = [
  { code: "E-1042", message: "腔體壓力超出管制上限" },
  { code: "E-2210", message: "傳送手臂定位逾時" },
  { code: "W-0315", message: "冷卻水流量偏低" },
  { code: "W-0871", message: "耗材使用量接近保養門檻" },
];

// 以固定種子產生初始資料，確保預渲染與瀏覽器端結果一致。
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function createTools(): Tool[] {
  const rand = seeded(228);
  const statuses: Status[] = ["run", "run", "run", "run", "idle", "run", "down", "pm"];
  return AREAS.flatMap((area, areaIndex) =>
    Array.from({ length: 4 }, (_, i) => {
      const status = statuses[Math.floor(rand() * statuses.length)];
      const alarmCount = status === "down" ? 2 : rand() > 0.75 ? 1 : 0;
      return {
        id: `${AREA_PREFIX[area]}-${String(i + 1).padStart(2, "0")}`,
        area,
        status,
        utilization:
          status === "run" ? 78 + Math.round(rand() * 20) : Math.round(rand() * 55),
        lot: status === "run" ? `LT${2400 + areaIndex * 37 + i * 11}` : "—",
        recipe: `RCP-${area === "黃光" ? "LITH" : AREA_PREFIX[area]}-${10 + i}`,
        updatedAgo: Math.floor(rand() * 40),
        // 異常機台帶錯誤碼（E-），其餘只會出現警告碼（W-）。
        alarms: Array.from({ length: alarmCount }, (_, k) => ({
          ...ALARM_POOL[status === "down" ? k : 2 + ((areaIndex + i) % 2)],
          acked: false,
        })),
      };
    })
  );
}

function StatusBadge({ status }: { status: Status }) {
  const { label, Icon } = STATUS_META[status];
  return (
    <span className={`fab-status fab-status--${status}`}>
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  );
}

export function FabConsoleDemo() {
  const [tools, setTools] = useState<Tool[]>(createTools);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [statusFilter, setStatusFilter] = useState<Status[]>([]);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "status", dir: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("engineer");
  const [dense, setDense] = useState(false);
  const [live, setLive] = useState(true);
  const [confirmPm, setConfirmPm] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  // 載入與提示狀態：整體切換用遮罩，詳細資料用骨架，單一按鈕用行內轉圈。
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState(INITIAL_NOTICE);
  const [roleChoice, setRoleChoice] = useState<Role>("engineer");
  const [panelLoading, setPanelLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const selectToken = useRef(0);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      timers.current.push(window.setTimeout(resolve, ms));
    });

  const withLoading = async (label: string, apply: () => void, done?: string, ms = 500) => {
    setBusy(label);
    await wait(ms);
    apply();
    setBusy(null);
    if (done) setNotice(done);
  };

  // 模擬即時資料：每 2 秒更新部分機台稼動率與資料新鮮度。
  useEffect(() => {
    if (!live) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setInterval(() => {
      setTools((current) =>
        current.map((tool) => {
          const touched = Math.random() < 0.3 && tool.status === "run";
          return touched
            ? {
                ...tool,
                utilization: Math.min(99, Math.max(70, tool.utilization + Math.round(Math.random() * 6 - 3))),
                updatedAgo: 0,
              }
            : { ...tool, updatedAgo: tool.updatedAgo + 2 };
        })
      );
    }, reduceMotion ? 5000 : 2000);
    return () => window.clearInterval(timer);
  }, [live]);

  const permissions = ROLE_META[role];
  const selected = tools.find((tool) => tool.id === selectedId) ?? null;

  const visible = useMemo(() => {
    const keyword = query.trim().toUpperCase();
    return tools
      .filter((tool) => area === "all" || tool.area === area)
      .filter((tool) => statusFilter.length === 0 || statusFilter.includes(tool.status))
      .filter(
        (tool) =>
          !keyword ||
          tool.id.includes(keyword) ||
          tool.lot.includes(keyword) ||
          tool.recipe.includes(keyword)
      )
      .sort((a, b) => {
        const av = sort.key === "status" ? STATUS_ORDER.indexOf(a.status) : a[sort.key];
        const bv = sort.key === "status" ? STATUS_ORDER.indexOf(b.status) : b[sort.key];
        return (av > bv ? 1 : av < bv ? -1 : 0) * sort.dir;
      });
  }, [tools, query, area, statusFilter, sort]);

  const counts = useMemo(
    () =>
      STATUS_ORDER.reduce(
        (acc, status) => ({ ...acc, [status]: tools.filter((t) => t.status === status).length }),
        {} as Record<Status, number>
      ),
    [tools]
  );
  const openAlarms = tools.reduce((sum, t) => sum + t.alarms.filter((a) => !a.acked).length, 0);
  const avgUtil = Math.round(tools.reduce((sum, t) => sum + t.utilization, 0) / tools.length);

  const addLog = (text: string) =>
    setLog((current) => [{ id: (current[0]?.id ?? 0) + 1, text, role }, ...current].slice(0, 6));

  const toggleStatus = (status: Status) => {
    const next = statusFilter.includes(status)
      ? statusFilter.filter((s) => s !== status)
      : [...statusFilter, status];
    void withLoading(
      "正在套用狀態篩選…",
      () => setStatusFilter(next),
      next.length ? `已篩選狀態：${next.map((s) => STATUS_META[s].label).join("、")}` : "已顯示所有狀態的機台",
      350
    );
  };

  const changeRole = (next: Role) => {
    setRoleChoice(next);
    void withLoading(
      `正在切換為「${ROLE_META[next].label}」身分…`,
      () => {
        setRole(next);
        setConfirmPm(false);
      },
      `目前身分：${ROLE_META[next].label}。${ROLE_META[next].hint}`,
      700
    );
  };

  const changeArea = (next: string) =>
    void withLoading(
      next === "all" ? "正在載入全部區域…" : `正在載入${next}區機台…`,
      () => setArea(next),
      next === "all" ? "已顯示全部區域的機台" : `已篩選區域：${next}區`,
      450
    );

  const selectTool = async (id: string) => {
    if (id === selectedId && !panelLoading) return;
    const token = ++selectToken.current;
    setSelectedId(id);
    setConfirmPm(false);
    setPanelLoading(true);
    await wait(400);
    if (token === selectToken.current) setPanelLoading(false);
  };

  const toggleSort = (key: SortKey) =>
    setSort((current) => ({ key, dir: current.key === key ? (current.dir === 1 ? -1 : 1) : 1 }));

  const ackAlarm = async (code: string) => {
    if (!selected || pendingAction) return;
    setPendingAction(code);
    await wait(600);
    setTools((current) =>
      current.map((tool) =>
        tool.id === selected.id
          ? { ...tool, alarms: tool.alarms.map((a) => (a.code === code ? { ...a, acked: true } : a)) }
          : tool
      )
    );
    addLog(`確認 ${selected.id} 告警 ${code}`);
    setPendingAction(null);
    setNotice(`已確認 ${selected.id} 的告警 ${code}，並寫入操作紀錄。`);
  };

  const switchToPm = async () => {
    if (!selected || pendingAction) return;
    setPendingAction("pm");
    await wait(900);
    setTools((current) =>
      current.map((tool) =>
        tool.id === selected.id ? { ...tool, status: "pm", lot: "—", utilization: 0, updatedAgo: 0 } : tool
      )
    );
    addLog(`將 ${selected.id} 切換為保養狀態`);
    setConfirmPm(false);
    setPendingAction(null);
    setNotice(`${selected.id} 已切換為保養，停止接收派工。`);
  };

  const sortHeader = (key: SortKey, label: string) => {
    const active = sort.key === key;
    return (
      <th aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
        <button type="button" className="fab-sort" onClick={() => toggleSort(key)}>
          {label}
          {active && (sort.dir === 1 ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
        </button>
      </th>
    );
  };

  return (
    <div className={`fab-console ${dense ? "fab-console--dense" : ""}`}>
      <div className="fab-console__bar">
        <div className="fab-console__title">
          <span className={`fab-live-dot ${live ? "is-live" : ""}`} aria-hidden="true" />
          <strong>設備監控主控台</strong>
          <span className="fab-console__hint">概念示範・模擬資料</span>
        </div>
        <div className="fab-console__controls">
          <label className="fab-field">
            <span>檢視身分</span>
            <select value={roleChoice} disabled={Boolean(busy)} onChange={(e) => changeRole(e.target.value as Role)}>
              {(Object.keys(ROLE_META) as Role[]).map((key) => (
                <option key={key} value={key}>
                  {ROLE_META[key].label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="fab-btn"
            aria-pressed={dense}
            disabled={Boolean(busy)}
            onClick={() =>
              void withLoading(
                "正在調整表格密度…",
                () => setDense(!dense),
                dense ? "已切換為標準密度" : "已切換為緊湊密度，一次可以看到更多機台",
                350
              )
            }
          >
            {dense ? "標準密度" : "緊湊密度"}
          </button>
          <button
            type="button"
            className="fab-btn"
            aria-pressed={!live}
            onClick={() => {
              setLive(!live);
              setNotice(live ? "已暫停即時更新，畫面停留在目前的資料。" : "已恢復即時更新，每 2 秒更新一次。");
            }}
          >
            {live ? <Pause size={14} /> : <Play size={14} />}
            {live ? "暫停更新" : "恢復更新"}
          </button>
        </div>
      </div>

      <div className="fab-kpis">
        <div className="fab-kpi">
          <span>機台總數</span>
          <strong>{tools.length}</strong>
        </div>
        <div className="fab-kpi">
          <span>運轉中</span>
          <strong>
            {counts.run}
            <small> / {Math.round((counts.run / tools.length) * 100)}%</small>
          </strong>
        </div>
        <div className={`fab-kpi ${openAlarms ? "fab-kpi--alert" : ""}`}>
          <span>未確認告警</span>
          <strong>{openAlarms}</strong>
        </div>
        <div className="fab-kpi">
          <span>平均稼動率</span>
          <strong>{avgUtil}%</strong>
        </div>
      </div>

      <div className="fab-filters">
        <label className="fab-search">
          <Search size={15} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋機台、批號、配方…"
            aria-label="搜尋機台、批號或配方"
          />
        </label>
        <label className="fab-field">
          <span className="sr-only">區域</span>
          <select value={area} disabled={Boolean(busy)} onChange={(e) => changeArea(e.target.value)} aria-label="篩選區域">
            <option value="all">全部區域</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}區
              </option>
            ))}
          </select>
        </label>
        <div className="fab-chips" role="group" aria-label="篩選狀態">
          {STATUS_ORDER.map((status) => (
            <button
              type="button"
              key={status}
              className={`fab-chip fab-chip--${status}`}
              aria-pressed={statusFilter.includes(status)}
              disabled={Boolean(busy)}
              onClick={() => toggleStatus(status)}
            >
              {STATUS_META[status].label} <span>{counts[status]}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="fab-notice" aria-live="polite">
        <Info size={14} aria-hidden="true" />
        <span>{notice}</span>
      </p>

      <div className="fab-body" aria-busy={Boolean(busy)}>
        {busy && (
          <div className="fab-loading" role="status">
            <span className="fab-loading__pill">
              <Loader2 size={16} className="fab-spin" aria-hidden="true" />
              {busy}
            </span>
          </div>
        )}
        <div className="fab-table-wrap">
          <table className="fab-table">
            <caption className="sr-only">機台狀態列表，點選列可查看詳細資訊</caption>
            <thead>
              <tr>
                {sortHeader("id", "機台")}
                {sortHeader("area", "區域")}
                {sortHeader("status", "狀態")}
                {sortHeader("utilization", "稼動率")}
                <th>批號</th>
                {sortHeader("updatedAgo", "資料更新")}
              </tr>
            </thead>
            <tbody>
              {visible.map((tool) => {
                const pending = tool.alarms.filter((a) => !a.acked).length;
                return (
                  <tr
                    key={tool.id}
                    className={selectedId === tool.id ? "is-selected" : undefined}
                    onClick={() => void selectTool(tool.id)}
                  >
                    <td>
                      <button
                        type="button"
                        className="fab-row-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          void selectTool(tool.id);
                        }}
                      >
                        {tool.id}
                      </button>
                      {pending > 0 && (
                        <span className="fab-alarm-count" title={`${pending} 筆未確認告警`}>
                          <AlertTriangle size={11} aria-hidden="true" />
                          {pending}
                        </span>
                      )}
                    </td>
                    <td>{tool.area}</td>
                    <td>
                      <StatusBadge status={tool.status} />
                    </td>
                    <td>
                      <div className="fab-meter" aria-label={`稼動率 ${tool.utilization}%`}>
                        <span style={{ width: `${tool.utilization}%` }} />
                      </div>
                      <span className="fab-num">{tool.utilization}%</span>
                    </td>
                    <td className="fab-num">{tool.lot}</td>
                    <td className={`fab-num ${tool.updatedAgo > 30 ? "fab-stale" : ""}`}>
                      {tool.updatedAgo === 0 ? "剛剛" : `${tool.updatedAgo} 秒前`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {visible.length === 0 && (
            <div className="fab-empty">
              <p>沒有符合條件的機台。</p>
              <button
                type="button"
                className="fab-btn"
                onClick={() =>
                  void withLoading(
                    "正在清除篩選…",
                    () => {
                      setQuery("");
                      setArea("all");
                      setStatusFilter([]);
                    },
                    "已清除篩選，顯示全部機台",
                    350
                  )
                }
              >
                清除所有篩選
              </button>
            </div>
          )}
        </div>

        <aside className="fab-panel" aria-live="polite">
          {selected && panelLoading ? (
            <div className="fab-skeleton" role="status">
              <span className="fab-skeleton__label">
                <Loader2 size={14} className="fab-spin" aria-hidden="true" />
                正在載入 {selected.id} 詳細資料…
              </span>
              <span className="fab-skeleton__line" style={{ width: "45%" }} />
              <span className="fab-skeleton__line" style={{ width: "30%" }} />
              <span className="fab-skeleton__line" style={{ width: "90%" }} />
              <span className="fab-skeleton__line" style={{ width: "75%" }} />
            </div>
          ) : selected ? (
            <>
              <div className="fab-panel__head">
                <div>
                  <strong>{selected.id}</strong>
                  <span>{selected.area}區・{selected.recipe}</span>
                </div>
                <button type="button" className="fab-icon-btn" aria-label="關閉詳細資訊" onClick={() => setSelectedId(null)}>
                  <X size={16} />
                </button>
              </div>
              <StatusBadge status={selected.status} />

              <h4>告警紀錄</h4>
              {selected.alarms.length === 0 ? (
                <p className="fab-muted">目前沒有告警。</p>
              ) : (
                <ul className="fab-alarms">
                  {selected.alarms.map((alarm) => (
                    <li key={alarm.code} className={alarm.acked ? "is-acked" : undefined}>
                      <div>
                        <code>{alarm.code}</code>
                        <span>{alarm.message}</span>
                      </div>
                      {alarm.acked ? (
                        <span className="fab-muted">已確認</span>
                      ) : permissions.canAck ? (
                        <button
                          type="button"
                          className="fab-btn fab-btn--sm"
                          disabled={Boolean(pendingAction)}
                          onClick={() => void ackAlarm(alarm.code)}
                        >
                          {pendingAction === alarm.code ? (
                            <>
                              <Loader2 size={12} className="fab-spin" aria-hidden="true" /> 確認中…
                            </>
                          ) : (
                            "確認"
                          )}
                        </button>
                      ) : (
                        <span className="fab-locked" title="此身分無確認權限">
                          <Lock size={12} aria-hidden="true" /> 無權限
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <h4>機台操作</h4>
              {!permissions.canPm ? (
                <p className="fab-locked">
                  <Lock size={12} aria-hidden="true" /> 切換保養需「值班主管」身分
                </p>
              ) : selected.status === "pm" ? (
                <p className="fab-muted">機台已在保養狀態。</p>
              ) : confirmPm ? (
                <div className="fab-confirm" role="alert">
                  <p>
                    確定將 <strong>{selected.id}</strong> 切換為保養？
                    {selected.lot === "—" ? "機台將停止接收派工。" : `進行中的批號 ${selected.lot} 將暫停派工。`}
                  </p>
                  <div>
                    <button
                      type="button"
                      className="fab-btn fab-btn--danger"
                      disabled={pendingAction === "pm"}
                      onClick={() => void switchToPm()}
                    >
                      {pendingAction === "pm" ? (
                        <>
                          <Loader2 size={14} className="fab-spin" aria-hidden="true" /> 切換中…
                        </>
                      ) : (
                        "確認切換"
                      )}
                    </button>
                    <button
                      type="button"
                      className="fab-btn"
                      disabled={pendingAction === "pm"}
                      onClick={() => setConfirmPm(false)}
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="fab-btn" onClick={() => setConfirmPm(true)}>
                  <Wrench size={14} /> 切換為保養
                </button>
              )}
            </>
          ) : (
            <p className="fab-muted fab-panel__placeholder">點選左側任一機台，查看告警與可執行操作。</p>
          )}

          <h4>操作紀錄</h4>
          {log.length === 0 ? (
            <p className="fab-muted">尚無操作。每筆操作會記錄執行身分，方便交接追溯。</p>
          ) : (
            <ol className="fab-log">
              {log.map((entry) => (
                <li key={entry.id}>
                  <span>{ROLE_META[entry.role].label}</span>
                  {entry.text}
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
    </div>
  );
}
