import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Site Disabled" },
      { name: "description", content: "This site has been disabled and is no longer available." },
    ],
  }),
  component: Disabled,
});

function Disabled() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-20 text-white">
      <div className="max-w-xl rounded-3xl border border-red-500/20 bg-slate-900/95 p-10 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">Site Disabled</p>
        <h1 className="mt-6 text-4xl font-bold">This site is no longer available</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">
          The public deployment has been disabled from the repository. Please do not use this link again.
        </p>
      </div>
    </div>
  );
}
