import TourDetailsComponent from '@/components/tours/GuestTourDetails';

const BACKEND_URL = process.env.BACKEND_URL;

const TourDetailsPage = async ({ params }) => {

  const { id } = await params;

  const response = await fetch(
    `${BACKEND_URL}/api/v1/tours/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch tour details.'
    );
  }

  const data = await response.json();

  const tourData =
    data.tour_details;

  if (!tourData) {
    throw new Error(
      'Tour not found.'
    );
  }

  return (
    <TourDetailsComponent
      tour={tourData}
    />
  );
};

export default TourDetailsPage;
