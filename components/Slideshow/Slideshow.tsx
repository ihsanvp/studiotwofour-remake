import { AnimatePresence } from "framer-motion";
import { StaticImageData } from "next/image";
import { Fragment, useEffect, useState } from "react";
import Controls from "./Controls";
import Slide from "./Slide";

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
            <Slide
              key={index}
              index={index}
              src={props.slides[index].img}
              text={props.slides[index].title}
              slideDuration={props.slideDuration}
              imgDuration={props.imgDuration}
              btnDuration={props.btnDuration}
              btnDelay={props.btnDelay}
              isInitialRender={initial}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </Fragment>
  );
}
