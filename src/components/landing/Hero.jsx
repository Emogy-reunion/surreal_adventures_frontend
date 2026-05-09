"use client";

import { useEffect, useRef } from "react";

import styles from "@/styles/landing/Hero.module.css";

const COUNTRIES = [
  "Kenya",
  "Rwanda",
  "Tanzania",
  "Uganda",
  "South Africa",
  "Ethiopia",
  "United Arab Emirates",
  "Malaysia",
];

const CATEGORIES = [
  "adventure",
  "luxury",
  "wildlife",
  "beach",
  "cultural",
  "road-trip",
  "honeymoon",
];

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

        <h1 className={styles.heroTitle}>
          Explore the world
        </h1>

        <p className={styles.heroSubtitle}>
          Discover unforgettable tours and destinations
        </p>

        <form className={styles.searchForm}>

          <div className={styles.formGrid}>

            <select className={styles.selectField}>
              <option value="">
                Select Country
              </option>

              {COUNTRIES.map((country) => (
                <option
                  key={country}
                  value={country}
                >
                  {country}
                </option>
              ))}
            </select>

            <select className={styles.selectField}>
              <option value="">
                Select Category
              </option>

              {CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Max Price"
              className={styles.priceField}
            />

            <button
              type="button"
              className={styles.heroBtn}
            >
              Search
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}
