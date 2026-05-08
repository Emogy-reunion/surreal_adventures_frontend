'use client';

import { useState, useMemo } from "react";

import {
  Image,
  MapPin,
  Globe,
  DollarSign,
  FileText,
  Star,
  Tag,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import styles from "@/styles/upload/Upload.module.css";

const CATEGORIES = [
  "adventure",
  "luxury",
  "wildlife",
  "beach",
  "cultural",
  "road-trip",
  "honeymoon",
];

const FIELD_STEP_MAP = {
  name: 1,
  country: 1,
  location: 1,
  price: 1,
  duration: 1,
  category: 1,

  description: 2,
  highlights: 2,
  includes: 2,
  excludes: 2,

  discount_start: 3,
  discount_price: 3,
  discount_end: 3,
  start_date: 3,
  end_date: 3,

  images: 4,
};

const UploadTourForm = () => {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    location: "",
    price: "",
    duration: "",
    category: "",

    description: "",
    highlights: "",
    includes: "",
    excludes: "",

    discount_start: "",
    discount_price: "",
    discount_end: "",
    start_date: "",
    end_date: "",

    is_featured: false,
    is_active: true,
    is_day_trip: false,

    images: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [globalError, setGlobalError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const previews = useMemo(() => {
    return formData.images.map((img) => URL.createObjectURL(img));
  }, [formData.images]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
      files
    } = e.target;

    if (type === "checkbox") {

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

    } else if (type === "file") {

      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleRemoveImage = (index) => {

    const updatedImages = formData.images.filter(
      (_, i) => i !== index
    );

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const getCookie = (name) => {

    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setGlobalError("");

    setSuccessMessage("");

    setFormErrors({});

    try {

      const payload = new FormData();

      Object.keys(formData).forEach((key) => {

        if (key !== "images") {
          payload.append(key, formData[key]);
        }
      });

      formData.images.forEach((img) => {
        payload.append("images", img);
      });

      const response = await fetch("/api/v1/tours", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {

        if (data.errors) {

          const formattedErrors = {};

          Object.keys(data.errors).forEach((key) => {
            formattedErrors[key] = data.errors[key][0];
          });

          setFormErrors(formattedErrors);

          let targetStep = step;

          Object.keys(data.errors).forEach((field) => {

            const fieldStep = FIELD_STEP_MAP[field];

            if (fieldStep && fieldStep < targetStep) {
              targetStep = fieldStep;
            }
          });

          setStep(targetStep);

          setTimeout(() => {
            setFormErrors({});
          }, 6000);

        } else {

          setGlobalError(
            data.error || "Failed to upload tour."
          );

          setTimeout(() => {
            setGlobalError("");
          }, 5000);
        }

        return;
      }

      setSuccessMessage("Tour uploaded successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      setFormData({
        name: "",
        country: "",
        location: "",
        price: "",
        duration: "",
        category: "",

        description: "",
        highlights: "",
        includes: "",
        excludes: "",

        discount_start: "",
        discount_price: "",
        discount_end: "",
        start_date: "",
        end_date: "",

        is_featured: false,
        is_active: true,
        is_day_trip: false,

        images: [],
      });

      setStep(1);

    } catch {

      setGlobalError(
        "Network error. Please try again."
      );

      setTimeout(() => {
        setGlobalError("");
      }, 5000);

    } finally {

      setLoading(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={step === 4 ? handleSubmit : handleNext}
    >

      <h2 className={styles.title}>
        Upload Tour
      </h2>

      {globalError && (
        <div className={styles.error}>
          <p>{globalError}</p>
        </div>
      )}

      {successMessage && (
        <div className={styles.success}>
          <p>{successMessage}</p>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (

        <div className={styles.inputGroup}>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Tag className={styles.icon} />

              <input
                type="text"
                name="name"
                placeholder="Tour name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {formErrors.name && (
              <p className={styles.errorMessage}>
                {formErrors.name}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Globe className={styles.icon} />

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            {formErrors.country && (
              <p className={styles.errorMessage}>
                {formErrors.country}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <MapPin className={styles.icon} />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {formErrors.location && (
              <p className={styles.errorMessage}>
                {formErrors.location}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <DollarSign className={styles.icon} />

              <input
                type="number"
                name="price"
                placeholder="Tour price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {formErrors.price && (
              <p className={styles.errorMessage}>
                {formErrors.price}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Clock className={styles.icon} />

              <input
                type="text"
                name="duration"
                placeholder="Duration e.g 5 Days"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            {formErrors.duration && (
              <p className={styles.errorMessage}>
                {formErrors.duration}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Tag className={styles.icon} />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
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
            </div>

            {formErrors.category && (
              <p className={styles.errorMessage}>
                {formErrors.category}
              </p>
            )}
          </div>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (

        <div className={styles.inputGroup}>

          <div className={styles.group}>

            <div className={styles.textareaHeader}>
              <FileText className={styles.icon} />
              <span>Description</span>
            </div>

            <textarea
              name="description"
              placeholder="Tour description..."
              value={formData.description}
              onChange={handleChange}
            />

            {formErrors.description && (
              <p className={styles.errorMessage}>
                {formErrors.description}
              </p>
            )}

          </div>

          <div className={styles.group}>

            <div className={styles.textareaHeader}>
              <Star className={styles.icon} />
              <span>Highlights</span>
            </div>

            <textarea
              name="highlights"
              placeholder="One highlight per line"
              value={formData.highlights}
              onChange={handleChange}
            />

            {formErrors.highlights && (
              <p className={styles.errorMessage}>
                {formErrors.highlights}
              </p>
            )}

          </div>

          <div className={styles.group}>

            <div className={styles.textareaHeader}>
              <CheckCircle className={styles.icon} />
              <span>Includes</span>
            </div>

            <textarea
              name="includes"
              placeholder="One include per line"
              value={formData.includes}
              onChange={handleChange}
            />

            {formErrors.includes && (
              <p className={styles.errorMessage}>
                {formErrors.includes}
              </p>
            )}

          </div>

          <div className={styles.group}>

            <div className={styles.textareaHeader}>
              <XCircle className={styles.icon} />
              <span>Excludes</span>
            </div>

            <textarea
              name="excludes"
              placeholder="One exclude per line"
              value={formData.excludes}
              onChange={handleChange}
            />

            {formErrors.excludes && (
              <p className={styles.errorMessage}>
                {formErrors.excludes}
              </p>
            )}

          </div>

        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (

        <div className={styles.inputGroup}>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Calendar className={styles.icon} />

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>

            {formErrors.start_date && (
              <p className={styles.errorMessage}>
                {formErrors.start_date}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Calendar className={styles.icon} />

              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>

            {formErrors.end_date && (
              <p className={styles.errorMessage}>
                {formErrors.end_date}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <DollarSign className={styles.icon} />

              <input
                type="number"
                name="discount_price"
                placeholder="Discount price"
                value={formData.discount_price}
                onChange={handleChange}
              />
            </div>

            {formErrors.discount_price && (
              <p className={styles.errorMessage}>
                {formErrors.discount_price}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Calendar className={styles.icon} />

              <input
                type="date"
                name="discount_start"
                value={formData.discount_start}
                onChange={handleChange}
              />
            </div>

            {formErrors.discount_start && (
              <p className={styles.errorMessage}>
                {formErrors.discount_start}
              </p>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.inputRow}>
              <Calendar className={styles.icon} />

              <input
                type="date"
                name="discount_end"
                value={formData.discount_end}
                onChange={handleChange}
              />
            </div>

            {formErrors.discount_end && (
              <p className={styles.errorMessage}>
                {formErrors.discount_end}
              </p>
            )}
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
            />

            <span>
              Featured Tour
            </span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />

            <span>
              Active Tour
            </span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="is_day_trip"
              checked={formData.is_day_trip}
              onChange={handleChange}
            />

            <span>
              Day Trip
            </span>
          </label>

        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (

        <div>

          <div className={styles.inputGroup}>

            <label className={styles.upload}>

              <Image />

              <span>
                Upload Tour Images
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleChange}
              />

            </label>

            {formErrors.images && (
              <p className={styles.errorMessage}>
                {formErrors.images}
              </p>
            )}

            {formData.images.length > 0 && (
              <p className={styles.info}>
                {formData.images.length} image(s) selected
              </p>
            )}

          </div>

          <div className={styles.previewContainer}>

            {previews.map((url, index) => (

              <div
                key={index}
                className={styles.previewWrapper}
              >

                <img
                  src={url}
                  alt={`preview-${index}`}
                  className={styles.previewImage}
                />

                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() =>
                    handleRemoveImage(index)
                  }
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        </div>
      )}

      <div className={styles.buttons}>

        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className={styles.backButton}
          >
            Back
          </button>
        )}

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : step === 4
            ? "Upload Tour"
            : "Next"}
        </button>

      </div>

    </form>
  );
};

export default UploadTourForm;
