import ResetPasswordForm from "@/components/auth/resetPasswordForm";
import { AuthProvider } from "@/context/authContext";

const ChangePassword = () => {
  return (
    <main className="bg-Grey2 flex min-h-screen flex-col items-center justify-center gap-6 py-10">
      <section className="card container !max-w-lg space-y-6 p-5">
        <article className="!space-y-1 px-0 text-center lg:px-16">
          <h4>Reset Password</h4>
          <h5 className="text-grey-500 text-sm">Enter your new password</h5>
        </article>

        <AuthProvider>
          <ResetPasswordForm />
        </AuthProvider>
      </section>
    </main>
  );
};

export default ChangePassword;
