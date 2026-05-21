"use client";

import styles from "@/styles/landing/WhyUs.module.css";
import { ShieldCheck, Headphones, Star, Compass } from "lucide-react";

const WhyUs = () => {
  const items = [
    {
      icon: <Compass size={28} />,
      title: "Curated Experiences",
      desc: "Handpicked tours and adventures tailored for unforgettable moments.",
    },
    {
      icon: <Star size={28} />,
      title: "Best Value",
      desc: "Competitive pricing with no hidden costs, just real value.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Booking",
      desc: "Your payments and data are protected with top-level security.",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      desc: "We’re here anytime you need help, before or during your trip.",
    },
  ];

  return (
    <section className={styles.whyUs}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Choose Us</h2>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
