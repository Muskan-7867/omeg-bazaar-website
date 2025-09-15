import VerifyEmailScreen from "@/components/user/auth/verify/VerifyUser";
import React, { Suspense } from "react";

export default function verifyPage() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmailScreen />
      </Suspense>
    </>
  );
}
