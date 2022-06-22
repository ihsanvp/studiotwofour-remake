import { Variants } from "framer-motion";

export function getSlideVariants(duration: number): Variants {
  return {
    initial: {
      clipPath: "inset(0 100% 0 0)",
    },
    animate: {
      clipPath: "inset(0 0% 0 0%)",
      transition: {
        duration,
      },
    },
    exit: {
      clipPath: "inset(0 0 0 100%)",
      transition: {
        duration,
      },
    },
  };
}

export function getImgVariants(duration: number): Variants {
  return {
    initial: {
      x: "-20%",
    },
    animate: {
      x: 0,
      transition: {
        duration,
      },
    },
    exit: {
      x: "20%",
      transition: {
        duration,
      },
    },
  };
}

export function getBtnVariants(duration: number, delay: number): Variants {
  return {
    initial: {
      y: "175%",
      skewY: 10,
    },
    animate: {
      y: 0,
      skewY: 0,
      transition: {
        duration,
        delay,
      },
    },
    exit: {
      y: 0,
      skewY: 0,
      transition: {
        duration,
        delay,
      },
    },
  };
}
