import type { Metadata } from "next";
import { PasswordResetForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "eBid | Password Reset",
  description: "Request Password Reset",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={process.env.NEXT_PUBLIC_LOGO}
          alt="eBid"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  );
}
