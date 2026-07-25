import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  desc,
  children,
  className = "",
  center = true,
}: {
  eyebrow?: string;
  title?: string;
  desc?: string;
  children?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container-x">
        {(eyebrow || title || desc) && (
          <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {desc && <p className="mt-4 text-muted-foreground md:text-lg">{desc}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="relative overflow-hidden gradient-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(214,178,63,0.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25), transparent 40%)",
        }}
      />
      <div className="container-x relative py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {desc && <p className="mt-5 max-w-2xl text-lg opacity-90">{desc}</p>}
        </div>
      </div>
    </section>
  );
}
