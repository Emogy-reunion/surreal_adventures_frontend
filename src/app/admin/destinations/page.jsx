import { cookies } from 'next/headers';

import DestinationsComponent from '@/components/destinations/AdminDestinationComponent';

const BACKEND_URL = process.env.BACKEND_URL;

const AdminDestinationsPage = async ({ searchParams }) => {

  const page = (await searchParams).page || 1;

  const url = `${BACKEND_URL}/api/v1/destinations?page=${page}&per_page=12`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      cookie: (await cookies()).toString(),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      'Failed to fetch destinations.'
    );
  }

  const data = await response.json();

  return (
    <DestinationsComponent
      data={data}
    />
  );
};

export default AdminDestinationsPage;
