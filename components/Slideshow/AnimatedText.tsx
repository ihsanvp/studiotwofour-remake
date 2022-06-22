import React, { ReactNode, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface WordWrapperProps {
  children: ReactNode;
  className?: string;
}

interface CharacterWrapperProps {
  content: string;
  variants: Variants;
}

interface Props {
  text: string;
  initial: "visible" | "hidden";
  className?: string;
}

// Word wrapper
function WordWrapper(props: WordWrapperProps) {
  // We'll do this to prevent wrapping of words using CSS
  return (
    <span className={`inline-block ${props.className}`}>{props.children}</span>
  );
}

function CharacterWrapper(props: CharacterWrapperProps) {
  return (
    <span className="pb-3 md:pb-4 overflow-hidden inline-block">
      <motion.span className="inline-block" variants={props.variants}>
        {props.content}
      </motion.span>
    </span>
  );
}

// Map API "type" vaules to JSX tag names
const tagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
export default function AnimatedText(props: Props) {
  const [animate, setAnimate] = useState<"hidden" | "visible">(props.initial);

  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: "200%",
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  //  Split each word of props.text into an array
  const splitWords = props.text.split(" ");

  // Create storage array
  const words: string[][] = [];

  // Push each word into words array
  for (const item of splitWords) {
    words.push(item.split(""));
  }

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0");
  });

  // Get the tag name from tagMap
  // const Tag = tagMap[props.type];

  function renderText() {
    let className = "";

    return words.map((word, index) => {
      if (word.length == 2 && word[0] == "|") {
        className = "text-yellow-500";
        console.log("ok");
        return;
      }

      if (word.length == 2 && word[0] == "\n") {
        return <br key={index} />;
      }
      return (
        // Wrap each word in the Wrapper component
        <WordWrapper key={index} className={className}>
          {words[index].flat().map((element, index) => {
            return (
              <CharacterWrapper key={index} content={element} variants={item} />
            );
          })}
        </WordWrapper>
      );
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate("visible"), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate={animate}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.025,
          },
        },
      }}
      className={props.className}
    >
      {renderText()}
    </motion.div>
  );
}
