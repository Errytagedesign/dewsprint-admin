import SignInForm from "@/components/auth/loginForm";
import { AuthProvider } from "@/context/authContext";
import { Suspense } from "react";

const Signin = () => {
  return (
    <main className="bg-Grey2 flex min-h-screen flex-col items-center justify-center gap-6 py-10">
      <section className="card container !max-w-lg space-y-6 !rounded-2xl p-5">
        <article className="text-center">
          <h4 className="text-grey-800 !mb-1">Welcome Back </h4>
          <h5 className="text-grey-500 text-sm">
            Sign into your account with your Staff ID
          </h5>
        </article>
        <Suspense>
          <AuthProvider>
            <SignInForm />
          </AuthProvider>
        </Suspense>
      </section>
    </main>
  );
};

export default Signin;
