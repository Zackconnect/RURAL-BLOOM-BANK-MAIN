import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, Section } from "@/components/site/Section";
import { getBranchItems, isAdminLoggedIn, updateBranchItem } from "@/lib/admin";
import { toast } from "sonner";
import { Phone, MapPin, Clock, ImageIcon, Pencil } from "lucide-react";

export const Route = createFileRoute("/branches/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Branch — ${params.id}` },
      { name: "description", content: `Details about branch ${params.id}.` },
    ],
  }),
  component: BranchDetail,
});

function BranchDetail() {
  const { id } = useParams({ from: Route, strict: true });
  const [items, setItems] = useState(() => getBranchItems());
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<any>(null);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "akrb-branches") {
        setItems(getBranchItems());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const branch = items.find((item) => item.id === id);

  if (!branch) {
    return (
      <Section>
        <PageHeader eyebrow="Branch not found" title="Branch not found" desc="The requested branch does not exist." />
        <div className="container-x">
          <div className="rounded-3xl border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">We could not find that branch.</p>
            <Button asChild className="mt-4">
              <Link to="/branches">Back to branches</Link>
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const mapQuery = branch.mapQuery ?? branch.address;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

  return (
    <>
      <PageHeader eyebrow="Branch details" title={branch.name} desc={`Details for ${branch.name} in ${branch.region}.`} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border bg-card p-6 shadow-card">
              <div className="mb-6 h-72 overflow-hidden rounded-3xl bg-muted">
                {branch.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{branch.hours}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-card">
              <div className="space-y-4">
                <div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground">Branch overview</div>
                  <p className="mt-2 text-sm text-muted-foreground">{branch.details ?? "Visit this branch for full-service banking, teller support, ATM access, and digital banking help."}</p>
                </div>

                {branch.gallery?.length ? (
                  <div>
                    <div className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">Gallery</div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {branch.gallery.map((src, index) => (
                        <div key={index} className="overflow-hidden rounded-3xl bg-muted">
                          <img src={src} alt={`${branch.name} photo ${index + 1}`} className="h-32 w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div>
                  <div className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">Map & directions</div>
                  <div className="overflow-hidden rounded-3xl border bg-muted">
                    <iframe
                      title={`${branch.name} map`}
                      src={mapUrl}
                      className="h-64 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button asChild>
                      <a href={mapSearchUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={directionsUrl} target="_blank" rel="noreferrer">Get directions</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <div className="space-y-4">
              <div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">Region</div>
                <div className="text-lg font-semibold">{branch.region}</div>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link to="/branches">Back to all branches</Link>
                </Button>
                {isAdminLoggedIn() && (
                  <Button onClick={() => { setIsEditing(true); setDraft({ ...branch }); }}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit branch
                  </Button>
                )}
              </div>

              {isEditing && draft && (
                <div className="space-y-3 rounded-2xl border bg-background p-4">
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
                  <div>
                    <Label>Details</Label>
                    <Input value={draft.details ?? ""} onChange={(e) => setDraft({ ...draft, details: e.target.value })} />
                  </div>
                  <div>
                    <Label>Map query</Label>
                    <Input value={draft.mapQuery ?? ""} onChange={(e) => setDraft({ ...draft, mapQuery: e.target.value })} />
                  </div>
                  <div>
                    <Label>Gallery image URLs (comma separated)</Label>
                    <Input
                      value={(draft.gallery ?? []).join(", ")}
                      onChange={(e) => setDraft({ ...draft, gallery: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        if (!isAdminLoggedIn()) {
                          toast.error("Sign in as admin to save changes.");
                          return;
                        }
                        updateBranchItem(branch.id, {
                          name: draft.name,
                          region: draft.region,
                          address: draft.address,
                          phone: draft.phone,
                          hours: draft.hours,
                          image: draft.image,
                          details: draft.details,
                          mapQuery: draft.mapQuery,
                          gallery: draft.gallery,
                        });
                        setItems(getBranchItems());
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
          </div>
        </div>
      </Section>
    </>
  );
}
