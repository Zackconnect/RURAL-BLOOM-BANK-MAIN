import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { news } from "@/lib/site-data";
import { Calendar, ChevronRight } from "lucide-react";

const extended = [
  ...news,
  { title: "Financial Literacy Week Reaches 12,000 Students", date: "10 June 2026", excerpt: "AKRB volunteers deliver hands-on money workshops in 40 senior high schools.", img: "https://source.unsplash.com/800x600/?black%20students,banking" },
  { title: "New Branch Opens in Ho, Volta Region", date: "22 May 2026", excerpt: "Our 51st branch expands access to modern banking for eastern Ghana.", img: "https://source.unsplash.com/800x600/?black%20people%20bank%20branch" },
  { title: "AKRB and MoFA Partner on Cocoa Value Chain", date: "05 May 2026", excerpt: "Concessional finance for 3,500 cocoa farmers under a new MoU with government.", img: "https://source.unsplash.com/800x600/?black%20farmer,cocoa" },
];

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Insights — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Announcements, product launches, and community stories from St. Margaret Co-operative Savings and Development Society." },
      { property: "og:title", content: "News — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "The latest from St. Margaret Co-operative Savings and Development Society." },
    ],
  }),
  component: News,
});

function News() {
  return (
    <>
      <PageHeader eyebrow="Newsroom" title="What's happening at AKRB" desc="Product launches, community impact, and the stories behind the numbers." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {extended.map((n) => (
            <article key={n.title} className="group overflow-hidden rounded-3xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {n.date}
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Read article <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
