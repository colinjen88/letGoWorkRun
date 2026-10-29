"use client";

import { useRef } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

type Shot = { src: string; width: number; height: number; alt: string };

// 截圖在本頁放大檢視，不另開圖片網址，讀者不會離開案例頁。
export function ShotLightbox({ image, caption }: { image: Shot; caption: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className="ac-shot-figure">
      <button
        type="button"
        className="ac-shot"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`放大檢視：${caption}`}
      >
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 960px) 100vw, 760px" />
        <span className="ac-shot__hint" aria-hidden="true">
          <Maximize2 size={14} /> 放大
        </span>
      </button>
      <figcaption>{caption}</figcaption>

      <dialog
        ref={dialogRef}
        className="ac-lightbox"
        aria-label={caption}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="ac-lightbox__inner">
          <div className="ac-lightbox__bar">
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
