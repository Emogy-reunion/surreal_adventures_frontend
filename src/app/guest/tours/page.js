import { Suspense } from "react";
import ToursPageClient from "./ToursPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading tours...</div>}>
      <ToursPageClient />
    </Suspense>
  );
}
