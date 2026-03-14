import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function page() {
  return (
    <main className="space-y-4">
      <h1>Home</h1>
    </main>
  );
}
