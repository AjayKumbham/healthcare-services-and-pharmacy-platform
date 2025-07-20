import React, { useEffect, useRef } from 'react';

export default function Carousel({ onLoginClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dzymyjltu/video/upload/v1738488984/A_Behind-The-Scenes_look_at_Express_Scripts_Pharmacy__by_Evernorth_1080p_txlkbn.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in text-transparent stroke-black stroke-2">
              Your Health, Our Priority
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}