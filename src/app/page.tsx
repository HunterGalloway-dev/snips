import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
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
  );
}
