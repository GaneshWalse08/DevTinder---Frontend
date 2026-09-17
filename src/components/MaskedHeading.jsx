import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";

const MaskedHeading = ({
  text = "DevTinder",
  mediaType = "video",
  src = "",
  poster = "",

  fillScale = 1.15,
  parallax = 20,
  drift = 10,

  brightness = 1,
  saturation = 1,
  grayscale = false,

  reveal = "rise",
  duration = 1.1,
  stagger = 0.09,
  trigger = "view",

  align = "center",
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.08,

  className = "",
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const mediaRef = useRef(null);
  const glyphRef = useRef(null);
  const tweenRef = useRef(null);

  const maskId = `masked-heading-${useId().replace(
    /[^a-zA-Z0-9_-]/g,
    "",
  )}`;

  /*
   * Move video inside the text
   */
  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;

    if (!root || !media) return;

    let animationFrame;
    let lastTime = performance.now();
    let clock = 0;

    const offset = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const updateVideo = () => {
      const dt = Math.min(
        0.05,
        (performance.now() - lastTime) / 1000,
      );

      lastTime = performance.now();
      clock += dt;

      const driftX =
        Math.sin(clock * 0.21) * drift;

      const driftY =
        Math.cos(clock * 0.17) * drift * 0.6;

      const ease = 1 - Math.exp(-dt / 0.18);

      offset.x +=
        (offset.targetX + driftX - offset.x) *
        ease;

      offset.y +=
        (offset.targetY + driftY - offset.y) *
        ease;

      media.style.transform = `
        translate3d(
          ${offset.x}px,
          ${offset.y}px,
          0
        )
        scale(${fillScale})
      `;

      media.style.filter = `
        brightness(${brightness})
        saturate(${saturation})
        ${grayscale ? "grayscale(1)" : ""}
      `;

      animationFrame =
        requestAnimationFrame(updateVideo);
    };

    const handleMouseMove = (e) => {
      if (parallax <= 0) return;

      const rect =
        root.getBoundingClientRect();

      const x =
        ((e.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      const y =
        ((e.clientY - rect.top) /
          rect.height) *
          2 -
        1;

      offset.targetX =
        -x * parallax;

      offset.targetY =
        -y * parallax;
    };

    const handleMouseLeave = () => {
      offset.targetX = 0;
      offset.targetY = 0;
    };

    root.addEventListener(
      "pointermove",
      handleMouseMove,
    );

    root.addEventListener(
      "pointerleave",
      handleMouseLeave,
    );

    animationFrame =
      requestAnimationFrame(updateVideo);

    return () => {
      cancelAnimationFrame(animationFrame);

      root.removeEventListener(
        "pointermove",
        handleMouseMove,
      );

      root.removeEventListener(
        "pointerleave",
        handleMouseLeave,
      );
    };
  }, [
    fillScale,
    parallax,
    drift,
    brightness,
    saturation,
    grayscale,
  ]);

  /*
   * GSAP text reveal
   */
  useEffect(() => {
    const root = rootRef.current;
    const glyph = glyphRef.current;

    if (!root || !glyph) return;

    tweenRef.current?.kill();

    const reducedMotion = window
      .matchMedia(
        "(prefers-reduced-motion: reduce)",
      )
      .matches;

    /*
     * No animation
     */
    if (
      reveal === "none" ||
      reducedMotion
    ) {
      gsap.set(glyph, {
        y: 0,
      });

      return;
    }

    /*
     * Rise animation
     */
    const play = () => {
      tweenRef.current?.kill();

      if (reveal === "rise") {
        gsap.fromTo(
          glyph,
          {
            y: 130,
          },
          {
            y: 0,
            duration,
            ease: "power4.out",
            overwrite: true,
          },
        );
      }

      if (reveal === "fade") {
        gsap.fromTo(
          glyph,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration,
            ease: "power3.out",
            overwrite: true,
          },
        );
      }
    };

    /*
     * Hover trigger
     */
    if (trigger === "hover") {
      gsap.set(glyph, {
        y: 0,
      });

      root.addEventListener(
        "pointerenter",
        play,
      );

      return () => {
        root.removeEventListener(
          "pointerenter",
          play,
        );

        tweenRef.current?.kill();
      };
    }

    /*
     * View trigger
     */
    if (trigger === "view") {
      gsap.set(glyph, {
        y: reveal === "rise" ? 130 : 0,
        opacity: reveal === "fade" ? 0 : 1,
      });

      const observer =
        new IntersectionObserver(
          (entries) => {
            if (
              entries.some(
                (entry) =>
                  entry.isIntersecting,
              )
            ) {
              play();
              observer.disconnect();
            }
          },
          {
            threshold: 0.25,
          },
        );

      observer.observe(root);

      return () => {
        observer.disconnect();
        tweenRef.current?.kill();
      };
    }

    play();

    return () => {
      tweenRef.current?.kill();
    };
  }, [
    reveal,
    trigger,
    duration,
    stagger,
    text,
  ]);

  /*
   * SVG dimensions
   *
   * We use a fixed viewBox.
   * This makes the text + video mask
   * perfectly aligned at every screen size.
   */
  const svgWidth = 1000;
  const svgHeight = 240;

  /*
   * textScale controls font size.
   *
   * 0.08 -> 80px
   * 0.10 -> 100px
   * 0.12 -> 120px
   */
  const fontSize = Math.max(
    20,
    Math.min(
      200,
      svgWidth * textScale,
    ),
  );

  /*
   * Letter spacing in SVG units
   */
  const letterSpacing =
    tracking * fontSize;

  /*
   * Text alignment
   */
  let textAnchor = "middle";
  let textX = svgWidth / 2;

  if (align === "left") {
    textAnchor = "start";
    textX = 20;
  }

  if (align === "right") {
    textAnchor = "end";
    textX = svgWidth - 20;
  }

  return (
    <div
      ref={rootRef}
      className={`
        relative
        w-full
        overflow-hidden
        ${className}
      `.trim()}
      style={{
        height: "240px",
        ...style,
      }}
      {...rest}
    >
      <svg
        className="
          absolute
          inset-0
          w-full
          h-full
          block
        "
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* 
            BLACK = hidden
            WHITE = video visible
          */}
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={svgWidth}
            height={svgHeight}
          >
            {/* Hide everything */}
            <rect
              x="0"
              y="0"
              width={svgWidth}
              height={svgHeight}
              fill="black"
            />

            {/* Text becomes the visible area */}
            <text
              ref={glyphRef}
              x={textX}
              y={140}
              textAnchor={textAnchor}
              dominantBaseline="alphabetic"
              fill="white"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={fontSize}
              fontWeight={weight}
              letterSpacing={letterSpacing}
              style={{
                lineHeight,
              }}
            >
              {text}
            </text>
          </mask>
        </defs>

        {/* 
          Video/image layer.
          It is visible ONLY where the text is white.
        */}
        <foreignObject
          x="0"
          y="0"
          width={svgWidth}
          height={svgHeight}
          mask={`url(#${maskId})`}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {mediaType === "video" ? (
              <video
                ref={mediaRef}
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transformOrigin: "center",
                }}
              />
            ) : (
              <img
                ref={mediaRef}
                src={src}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transformOrigin: "center",
                }}
              />
            )}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default MaskedHeading;