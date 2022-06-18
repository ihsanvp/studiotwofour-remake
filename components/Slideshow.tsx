import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";

interface Slide {
  title: string;
  img: StaticImageData;
}

interface Props {
  slides: Slide[];
}

export default function Slideshow(props: Props) {
  const [initial, setInitial] = useState(true);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(props.slides[index]?.title || "");
  const [isTextVisible, setTextVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  function cycle() {
    if (!animating) {
      setTimeout(() => setTextVisible(false), 500);
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
    setText(props.slides[index].title);
    setTextVisible(true);
  }

  useEffect(() => {
    setInitial(false);
  }, []);

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
            {/* Left Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(270deg, rgba(0,0,0,0) -25%, rgba(0,0,0,1) 125%)",
              }}
            ></div>
            {/* Top Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 125%)",
              }}
            ></div>
            {/* Top Gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 125%)",
              }}
            ></div>
            <div className="absolute inset-0">
              <div className="container pt-20 pb-10 h-full mx-auto">
                <div className="flex flex-col justify-center h-full gap-20">
                  <AnimatedText
                    initial={initial ? "visible" : "hidden"}
                    className="text-white text-8xl font-medium"
                    text={props.slides[index].title}
                  />
                  <div className="overflow-hidden">
                    <motion.button
                      initial={{
                        y: "150%",
                      }}
                      animate={{
                        y: 0,
                      }}
                      exit={{
                        y: 0,
                      }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="bg-white text-white border-white border-opacity-50 hover:border-opacity-100 rounded-sm hover:bg-opacity-100 hover:text-black border px-20 py-4 bg-opacity-10 backdrop-blur-md"
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
