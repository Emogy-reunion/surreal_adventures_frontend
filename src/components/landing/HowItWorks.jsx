"use client";

import styles from "@/styles/landing/HowItWorks.module.css";
import { Search, CreditCard, Map } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Search & Discover",
      desc: "Find destinations and experiences tailored to your interests.",
    },
    {
      icon: <CreditCard size={28} />,
      title: "Book Your Trip",
      desc: "Secure your spot with our simple booking process.",
    },
    {
      icon: <Map size={28} />,
      title: "Enjoy Your Journey",
      desc: "Experience unforgettable moments and explore with confidence.",
    },
  ];

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <h2 className={styles.title}>How It Works</h2>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.icon}>{step.icon}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
