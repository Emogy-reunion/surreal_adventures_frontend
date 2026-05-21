"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/landing/Hero.module.css";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Explore the world</h1>
        <p className={styles.heroSubtitle}>
          Discover unforgettable tours and destinations
        </p>

        <div className={styles.heroActions}>
          <input
            type="text"
            placeholder="Where do you want to go?"
            className={styles.heroSearch}
          />
          <button className={styles.heroBtn}>Search</button>
        </div>
      </div>
    </section>
  );
}
