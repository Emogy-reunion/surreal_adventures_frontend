"use client";

import styles from "@/styles/footer/Footer.module.css";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Brand */}
        <div className={styles.section}>
          <h3 className={styles.logo}>Surreal</h3>
          <p className={styles.desc}>
            Discover and book unforgettable travel experiences around the world.
          </p>
        </div>

        {/* Links */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Explore</h4>
          <ul className={styles.list}>
            <li><a href="/admin/destinations" className={styles.link}>Destinations</a></li>
            <li><a href="/admin/tours" className={styles.link}>Experiences</a></li>
            <li><a href="/admin/upload" className={styles.link}>Post</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.list}>
            <li className={styles.item}><Mail size={16} /> reservations@surrealadventures.co.ke</li>
            <li className={styles.item}><Phone size={16} /> +254 720 380 930</li>
            <li className={styles.item}><MapPin size={16} /> Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Socials */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Follow Us</h4>
          <div className={styles.socials}>
            <a href="#" className={styles.icon}><FaFacebookF size={18} /></a>
            <a href="#" className={styles.icon}><FaInstagram size={18} /></a>
            <a href="#" className={styles.icon}><FaTwitter size={18} /></a>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Surreal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AdminFooter;
