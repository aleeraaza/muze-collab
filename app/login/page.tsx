"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Music, Radio, ShieldCheck, Users } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M21.805 12.23c0-.788-.064-1.36-.202-1.955H12.18v3.73h5.53c-.11.926-.706 2.32-2.03 3.258l-.018.125 2.983 2.264.207.02c1.9-1.714 2.953-4.24 2.953-7.442Z"
        fill="#4285F4"
      />
      <path
        d="M12.18 21.75c2.708 0 4.977-.874 6.636-2.377l-3.172-2.408c-.844.578-1.98.983-3.464.983-2.653 0-4.904-1.714-5.712-4.085l-.12.01-3.102 2.352-.041.112c1.649 3.205 5.032 5.413 8.975 5.413Z"
        fill="#34A853"
      />
      <path
        d="M6.468 13.863a5.6 5.6 0 0 1-.335-1.863c0-.648.12-1.273.322-1.863l-.006-.132-3.142-2.39-.103.048A9.66 9.66 0 0 0 2.139 12c0 1.503.367 2.92 1.065 4.237l3.264-2.374Z"
        fill="#FBBC05"
      />
      <path
        d="M12.18 6.052c1.871 0 3.135.789 3.852 1.449l2.818-2.69C17.148 3.308 14.888 2.25 12.18 2.25c-3.943 0-7.326 2.208-8.976 5.413l3.252 2.474c.817-2.37 3.068-4.085 5.724-4.085Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [router, status]);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setIsSubmitting(false);
  };

  const isAuthenticated = status === "authenticated" && session?.user;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_24%,black)_0%,transparent_84%)]" />
      <div className="pointer-events-none absolute left-[6%] top-24 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-16 h-96 w-96 rounded-full bg-primary/14 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-foreground/70 backdrop-blur-xl">
            <Radio className="h-4 w-4 text-primary" />
            Sign in to join the live queue
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Bring your audience into the music without losing the vibe.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/70">
            MuzeCollab helps creators run a premium, collaborative stream queue
            where listeners can suggest tracks, vote in real time, and keep the
            room feeling alive.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Music,
                title: "Shared queue",
                copy: "Let fans surface the next best track instead of spamming chat.",
              },
              {
                icon: Users,
                title: "Live feedback",
                copy: "See what your audience actually wants while the stream is happening.",
              },
              {
                icon: ShieldCheck,
                title: "Creator control",
                copy: "Keep the experience curated while still opening the door to participation.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-foreground/60">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:justify-self-end">
          <Card className="relative max-w-xl overflow-hidden border border-white/10 bg-white/8 p-0 shadow-[0_20px_80px_rgba(9,13,34,0.6)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--color-primary)_18%,black),transparent_42%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="relative p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary shadow-[0_0_24px_rgba(104,83,255,0.2)]">
                  <Music className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    Welcome back
                  </p>
                  <p className="text-sm text-foreground/55">
                    Continue with Google to access your creator dashboard
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-background/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">
                  Google sign-in
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">
                  One secure step into your stream workspace
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground/65">
                  Sign in with the Google account you use for MuzeCollab. We
                  will create or reconnect your profile automatically.
                </p>

                <Button
                  size="lg"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="mt-8 h-12 w-full cursor-pointer justify-between rounded-xl px-5 bg-blue-900"
                >
                  <span className="flex items-center gap-3">
                    <GoogleIcon />
                    {isAuthenticated
                      ? "Redirecting to dashboard"
                      : isSubmitting
                        ? "Opening Google"
                        : "Continue with Google"}
                  </span>
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>

                <p className="mt-4 text-xs leading-6 text-foreground/50">
                  By continuing, you agree to sign in with Google and let
                  MuzeCollab identify your creator account for queue management.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
