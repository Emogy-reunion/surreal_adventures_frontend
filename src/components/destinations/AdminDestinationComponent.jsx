"use client";

import { useState, useEffect } from "react";

import {
  MapPin,
  Globe,
  Star,
  Trash2,
  Edit,
  MoreVertical,
  Compass,
  DollarSign,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/destinations/DestinationsComponent.module.css";

const DestinationsComponent = ({ data }) => {

  const [destinations, setDestinations] = useState(
    data.destinations || []
  );

  const [pagination, setPagination] = useState(
    data.pagination || {}
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDestinations(data.destinations || []);
    setPagination(data.pagination || {});
  }, [data]);

  const fetchPage = async (page) => {

    if (!page) return;

    setLoading(true);

    try {

      const response = await fetch(
        `/api/v1/destinations?page=${page}`
      );

      const newData = await response.json();

      setDestinations(
        newData.destinations || []
      );

      setPagination(
        newData.pagination || {}
      );

    } catch {
      alert(
        "Failed to fetch destinations."
      );
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {

    const confirmDelete = confirm(
      "Delete this destination?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `/api/v1/destinations/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setDestinations((prev) =>
        prev.filter(
          (destination) =>
            destination.id !== id
        )
      );

    } catch {
      alert(
        "Failed to delete destination."
      );
    }
  };

  return (
    <main className={styles.container}>

      <div className={styles.headerSection}>

        <div>
          <h4 className={styles.subheading}>
            Explore Experiences
          </h4>

        </div>

      </div>

      {destinations.length === 0 ? (

        <div className={styles.emptyState}>

          <Compass
            className={styles.emptyIcon}
          />

          <h2>
            No destinations found
          </h2>

          <p>
            Uploaded destinations will appear here.
          </p>

        </div>

      ) : (

        <div className={styles.grid}>

          {destinations.map(
            (destination) => (

              <div
                key={destination.id}
                className={styles.card}
              >

                <div className={styles.imageWrapper}>

                  <Link
                    href={`/admin/destinations/${destination.id}`}
                  >

                    <div className={styles.aspectRatio}>

                      <Image
                        src={
                          destination.image
                            ? `/api/v1/send_image/${destination.image}`
                            : "/placeholder.webp"
                        }
                        alt={destination.name}
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
                      {destination.category}
                    </span>

                    {destination.is_featured && (
                      <span className={styles.featuredBadge}>
                        <Star size={14} />
                        Featured
                      </span>
                    )}

                  </div>

                  <div className={styles.actions}>

                    <MoreVertical
                      className={styles.actionIcon}
                    />

                    <div className={styles.dropdown}>

                      <button
                        onClick={() =>
                          handleDelete(
                            destination.id
                          )
                        }
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                      <button>
                        <Edit size={16} />
                        Edit
                      </button>

                    </div>

                  </div>

                  <div className={styles.imageContent}>

                    <h2 className={styles.cardTitle}>
                      {destination.name}
                    </h2>

                    <div className={styles.locationRow}>

                      <MapPin size={15} />

                      <span>
                        {destination.location},{" "}
                        {destination.country}
                      </span>

                    </div>

                  </div>

                </div>

                <div className={styles.cardBody}>

                  <p className={styles.description}>
                    {
                      destination.short_description
                    }
                  </p>

                  <div className={styles.bottomRow}>

                    <div className={styles.priceSection}>

                      <span className={styles.priceLabel}>
                        Starting From
                      </span>

                      <div className={styles.priceRow}>

                        <span className={styles.price}>
                          {
                            destination.currency
                          }{" "}
                          {
                            destination.start_price
                          }
                        </span>

                      </div>

                    </div>

                    <Link
                      href={`/admin/destinations/${destination.id}`}
                      className={styles.viewButton}
                    >
                      View
                    </Link>

                  </div>

                </div>

              </div>

            )
          )}

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
          Loading destinations...
        </p>
      )}

    </main>
  );
};

export default DestinationsComponent;
