 

 import { Suspense } from "react";
import Cancel from "./cancel-client";
 
export default function CancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cancel />
    </Suspense>
  );
}
