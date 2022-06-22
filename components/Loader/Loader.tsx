import { createContext, Fragment, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  imageUrls: string[];
}

export const LoaderContext = createContext(false);

export default function Loader(props: Props) {
  const [ready, setReady] = useState(false);

  async function loadFonts() {
    await document.fonts.ready;
  }

  function loadImages(): Promise<void>[] {
    const cache = document.createElement("div");

    cache.id = "cache";
    cache.style.position = "absolute";
    cache.style.zIndex = "-1000";
    cache.style.opacity = "0";
    cache.style.visibility = "hidden";
    cache.style.display = "none";

    document.body.appendChild(cache);

    function preload(url: string): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          cache.appendChild(img);
          resolve();
        };
        img.onerror = () => resolve();

        img.src = url;
      });
    }

    const promises = [];

    for (const url of props.imageUrls) {
      promises.push(preload(url));
    }

    return promises;
  }

  async function load() {
    await Promise.all([loadFonts(), ...loadImages()]);

    setReady(true);
  }

  function init() {
    load();
  }

  useEffect(init, []);

  return (
    <Fragment>
      <LoaderContext.Provider value={ready}>
        {!ready ? (
          <div className="fixed z-[9999] inset-0 bg-white flex flex-col items-center justify-center">
            <div className="loader triangle">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>
          </div>
        ) : null}
        {props.children}
      </LoaderContext.Provider>
      <style jsx>
        {`
          .loader {
            --path: #2f3545;
            --dot: #5628ee;
            --duration: 3s;
            width: 44px;
            height: 44px;
            position: relative;
          }
          .loader:before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            position: absolute;
            display: block;
            background: var(--dot);
            top: 37px;
            left: 19px;
            transform: translate(-18px, -18px);
            -webkit-animation: dotRect var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
            animation: dotRect var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
          }
          .loader svg {
            display: block;
            width: 100%;
            height: 100%;
          }
          .loader svg rect,
          .loader svg polygon,
          .loader svg circle {
            fill: none;
            stroke: var(--path);
            stroke-width: 10px;
            stroke-linejoin: round;
            stroke-linecap: round;
          }
          .loader svg polygon {
            stroke-dasharray: 145 76 145 76;
            stroke-dashoffset: 0;
            -webkit-animation: pathTriangle var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
            animation: pathTriangle var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
          }
          .loader svg rect {
            stroke-dasharray: 192 64 192 64;
            stroke-dashoffset: 0;
            -webkit-animation: pathRect 3s
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
            animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86)
              infinite;
          }
          .loader svg circle {
            stroke-dasharray: 150 50 150 50;
            stroke-dashoffset: 75;
            -webkit-animation: pathCircle var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
            animation: pathCircle var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
          }
          .loader.triangle {
            width: 48px;
          }
          .loader.triangle:before {
            left: 21px;
            transform: translate(-10px, -18px);
            -webkit-animation: dotTriangle var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
            animation: dotTriangle var(--duration)
              cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
          }

          @-webkit-keyframes pathTriangle {
            33% {
              stroke-dashoffset: 74;
            }
            66% {
              stroke-dashoffset: 147;
            }
            100% {
              stroke-dashoffset: 221;
            }
          }

          @keyframes pathTriangle {
            33% {
              stroke-dashoffset: 74;
            }
            66% {
              stroke-dashoffset: 147;
            }
            100% {
              stroke-dashoffset: 221;
            }
          }
          @-webkit-keyframes dotTriangle {
            33% {
              transform: translate(0, 0);
            }
            66% {
              transform: translate(10px, -18px);
            }
            100% {
              transform: translate(-10px, -18px);
            }
          }
          @keyframes dotTriangle {
            33% {
              transform: translate(0, 0);
            }
            66% {
              transform: translate(10px, -18px);
            }
            100% {
              transform: translate(-10px, -18px);
            }
          }
          @-webkit-keyframes pathRect {
            25% {
              stroke-dashoffset: 64;
            }
            50% {
              stroke-dashoffset: 128;
            }
            75% {
              stroke-dashoffset: 192;
            }
            100% {
              stroke-dashoffset: 256;
            }
          }
          @keyframes pathRect {
            25% {
              stroke-dashoffset: 64;
            }
            50% {
              stroke-dashoffset: 128;
            }
            75% {
              stroke-dashoffset: 192;
            }
            100% {
              stroke-dashoffset: 256;
            }
          }
          @-webkit-keyframes dotRect {
            25% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(18px, -18px);
            }
            75% {
              transform: translate(0, -36px);
            }
            100% {
              transform: translate(-18px, -18px);
            }
          }
          @keyframes dotRect {
            25% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(18px, -18px);
            }
            75% {
              transform: translate(0, -36px);
            }
            100% {
              transform: translate(-18px, -18px);
            }
          }
          @-webkit-keyframes pathCircle {
            25% {
              stroke-dashoffset: 125;
            }
            50% {
              stroke-dashoffset: 175;
            }
            75% {
              stroke-dashoffset: 225;
            }
            100% {
              stroke-dashoffset: 275;
            }
          }
          @keyframes pathCircle {
            25% {
              stroke-dashoffset: 125;
            }
            50% {
              stroke-dashoffset: 175;
            }
            75% {
              stroke-dashoffset: 225;
            }
            100% {
              stroke-dashoffset: 275;
            }
          }
          .loader {
            display: inline-block;
            margin: 0 16px;
          }
        `}
      </style>
    </Fragment>
  );
}
