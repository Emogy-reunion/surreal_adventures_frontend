'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MapPin, Globe, MessageCircle } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from "@/styles/destinations/destinationDetail.module.css";

export default function DestinationDetailsComponent({ destination }) {

    const hasImages = destination?.images?.length > 0;

    const whatsappMessage = encodeURIComponent(
        `Hi, I’m interested in booking this destination:\n\n` +
        `${destination.name}\n` +
        `${destination.location}, ${destination.country}\n\n` +
        `Please share more details about availability and pricing.`
    );

    const phoneNumber = "254720380930";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    return (
        <>

            <div className={styles.container}>
                <h1 className={styles.title}>{destination.name}</h1>

                <div className={styles.meta}>
                    <MapPin size={16} />
                    <span>{destination.location}, {destination.country}</span>
                </div>

                {hasImages ? (
                   <Swiper
                           modules={[Navigation, Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 4000 }}
                            loop={destination.images.length > 1}
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
                        {destination.images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={img ? `/api/v1/send_image/${img}` : "/placeholder.webp"}
                                        alt={destination.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={styles.noImages}>No images available</div>
                )}

                {/* Description */}
                <div className={styles.section}>
                    <h3>About this destination</h3>
                    <p>{destination.short_description}</p>
                </div>

                {destination.highlights?.length > 0 && (
                        <div className={styles.section}>
                                <h3>Highlights</h3>
                                <div className={styles.highlights}>
                                        {destination.highlights.map((item, idx) => (
                                                <span key={idx} className={styles.highlightItem}>
                                                        ✨ {item}
                                                </span>
                                        ))}
                                </div>
                        </div>
                )}

                {/* CTA */}
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
        </>
    );
}
