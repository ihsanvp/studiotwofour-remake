import { AnimatePresence, motion, Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";
import Controls from "./Controls";
import { getBtnVariants, getImgVariants, getSlideVariants } from "./variants";
import styles from "./Slideshow.module.css";

interface Slide {
  title: string;
  img: StaticImageData;
}

interface Props {
  slides: Slide[];
  slideDuration: number;
  imgDuration: number;
  btnDuration: number;
  btnDelay: number;
}

export default function Slideshow(props: Props) {
  const [initial, setInitial] = useState(true);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slideVariants = getSlideVariants(props.slideDuration);
  const imgVariants = getImgVariants(props.imgDuration);
  const btnVariants = getBtnVariants(props.btnDuration, props.btnDelay);

  function cycle() {
    if (!animating) {
      setAnimating(true);
      setIndex((i) => (i + 1) % props.slides.length);
    }
  }

  function onExitComplete() {
    setAnimating(false);
  }

  useEffect(() => {
    setInitial(false);
  }, []);

  return (
    <Fragment>
      <div className="w-full h-full relative overflow-hidden">
        <Controls onCycle={cycle} />
        <AnimatePresence initial={false} onExitComplete={onExitComplete}>
          {props.slides.length ? (
            <motion.div
              className="absolute inset-0"
              key={index}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                className="absolute inset-0 scale-150"
                variants={imgVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Image
                  src={props.slides[index].img}
                  alt={`slide-${index}`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
              {/* Backdrop */}
              <div className={`absolute inset-0 ${styles.gradientleft}`}></div>
              <div
                className={`absolute inset-0 md:hidden ${styles.gradientright}`}
              ></div>
              <div className={`absolute inset-0 ${styles.gradienttop}`}></div>
              <div
                className={`absolute inset-0 ${styles.gradientbottom}`}
              ></div>
              {/* End Backdrop */}
              <div className="absolute inset-0">
                <div className="container pt-20 pb-10 h-full mx-auto">
                  <div className="flex flex-col justify-center h-full gap-10 md:gap-12 2xl:gap-20">
                    <div className="text-center md:text-left">
                      <AnimatedText
                        initial={initial ? "visible" : "hidden"}
                        className="text-white text-[10vw] md:text-[4vw] leading-none 2xl:text-7xl font-medium"
                        text={props.slides[index].title}
                      />
                    </div>
                    <div className="overflow-hidden flex items-center justify-center md:justify-start">
                      <motion.button
                        className="
                          bg-white text-white border-white border-opacity-50 hover:border-opacity-100
                          rounded-sm hover:bg-opacity-100 hover:text-black border px-14 py-3 2xl:px-20 2xl:py-4
                          bg-opacity-10 backdrop-blur-md text-sm 2xl:text-base
                        "
                        variants={btnVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
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
    </Fragment>
  );
}
