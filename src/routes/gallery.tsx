import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { gallery } from "@/lib/site-data";
import { useState } from "react";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Team Gallery — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Meet our dedicated team members and staff." },
      { property: "og:title", content: "Team Gallery" },
      { property: "og:description", content: "Our passionate team of banking professionals." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(-1);

  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Meet the team behind your trust"
        desc="Dedicated professionals committed to serving our members with excellence, integrity, and innovation."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((member, idx) => (
            <div
              key={idx}
              className="group cursor-pointer overflow-hidden rounded-3xl shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              onClick={() => setSelectedIdx(idx)}
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="border-t bg-card p-5">
                <h3 className="font-bold text-primary">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Image Modal */}
      {selectedIdx >= 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedIdx(-1)}
        >
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedIdx(-1)}
              className="absolute -right-12 top-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={gallery[selectedIdx].image}
              alt={gallery[selectedIdx].name}
              className="max-h-[80vh] w-full rounded-2xl object-cover"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{gallery[selectedIdx].name}</h3>
              <p className="text-sm text-white/80">{gallery[selectedIdx].role}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
