import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface Slide {
  title: string;
  img: StaticImageData;
}

interface Props {
  slides: Slide[];
}

export default function Slideshow(props: Props) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  function cycle() {
    if (!animating) {
      setAnimating(true);
      setIndex((i) => {
        if (i == props.slides.length - 1) {
          return 0;
        }

        return i + 1;
      });
    }
  }

  function onExitComplete() {
    setAnimating(false);
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute bottom-0 right-0 p-10 flex z-10">
        <button className="text-white text-6xl" onClick={cycle}>
          Cycle
        </button>
      </div>
      <AnimatePresence initial={false} onExitComplete={onExitComplete}>
        {props.slides.length ? (
          <motion.div
            className="absolute inset-0"
            key={index}
            initial={{
              clipPath: "inset(0 100% 0 0)",
            }}
            animate={{
              clipPath: "inset(0 0% 0 0%)",
            }}
            exit={{
              clipPath: "inset(0 0 0 100%)",
            }}
            transition={{
              duration: 2,
            }}
          >
            <motion.div
              initial={{
                x: "-20%",
              }}
              animate={{
                x: "0%",
              }}
              exit={{
                x: "20%",
              }}
              transition={{
                duration: 2,
              }}
              className="absolute inset-0 scale-150"
            >
              <Image
                src={props.slides[index].img}
                alt={`slide-${index}`}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 125%)",
              }}
            ></div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 125%)",
              }}
            ></div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 125%)",
              }}
            ></div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
