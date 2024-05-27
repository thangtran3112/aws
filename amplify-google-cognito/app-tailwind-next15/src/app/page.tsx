import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/background/cakes.avif)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="font-sans">
              <button className="btn-sm btn btn-primary">Get Started</button>
              {/* <button className="btn-sm btn btn-secondary">Learn More</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
