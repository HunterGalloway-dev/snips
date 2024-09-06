import { signIn } from "@/auth";
import { SquareScissors } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="navbar fixed bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">
            <SquareScissors />
            Snips
          </a>
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
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Get Started Faster
            </h1>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Without Remebering
            </h1>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Boilerplate
            </h1>
            <h2 className="py-6 text-xl text-base-content">
              Save, Share, and Search Helpful Snippets
            </h2>

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
                Start Snipping
              </button>
            </form>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl animate-[slide_1s_ease-in-out_1]">
            <div className="mockup-code text-xl w-96 ">
              <pre data-prefix="" className="bg-accent text-base-100">
                <code>Create NextJS w/ Prisma</code>
              </pre>
              <pre data-prefix="$">
                <code>npx create-next-app@latest</code>
              </pre>
              <pre data-prefix="$">
                <code>npm install @prisma/client</code>
              </pre>
              <pre data-prefix="$">
                <code>npx prisma init</code>
              </pre>
              <pre data-prefix="$">
                <code>npm prisma migrate dev</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
