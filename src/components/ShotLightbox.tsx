"use client";

import { useRef } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

type Shot = { src: string; width: number; height: number; alt: string };

// 截圖在本頁放大檢視，不另開圖片網址，讀者不會離開案例頁。
export function ShotLightbox({
  image,
  caption,
  figureClassName = "ac-shot-figure",
  triggerClassName = "ac-shot",
  sizes = "(max-width: 960px) 100vw, 760px",
  priority = false,
}: {
  image: Shot;
  caption: string;
  figureClassName?: string;
  triggerClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className={figureClassName || undefined}>
      <button
        type="button"
        className={`shot-trigger ${triggerClassName}`}
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`放大檢視：${caption}`}
      >
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority} />
        <span className="shot-hint" aria-hidden="true">
          <Maximize2 size={14} /> 放大
        </span>
      </button>
      <figcaption>{caption}</figcaption>

      <dialog
        ref={dialogRef}
        className="shot-lightbox"
        aria-label={caption}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="shot-lightbox__inner">
          <div className="shot-lightbox__bar">
            <span>{caption}</span>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="關閉放大檢視" autoFocus>
              <X size={18} />
            </button>
          </div>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="100vw" />
        </div>
      </dialog>
    </figure>
  );
}
