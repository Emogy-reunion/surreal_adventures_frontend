import { cookies } from 'next/headers';

import ToursComponent from '@/components/tours/AdminToursComponent';

const BACKEND_URL = process.env.BACKEND_URL;

const AdminToursPage = async ({ searchParams }) => {

  const page = (await searchParams).page || 1;

  const url = `${BACKEND_URL}/api/v1/tours?page=${page}&per_page=12`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      cookie: (await cookies()).toString(),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      'Failed to fetch tours.'
    );
  }

  const data = await response.json();

  return (
    <ToursComponent
      data={data}
    />
  );
};

export default AdminToursPage;
