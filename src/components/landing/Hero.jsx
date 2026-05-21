"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const videoRef = useRef(null);

  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    video.muted = true;

    video.play().catch(() => {});

  }, []);

  const handleSearch = () => {

    const params = new URLSearchParams();

    if (country) {
      params.append("country", country);
    }

    if (category) {
      params.append("category", category);
    }

    if (maxPrice) {
      params.append("max_price", maxPrice);
    }

    router.push(
      `/guest/tours?${params.toString()}`
    );
  };

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

        <div className={styles.searchForm}>

          <div className={styles.formGrid}>

            <select
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
              className={styles.selectField}
            >
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

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className={styles.selectField}
            >
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
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className={styles.priceField}
            />

            <button
              type="button"
              onClick={handleSearch}
              className={styles.heroBtn}
            >
              Search
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
