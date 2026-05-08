import ToursComponent from '@/components/tours/GuestToursComponent';

const BACKEND_URL = process.env.BACKEND_URL;

const ToursPage = async ({ searchParams }) => {

  const page = (await searchParams).page || 1;

  const url =
    `${BACKEND_URL}/api/v1/tours?page=${page}&per_page=12`;

  const response = await fetch(url, {
    method: 'GET',
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

export default ToursPage;
