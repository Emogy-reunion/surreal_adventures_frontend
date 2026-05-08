
import GuestDestinationDetailsComponent from '@/components/destinations/GuestDestinationDetails';

const BACKEND_URL = process.env.BACKEND_URL;

const GuestDestinationDetailsPage = async ({ params }) => {

  const { id } = await params;

  const response = await fetch(
    `${BACKEND_URL}/api/v1/destinations/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch destination details.'
    );
  }

  const data = await response.json();

  const destinationData = data.destination_details;

  if (!destinationData) {
    throw new Error(
      'Destination not found.'
    );
  }

  return (
    <GuestDestinationDetailsComponent
      destination={destinationData}
    />
  );
};

export default GuestDestinationDetailsPage;
