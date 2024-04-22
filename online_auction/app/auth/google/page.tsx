"use client";

import { useSocialAuthMutation } from "@/redux/features/authApiSlice";
import { useSocialAuth } from "@/hooks";
import { Spinner } from "@/components/common";

export default function Page() {
  const [googleAuth] = useSocialAuthMutation();
  useSocialAuth(googleAuth, "google-oauth2");
  return (
    <div className="my-8">
      <Spinner lg />
    </div>
  );
}
