"use client";

import { useEffect, useState } from "react";

import ToursComponent from "@/components/tours/GuestToursComponent";

const ToursPage = () => {

  const [tours, setTours] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTours = async (page = 1) => {

    setLoading(true);

    try {

      const response = await fetch(
        `/api/v1/tours?page=${page}&per_page=12`
      );

      const data = await response.json();

      setTours(data.tours || []);
      setPagination(data.pagination || {});

    } catch {

      alert("Failed to fetch tours.");

    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <ToursComponent
      tours={tours}
      pagination={pagination}
      loading={loading}
      onPageChange={fetchTours}
    />
  );
};

export default ToursPage;
