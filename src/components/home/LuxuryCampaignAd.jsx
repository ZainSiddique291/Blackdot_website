import React, { useEffect, useRef } from 'react';

export default function LuxuryCampaignAd() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="campaign-ad-section"
      className="relative w-screen h-screen max-w-[100vw] overflow-hidden bg-black m-0 p-0 border-0"
      style={{ width: '100vw', height: '100vh' }}
    >
      <video
        ref={videoRef}
        src="/videos/BlackDot_Ad_Clip.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full block m-0 p-0 border-0 select-none pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </section>
  );
}
