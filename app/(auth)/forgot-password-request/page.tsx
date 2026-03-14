import React from "react";
import { AuthProvider } from "@/context/authContext";
import PasswordChangeReqForm from "@/components/auth/passwordChangeReqForm";

const ForgotPasswordRequest = () => {
  return (
    <main className="bg-Grey2 flex min-h-screen flex-col items-center justify-center gap-6 py-10">
      <section className="card container !max-w-lg space-y-6 !rounded-2xl p-5">
        <article className="space-y-5 px-0 text-center lg:px-16">
          <h4 className="">Forgot Password?</h4>
          <h5 className="text-grey-500 text-sm">
            Enter your registered email and we&apos;ll send you a code to reset
            your password
          </h5>
        </article>
        <AuthProvider>
          <PasswordChangeReqForm />
        </AuthProvider>
      </section>
    </main>
  );
};

export default ForgotPasswordRequest;
