import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { getImgVariants } from "./variants";
import Image from "next/image";

interface Props {
  index: number;
  src: StaticImageData;
  duration: number;
}

export default function Background(props: Props) {
  const variants = getImgVariants(props.duration);

  return (
    <motion.div
      className="absolute inset-0 scale-150"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Image
        src={props.src}
        alt={`slide-${props.index}`}
        layout="fill"
        objectFit="cover"
      />
    </motion.div>
  );
}
