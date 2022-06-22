import { Fragment } from "react";
import styles from "./Slideshow.module.css";

export default function Backdrop() {
  return (
    <Fragment>
      <div className={`absolute inset-0 ${styles.gradientleft}`}></div>
      <div
        className={`absolute inset-0 md:hidden ${styles.gradientright}`}
      ></div>
      <div className={`absolute inset-0 ${styles.gradienttop}`}></div>
      <div className={`absolute inset-0 ${styles.gradientbottom}`}></div>
    </Fragment>
  );
}
