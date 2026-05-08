'use client';

import { useState } from "react";

import {
  MapPinned,
  Plane,
} from "lucide-react";

import UploadDestinationForm from "@/components/upload/UploadDestinationForm";
import UploadTourForm from "@/components/upload/UploadTourForm";

import styles from "@/styles/upload/Upload.module.css";

const UploadPage = () => {

  const [activeForm, setActiveForm] = useState("destination");

  return (
    <div className={styles.uploadChoiceContainer}>

      <div className={styles.uploadChoiceHeader}>
        <h1>Upload Content</h1>

        <p>
          Choose what you want to upload to your travel platform.
        </p>
      </div>

      <div className={styles.toggleWrapper}>

        <button
          className={`${styles.toggleButton} ${
            activeForm === "destination"
              ? styles.activeToggle
              : ""
          }`}
          onClick={() => setActiveForm("destination")}
        >
          <MapPinned size={18} />

          <span>Destination</span>
        </button>

        <button
          className={`${styles.toggleButton} ${
            activeForm === "tour"
              ? styles.activeToggle
              : ""
          }`}
          onClick={() => setActiveForm("tour")}
        >
          <Plane size={18} />

          <span>Tour</span>
        </button>

      </div>

      <div className={styles.formContainer}>
        {activeForm === "destination" ? (
          <UploadDestinationForm />
        ) : (
          <UploadTourForm />
        )}
      </div>

    </div>
  );
};

export default UploadPage;
