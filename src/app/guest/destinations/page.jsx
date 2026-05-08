import DestinationsComponent from '@/components/destinations/GuestDestinationComponent';

const BACKEND_URL = process.env.BACKEND_URL;

const GuestDestinationsPage = async ({ searchParams }) => {

  const page = (await searchParams).page || 1;

  const url = `${BACKEND_URL}/api/v1/destinations?page=${page}&per_page=12`;

  const response = await fetch(url, {
    method: 'GET',
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

export default GuestDestinationsPage;
