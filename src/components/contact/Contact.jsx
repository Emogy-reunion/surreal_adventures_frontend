"use client";

import styles from "@/styles/contact/Contact.module.css";
import { MessageCircle } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>

        {/* How to Reach Us */}
        <div className={styles.section}>
          <h2 className={styles.title}>How to Reach Us</h2>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <p>Click the WhatsApp button below</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <p>Start a chat with our team</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <p>Get assistance instantly</p>
            </div>
          </div>

          <a href="#" className={styles.whatsappBtn}>
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Follow Us */}
        <div className={styles.section}>
          <h2 className={styles.title}>Follow Us</h2>

          <div className={styles.socials}>
            <a href="#" className={styles.icon}><FaFacebookF size={20} /></a>
            <a href="#" className={styles.icon}><FaInstagram size={20} /></a>
            <a href="#" className={styles.icon}><FaTwitter size={20} /></a>
          </div>
        </div>

        {/* WhatsApp Group */}
        <div className={styles.section}>
          <h2 className={styles.title}>Join Our Community</h2>
          <p className={styles.text}>
            Stay updated with the latest experiences, offers, and travel inspiration.
          </p>

          <a href="#" className={styles.groupBtn}>
            Join WhatsApp Group
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
