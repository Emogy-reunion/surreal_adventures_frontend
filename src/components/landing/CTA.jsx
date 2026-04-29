"use client";

import styles from "@/styles/landing/CTA.module.css";

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to explore your next adventure?</h2>
        <p className={styles.subtitle}>
          Discover curated experiences and book your perfect trip today.
        </p>

        <button className={styles.button}>Browse Experiences</button>
      </div>
    </section>
  );
};

export default CTA;
