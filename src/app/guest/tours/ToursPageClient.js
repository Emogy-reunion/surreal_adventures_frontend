"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import ToursComponent from "@/components/tours/GuestToursComponent";

const ToursPageClient = () => {

  const searchParams =
    useSearchParams();

  const router = useRouter();

  const [tours, setTours] =
    useState([]);

  const [pagination, setPagination] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const fetchTours = async (
    page = 1
  ) => {

    setLoading(true);

    try {

      const params =
        new URLSearchParams();

      params.append(
        "page",
        page
      );

      params.append(
        "per_page",
        12
      );

      const country =
        searchParams.get(
          "country"
        );

      const category =
        searchParams.get(
          "category"
        );

      const maxPrice =
        searchParams.get(
          "max_price"
        );

      if (country) {
        params.append(
          "country",
          country
        );
      }

      if (category) {
        params.append(
          "category",
          category
        );
      }

      if (maxPrice) {
        params.append(
          "max_price",
          maxPrice
        );
      }

      const response =
        await fetch(
          `/api/v1/tours?${params.toString()}`
        );

      const data =
        await response.json();

      setTours(
        data.tours || []
      );

      setPagination(
        data.pagination || {}
      );

    } catch {

      alert(
        "Failed to fetch tours."
      );

    }

    setLoading(false);
  };

  useEffect(() => {

    const page =
      searchParams.get(
        "page"
      ) || 1;

    fetchTours(page);

  }, [searchParams]);

  const handlePageChange = (
    page
  ) => {

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      page
    );

    router.push(
      `/guest/tours?${params.toString()}`
    );
  };

  return (
    <ToursComponent
      tours={tours}
      pagination={pagination}
      loading={loading}
      onPageChange={
        handlePageChange
      }
    />
  );
};

export default ToursPageClient;
