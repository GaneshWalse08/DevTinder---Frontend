import MaskedHeading from "@/components/MaskedHeading";

const Home = () => {
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        <div className="w-full">
          <MaskedHeading
            text="DevTinder"
            mediaType="video"
            src="/reel.mp4"
            poster="/reel-poster.jpg"
            fillScale={1.15}
            parallax={20}
            reveal="rise"
            trigger="view"
            drift={10}
            brightness={1}
            saturation={1}
            grayscale={false}
            duration={1.1}
            stagger={0.09}
            align="center"
            weight={700}
            tracking={-0.03}
            lineHeight={1.06}
            textScale={0.08}
          />
        </div>
      </section>

      <section id="about">{/* About Us */}</section>

      <section id="discover">{/* Discover */}</section>

      <section id="features">{/* Features */}</section>
    </>
  );
};

export default Home;
