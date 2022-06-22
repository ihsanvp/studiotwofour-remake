import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { getSlideVariants } from "./variants";
import Background from "./Background";
import Backdrop from "./Backdrop";
import Content from "./Content";

interface Props {
  index: number;
  src: StaticImageData;
  text: string;
  slideDuration: number;
  imgDuration: number;
  btnDuration: number;
  btnDelay: number;
  isInitialRender: boolean;
}

export default function Slide(props: Props) {
  const slideVariants = getSlideVariants(props.slideDuration);

  return (
    <motion.div
      className="absolute inset-0"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Background
        index={props.index}
        src={props.src}
        duration={props.imgDuration}
      />
      <Backdrop />
      <Content
        text={props.text}
        btnDuration={props.btnDuration}
        btnDelay={props.btnDelay}
        isInitialRender={props.isInitialRender}
      />
    </motion.div>
  );
}
