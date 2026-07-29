import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, Section } from "@/components/site/Section";
import { getBranchItems, isAdminLoggedIn, updateBranchItem } from "@/lib/admin";
import { toast } from "sonner";
import { Phone, MapPin, Clock, Search, ImageIcon, Pencil, Navigation } from "lucide-react";

export const Route = createFileRoute("/branches")({
  head: () => ({
      meta: [
      { title: "Branch Locator — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Find St. Margaret Co-operative Savings and Development Society. branches across Ghana. 50+ locations with full-service banking and ATMs." },
      { property: "og:title", content: "Branch Locator — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "50+ branches across Ghana." },
    ],
  }),
  component: Branches,
});

function Branches() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState(() => getBranchItems());
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<any>(null);
  const [inlineEditId, setInlineEditId] = useState<string | null>(null);
  const [inlineDraft, setInlineDraft] = useState<any>(null);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Refresh items if branches are updated in another tab/admin action (localStorage)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "akrb-branches") {
        setItems(getBranchItems());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
    const filtered = items.filter(
      (b) =>
        b.name.toLowerCase().includes(q.toLowerCase()) ||
        b.region.toLowerCase().includes(q.toLowerCase()) ||
        b.address.toLowerCase().includes(q.toLowerCase()),
    );

  return (
    <>
      <PageHeader eyebrow="Branches" title="Find a branch near you" desc="50+ locations across Ghana — walk in and we'll take care of the rest." />
      <Section>
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-card md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border bg-background px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by city, region, or branch name…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {items.length}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          <div className="grid gap-4">
            {filtered.map((b) => (
                <div key={b.id} className="rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{b.name}</h3>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-primary">{b.region}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 rounded-full"
                      onClick={() => {
                        // toggle expansion for this branch card
                        setExpandedIds((prev) => (prev.includes(b.id) ? prev.filter((id) => id !== b.id) : [...prev, b.id]));
                        // focus right detail panel
                        setSelectedId(b.id);
                        setIsEditing(false);
                        setDraft(null);
                      }}
                    >
                      <Navigation className="mr-1 h-3.5 w-3.5" /> Directions
                    </Button>
                    {isAdminLoggedIn() && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedId(b.id);
                          setIsEditing(true);
                          setDraft({ ...b });
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                  {/* thumbnail under actions - clickable to open details */}
                  <div className="mt-3">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => { setSelectedId(b.id); setIsEditing(false); setDraft(null); }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedId(b.id); setIsEditing(false); setDraft(null); } }}
                      className="inline-block h-20 w-28 overflow-hidden rounded-md bg-muted cursor-pointer"
                      aria-label={`Open details for ${b.name}`}
                    >
                      {b.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <ImageIcon />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {b.address}</li>
                  <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> {b.phone}</li>
                  <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-primary" /> {b.hours}</li>
                </ul>

                {expandedIds.includes(b.id) && (
                  <div className="mt-4 rounded-lg border bg-background p-4">
                    <div className="flex items-start gap-4">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => { setSelectedId(b.id); setIsEditing(false); setDraft(null); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedId(b.id); setIsEditing(false); setDraft(null); } }}
                        className="h-24 w-36 overflow-hidden rounded-md bg-muted cursor-pointer"
                        aria-label={`Open details for ${b.name}`}
                      >
                        {b.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <ImageIcon />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 text-sm text-muted-foreground">Preview</div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => { setSelectedId(b.id); setIsEditing(false); /* focus right panel */ }}>
                            More information
                          </Button>
                          {isAdminLoggedIn() && (
                            <Button size="sm" variant="ghost" onClick={() => { setInlineEditId(b.id); setInlineDraft({ ...b }); }}>
                              <Pencil className="h-4 w-4" /> Edit
                            </Button>
                          )}
                        </div>

                        {inlineEditId === b.id && inlineDraft && (
                          <div className="mt-3 space-y-2">
                            <Input value={inlineDraft.name} onChange={(e) => setInlineDraft({ ...inlineDraft, name: e.target.value })} placeholder="Branch name" />
                            <Input value={inlineDraft.address} onChange={(e) => setInlineDraft({ ...inlineDraft, address: e.target.value })} placeholder="Address" />
                            <Input value={inlineDraft.phone} onChange={(e) => setInlineDraft({ ...inlineDraft, phone: e.target.value })} placeholder="Phone" />
                            <Input value={inlineDraft.hours} onChange={(e) => setInlineDraft({ ...inlineDraft, hours: e.target.value })} placeholder="Hours" />
                            <Input value={inlineDraft.image} onChange={(e) => setInlineDraft({ ...inlineDraft, image: e.target.value })} placeholder="Image URL" />
                            <div className="flex gap-2">
                              <Button onClick={() => {
                                    if (!isAdminLoggedIn()) { toast.error("Sign in as admin to save changes."); return; }
                                    updateBranchItem(b.id, {
                                      name: inlineDraft.name,
                                      address: inlineDraft.address,
                                      phone: inlineDraft.phone,
                                      hours: inlineDraft.hours,
                                      region: inlineDraft.region ?? b.region,
                                      image: inlineDraft.image,
                                    });
                                    const next = getBranchItems();
                                    setItems(next);
                                    setInlineEditId(null);
                                    setInlineDraft(null);
                                  }}>Save</Button>
                              <Button variant="ghost" onClick={() => { setInlineEditId(null); setInlineDraft(null); }}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="sticky top-24 h-[600px] overflow-hidden rounded-3xl border shadow-elegant bg-card p-4">
            {items && selectedId ? (
              (() => {
                const s = items.find((it) => it.id === selectedId) ?? items[0];
                if (!s) return <div className="p-6">No branch selected</div>;
                return (
                  <div className="h-full overflow-auto p-4">
                    <div className="mb-4 h-40 w-full overflow-hidden rounded-lg bg-muted">
                      {s.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <ImageIcon />
                        </div>
                      )}
                    </div>
                    {!isEditing && (
                      <div>
                        <h3 className="text-lg font-bold">{s.name}</h3>
                        <div className="mt-1 text-sm text-muted-foreground">{s.region}</div>
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {s.address}</li>
                          <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> {s.phone}</li>
                          <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-primary" /> {s.hours}</li>
                        </ul>
                        {isAdminLoggedIn() && (
                          <div className="mt-4">
                            <Button onClick={() => { setIsEditing(true); setDraft({ ...s }); }}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit branch
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {isEditing && draft && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <Label>Name</Label>
                          <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                        </div>
                        <div>
                          <Label>Region</Label>
                          <Input value={draft.region} onChange={(e) => setDraft({ ...draft, region: e.target.value })} />
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                        </div>
                        <div>
                          <Label>Hours</Label>
                          <Input value={draft.hours} onChange={(e) => setDraft({ ...draft, hours: e.target.value })} />
                        </div>
                        <div>
                          <Label>Image URL</Label>
                          <Input value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              if (!isAdminLoggedIn()) { toast.error("Sign in as admin to save changes."); return; }
                              updateBranchItem(s.id, {
                                name: draft.name,
                                address: draft.address,
                                phone: draft.phone,
                                hours: draft.hours,
                                region: draft.region,
                                image: draft.image,
                              });
                              const next = getBranchItems();
                              setItems(next);
                              setIsEditing(false);
                            }}
                          >
                            Save
                          </Button>
                          <Button variant="ghost" onClick={() => { setIsEditing(false); setDraft(null); }}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="p-6">No branches available</div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
