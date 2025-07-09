import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtp";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
