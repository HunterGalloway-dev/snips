import { auth, signIn } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="w-full">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl">Snips</a>
          </div>
          <div className="navbar-end">
            <form
              action={async () => {
                "use server";
                try {
                  await signIn("github", { redirectTo: "/snips" });
                } catch (error) {
                  throw error;
                }
              }}
            >
              <button className="btn btn-accent" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
