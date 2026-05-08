import { cookies } from 'next/headers';

import DestinationDetailsComponent from '@/components/destinations/AdminDestinationDetails';

const BACKEND_URL = process.env.BACKEND_URL;

const AdminDestinationDetailsPage = async ({ params }) => {

  const { id } = await params;

  const response = await fetch(
    `${BACKEND_URL}/api/v1/destinations/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        cookie: (await cookies()).toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch destination details.'
    );
  }

  const data = await response.json();

  const destinationData =
    data.destination_details;

  // optional safety check
  if (!destinationData) {
    throw new Error(
      'Destination not found.'
    );
  }

  return (
    <DestinationDetailsComponent
      destination={destinationData}
    />
  );
};

export default AdminDestinationDetailsPage;
