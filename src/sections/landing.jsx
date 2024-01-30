import React, { useEffect, useState } from "react";

function Landing() {
  const [withSize, setWidthSize] = useState(0);
  const [heightSize, setHeightSize] = useState(0);

  useEffect(() => {
    const ready = async () => {
      setWidthSize(window.screen.availWidth);
      setHeightSize(window.screen.availHeight);
    };
    ready();
  }, []);

  return (
    <section className="hidden lg:bock">
      <div className="landing overflow-x-hidden">
        <iframe
          title="home_v"
          src="https://player.vimeo.com/video/877708658?autoplay=1&autopause=1&background=1&loop=1&muted=1&transparent=0&responsive=1&portrait=0&title=0&byline=0&color=282828"
          width={withSize}
          height={heightSize}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
          allowfullscreen="allowfullscreen"
        ></iframe>
      </div>
    </section>
  );
}

export default Landing;
