"use client";

import { Form } from "@/components/forms";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      link: {
        linkText: "Forgot your password?",
        linkUrl: "/auth/password-reset",
      },
      required: true,
    },
  ];
  return (
    <Form
      config={config}
      isLoading={isLoading}
      btnText="Sign in"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
