'use client';

import React from 'react';

import Image from 'next/image';

import {
  Swiper,
  SwiperSlide
} from 'swiper/react';

import {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper/modules';

import {
  MapPin,
  CalendarDays,
  Clock3,
  MessageCircle,
  Star,
  CheckCircle2,
  XCircle,
  Tag,
  DollarSign,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from "@/styles/tours/tourDetail.module.css";

export default function TourDetailsComponent({ tour }) {

  const hasImages =
    tour?.images?.length > 0;

  const whatsappMessage =
    encodeURIComponent(
      `Hi 👋, I’m interested in booking this tour:\n\n` +
      `🏝️ ${tour.name}\n` +
      `📍 ${tour.location}, ${tour.country}\n` +
      `🗓️ ${tour.start_date} - ${tour.end_date}\n` +
      `⏳ ${tour.duration}\n\n` +
      `Please share more details about pricing and availability.`
    );

  const whatsappLink =
    `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div>

          <h1 className={styles.title}>
            {tour.name}
          </h1>

          <div className={styles.metaGrid}>

            <div className={styles.metaItem}>
              <MapPin size={16} />
              <span>
                {tour.location},{" "}
                {tour.country}
              </span>
            </div>

            <div className={styles.metaItem}>
              <CalendarDays size={16} />
              <span>
                {tour.start_date} —{" "}
                {tour.end_date}
              </span>
            </div>

            <div className={styles.metaItem}>
              <Clock3 size={16} />
              <span>
                {tour.duration}
              </span>
            </div>

          </div>

        </div>

        <div className={styles.priceCard}>

          <h4 className={styles.priceLabel}>
            Tour Price
          </h4>

          {tour.on_discount ? (
            <div className={styles.priceWrapper}>

              <span className={styles.oldPrice}>
                {tour.currency}{" "}
                {tour.price}
              </span>

              <div className={styles.currentPrice}>
                <span>
                  {tour.currency}{" "}
                  {tour.current_price}
                </span>
              </div>

            </div>
          ) : (
            <div className={styles.currentPrice}>
              <DollarSign size={18} />
              <span>
                {tour.currency}{" "}
                {tour.current_price}
              </span>
            </div>
          )}

        </div>

      </div>

      {hasImages ? (
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay
          ]}
          pagination={{
            clickable: true
          }}
          autoplay={{
            delay: 4000
          }}
          loop={
            tour.images.length > 1
          }
          spaceBetween={20}
          navigation
          className={styles.slider}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >

          {tour.images.map(
            (img, idx) => (
              <SwiperSlide key={idx}>

                <div
                  className={
                    styles.imageWrapper
                  }
                >

                  <Image
                    src={
                      img
                        ? `/api/v1/send_image/${img}`
                        : "/placeholder.webp"
                    }
                    alt={tour.name}
                    fill
                    style={{
                      objectFit: "cover"
                    }}
                  />

                </div>

              </SwiperSlide>
            )
          )}

        </Swiper>
      ) : (
        <div className={styles.noImages}>
          No images available
        </div>
      )}

      <div className={styles.section}>

        <h3>
          About this tour
        </h3>

        <p>
          {tour.short_description}
        </p>

      </div>

      {tour.highlights?.length > 0 && (
        <div className={styles.section}>

          <h3>
            Tour Highlights
          </h3>

          <div className={styles.tagsWrapper}>

            {tour.highlights.map(
              (item, idx) => (
                <span
                  key={idx}
                  className={
                    styles.highlightTag
                  }
                >
                  ⭐ {item}
                </span>
              )
            )}

          </div>

        </div>
      )}

      {tour.includes?.length > 0 && (
        <div className={styles.section}>

          <h3>
            What's Included
          </h3>

          <div className={styles.tagsWrapper}>

            {tour.includes.map(
              (item, idx) => (
                <span
                  key={idx}
                  className={
                    styles.includeTag
                  }
                >
                  ✅ {item}
                </span>
              )
            )}

          </div>

        </div>
      )}

      {tour.excludes?.length > 0 && (
        <div className={styles.section}>

          <h3>
            Not Included
          </h3>

          <div className={styles.tagsWrapper}>

            {tour.excludes.map(
              (item, idx) => (
                <span
                  key={idx}
                  className={
                    styles.excludeTag
                  }
                >
                  ❌ {item}
                </span>
              )
            )}

          </div>

        </div>
      )}

      <div className={styles.ctaWrapper}>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >

          <MessageCircle size={18} />

          Book via WhatsApp

        </a>

      </div>

    </div>
  );
}
