import { Fragment } from "react";
import Slideshow from "../components/Slideshow/Slideshow";

import s1 from "assets/images/slide-4.jpg";
import s2 from "assets/images/slide-5.jpg";
import s3 from "assets/images/slide-6.jpg";

export default function HomePage() {
  return (
    <Fragment>
      <section className="w-full h-screen">
        <Slideshow
          slideDuration={2}
          imgDuration={2}
          btnDuration={1.5}
          btnDelay={1}
          slides={[
            {
              title: "We'are all about | \n Integrating digital solutions",
              img: s1,
            },
            {
              title: "We'are all about | \n Moving forward brands",
              img: s2,
            },
            {
              title: "We'are all about | \n Connecting user experiences",
              img: s3,
            },
          ]}
        />
      </section>
      <section className="py-40">
        <div className="container mx-auto">
          <h2 className="text-6xl font-medium">Creative Technolab</h2>
        </div>
      </section>
    </Fragment>
  );
}
