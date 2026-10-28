import React, { useEffect, useRef } from 'react';

export default function LuxuryCampaignAd() {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.defaultMuted = true;
      bgVideoRef.current.muted = true;
      bgVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="campaign-ad-section"
      className="relative w-screen h-screen h-[100dvh] max-w-[100vw] overflow-hidden bg-black m-0 p-0 border-0 flex items-center justify-center"
      style={{ width: '100vw', height: '100dvh' }}
    >
      {/* Ambient Blurred Video Background for Mobile Portrait Viewports */}
      <video
        ref={bgVideoRef}
        src="/videos/BlackDot_Ad_Clip.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-45 scale-110 pointer-events-none select-none md:hidden"
        aria-hidden="true"
      />

      {/* Main Crisp Video: Fills edge-to-edge on laptop/desktop (cover) and fits without distortion/cropping on mobile (contain) */}
      <video
        ref={videoRef}
        src="/videos/BlackDot_Ad_Clip.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="relative z-10 w-full h-full block m-0 p-0 border-0 select-none pointer-events-none object-contain md:object-cover"
        style={{
          width: '100vw',
          height: '100dvh',
          objectPosition: 'center',
        }}
      />
    </section>
  );
}
