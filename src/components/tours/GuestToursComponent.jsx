"use client";

import { useState, useEffect } from "react";

import {
  MapPin,
  Star,
  Compass,
  CalendarDays,
  Clock3,
  BadgePercent,
  DollarSign,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/tours/ToursComponent.module.css";

const ToursComponent = ({ data }) => {

  const [tours, setTours] = useState(
    data.tours || []
  );

  const [pagination, setPagination] = useState(
    data.pagination || {}
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setTours(data.tours || []);

    setPagination(
      data.pagination || {}
    );

  }, [data]);

  const fetchPage = async (page) => {

    if (!page) return;

    setLoading(true);

    try {

      const response = await fetch(
        `/api/v1/tours?page=${page}`
      );

      const newData = await response.json();

      setTours(
        newData.tours || []
      );

      setPagination(
        newData.pagination || {}
      );

    } catch {

      alert(
        "Failed to fetch tours."
      );

    }

    setLoading(false);
  };

  return (
    <main className={styles.container}>

      <div className={styles.headerSection}>

        <div>

          <h4 className={styles.subheading}>
            Premium Tour Packages
          </h4>

        </div>

      </div>

      {tours.length === 0 ? (

        <div className={styles.emptyState}>

          <Compass
            className={styles.emptyIcon}
          />

          <h2>
            No tours found
          </h2>

          <p>
            Tours will appear here.
          </p>

        </div>

      ) : (

        <div className={styles.grid}>

          {tours.map((tour) => (

            <div
              key={tour.id}
              className={styles.card}
            >

              <div className={styles.imageWrapper}>

                <Link
                  href={`/guest/tours/${tour.id}`}
                >

                  <div className={styles.aspectRatio}>

                    <Image
                      src={
                        tour.image
                          ? `/api/v1/send_image/${tour.image}`
                          : "/placeholder.webp"
                      }
                      alt={tour.name}
                      fill
                      className={styles.image}
                      sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw
                      "
                    />

                  </div>

                </Link>

                <div className={styles.overlay} />

                <div className={styles.topRow}>

                  <span className={styles.categoryBadge}>
                    {tour.category}
                  </span>

                  {tour.is_featured && (

                    <span className={styles.featuredBadge}>
                      <Star size={14} />
                      Featured
                    </span>

                  )}

                </div>

                {tour.on_discount && (

                  <div className={styles.discountBadge}>
                    <BadgePercent size={14} />
                    Discount Active
                  </div>

                )}

                <div className={styles.imageContent}>

                  <h2 className={styles.cardTitle}>
                    {tour.name}
                  </h2>

                  <div className={styles.locationRow}>

                    <MapPin size={15} />

                    <span>
                      {tour.location},{" "}
                      {tour.country}
                    </span>

                  </div>

                </div>

              </div>

              <div className={styles.cardBody}>

                <p className={styles.description}>
                  {tour.short_description}
                </p>

                <div className={styles.infoGrid}>

                  <div className={styles.infoCard}>

                    <CalendarDays size={16} />

                    <div>
                      <span className={styles.infoLabel}>
                        Start Date
                      </span>

                      <p>
                        {tour.start_date}
                      </p>
                    </div>

                  </div>

                  <div className={styles.infoCard}>

                    <Clock3 size={16} />

                    <div>
                      <span className={styles.infoLabel}>
                        Tour Type
                      </span>

                      <p>
                        {tour.category}
                      </p>
                    </div>

                  </div>

                </div>

                <div className={styles.bottomRow}>

                  <div className={styles.priceSection}>

                    <div className={styles.priceWrapper}>

                      {tour.on_discount && (
                        <span className={styles.oldPrice}>
                          {tour.currency}{" "}
                          {tour.price}
                        </span>
                      )}

                      <div className={styles.priceRow}>
                        <span className={styles.price}>
                          {tour.currency}{" "}
                          {tour.current_price}
                        </span>

                      </div>

                    </div>

                  </div>

                  <Link
                    href={`/guest/tours/${tour.id}`}
                    className={styles.viewButton}
                  >
                    View Tour
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {pagination.pages > 1 && (

        <div className={styles.pagination}>

          <button
            disabled={!pagination.prev}
            onClick={() =>
              fetchPage(
                pagination.prev
              )
            }
            className={styles.pageButton}
          >
            Prev
          </button>

          <span className={styles.pageInfo}>
            Page {pagination.page} of{" "}
            {pagination.pages}
          </span>

          <button
            disabled={!pagination.next}
            onClick={() =>
              fetchPage(
                pagination.next
              )
            }
            className={styles.pageButton}
          >
            Next
          </button>

        </div>

      )}

      {loading && (

        <p className={styles.loading}>
          Loading tours...
        </p>

      )}

    </main>
  );
};

export default ToursComponent;
