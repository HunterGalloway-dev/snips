import { auth, signIn } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import LandingPage from "./(components)/LandingPage";

export default async function Home() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <LandingPage />
    </SessionProvider>
  );
}
