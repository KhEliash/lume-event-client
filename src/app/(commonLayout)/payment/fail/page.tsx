 import { Suspense } from "react";
import FailClient from "./fail-client";

export default function FailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailClient />
    </Suspense>
  );
}
