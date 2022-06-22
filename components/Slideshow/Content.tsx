import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { getBtnVariants } from "./variants";

interface Props {
  btnDuration: number;
  btnDelay: number;
  isInitialRender: boolean;
  text: string;
}

export default function Content(props: Props) {
  const btnVariants = getBtnVariants(props.btnDuration, props.btnDelay);

  return (
    <div className="absolute inset-0">
      <div className="container pt-20 pb-10 h-full mx-auto">
        <div className="flex flex-col justify-center h-full gap-10 md:gap-12 2xl:gap-20">
          <div className="text-center md:text-left">
            <AnimatedText
              initial={props.isInitialRender ? "visible" : "hidden"}
              className="text-white text-[10vw] md:text-[4vw] leading-none 2xl:text-7xl font-medium"
              text={props.text}
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
  );
}
