import React, { useState, useEffect, ReactNode, Fragment } from "react";

interface Props {
  children: ReactNode;
  delay: number;
}

export default function Delay(props: Props) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setDone(true), props.delay);
    return () => clearTimeout(showTimer);
  });

  if (!done) {
    return null;
  }

  return <Fragment>{props.children}</Fragment>;
}
