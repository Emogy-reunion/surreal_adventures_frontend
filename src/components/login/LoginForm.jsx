"use client";

import styles from "@/styles/login/Login.module.css";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Login to continue your journey</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <Mail className={styles.icon} size={18} />
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <Lock className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
            />
          </div>

          <button className={styles.button}>Login</button>
        </form>

        <p className={styles.footerText}>
          Don’t have an account? <span className={styles.link}>Sign up</span>
        </p>

      </div>
    </div>
  );
};

export default Login;
