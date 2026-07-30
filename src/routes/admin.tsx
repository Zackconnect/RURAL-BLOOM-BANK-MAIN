import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, Section } from "@/components/site/Section";
import { getContactSubmissions, isAdminLoggedIn, loginAdmin, logoutAdmin, updateContactSubmission, getGalleryItems, addGalleryItem, removeGalleryItem, getTestimonials, addTestimonialItem, removeTestimonialItem, getBranchItems, addBranchItem, updateBranchItem, removeBranchItem } from "@/lib/admin";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AKRB" },
      { name: "description", content: "Admin dashboard for customer contact submissions and gallery management." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "gallery" | "testimonials" | "branches">("contacts");
  const [submissions, setSubmissions] = useState(() => getContactSubmissions());
  const [gallery, setGallery] = useState(() => getGalleryItems());
  const [testimonials, setTestimonials] = useState(() => getTestimonials());
  const [branches, setBranches] = useState(() => getBranchItems());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Branch form states
  const [branchName, setBranchName] = useState("");
  const [branchRegion, setBranchRegion] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [branchHours, setBranchHours] = useState("");
  const [branchImageFile, setBranchImageFile] = useState<File | null>(null);
  const [branchImagePreview, setBranchImagePreview] = useState("");
  const [branchImageError, setBranchImageError] = useState("");
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [isBranchDragging, setIsBranchDragging] = useState(false);
  const [isBulkGalleryDragging, setIsBulkGalleryDragging] = useState(false);
  const [branchImageUrl, setBranchImageUrl] = useState("");

  // Gallery form states
  const [galleryName, setGalleryName] = useState("");
  const [galleryRole, setGalleryRole] = useState("");
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [galleryImagePreview, setGalleryImagePreview] = useState("");
  const [galleryImageError, setGalleryImageError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [publishSecretInput, setPublishSecretInput] = useState(() => (typeof window !== 'undefined' ? window.localStorage.getItem('akrb-publish-secret') ?? '' : ''));

  // Testimonial form states
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");
  const [testimonialQuote, setTestimonialQuote] = useState("");
  const [testimonialRating, setTestimonialRating] = useState(5);
  const [testimonialAvatarFile, setTestimonialAvatarFile] = useState<File | null>(null);
  const [testimonialAvatarPreview, setTestimonialAvatarPreview] = useState("");
  const [testimonialAvatarError, setTestimonialAvatarError] = useState("");
  const [isTestimonialDragging, setIsTestimonialDragging] = useState(false);

  useEffect(() => {
    setLoggedIn(isAdminLoggedIn());
  }, []);

  useEffect(() => {
    return () => {
      if (galleryImagePreview) {
        URL.revokeObjectURL(galleryImagePreview);
      }
      if (testimonialAvatarPreview) {
        URL.revokeObjectURL(testimonialAvatarPreview);
      }
    };
  }, [galleryImagePreview, testimonialAvatarPreview]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('akrb-publish-secret', publishSecretInput ?? '');
    } catch (e) {
      // ignore
    }
  }, [publishSecretInput]);

  const activeSubmission = useMemo(
    () => submissions.find((item) => item.id === selectedId) ?? null,
    [selectedId, submissions],
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      setLoggedIn(true);
      setUsername("");
      setPassword("");
      toast.success("Admin signed in.");
      setSubmissions(getContactSubmissions());
      return;
    }
    toast.error("Invalid username or password.");
  };

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
    setSelectedId(null);
  };

  const handleRespond = () => {
    if (!activeSubmission) return;
    if (!responseText.trim()) {
      toast.error("Enter a response before sending.");
      return;
    }
    const next = updateContactSubmission(activeSubmission.id, {
      status: "responded",
      response: responseText.trim(),
    });
    setSubmissions(next);
    setResponseText("");
    toast.success("Response saved.");
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryName.trim() || !galleryRole.trim() || !galleryImageFile) {
      toast.error("Please fill all fields and select a photo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = String(reader.result ?? "");
      addGalleryItem({
        name: galleryName,
        role: galleryRole,
        image: imageBase64,
      });
      setGallery(getGalleryItems());
      setGalleryName("");
      setGalleryRole("");
      setGalleryImageFile(null);
      setGalleryImagePreview("");
      setGalleryImageError("");
      toast.success("Photo added to gallery!");
      tryPublishGallery();
    };
    reader.onerror = () => {
      toast.error("Failed to read the selected photo. Please try again.");
    };
    reader.readAsDataURL(galleryImageFile);
  };

  const handleGalleryImageChange = (file: File | null) => {
    if (!file) {
      setGalleryImageFile(null);
      setGalleryImagePreview("");
      setGalleryImageError("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setGalleryImageError("Please select a valid image file.");
      setGalleryImageFile(null);
      setGalleryImagePreview("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setGalleryImageError("Image file should be 5MB or smaller.");
      setGalleryImageFile(null);
      setGalleryImagePreview("");
      return;
    }

    setGalleryImageError("");
    setGalleryImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setGalleryImagePreview(previewUrl);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    handleGalleryImageChange(file);
  };

  const handleRemoveGalleryItem = (id: string) => {
    removeGalleryItem(id);
    setGallery(getGalleryItems());
    toast.success("Photo removed from gallery.");
    tryPublishGallery();
  };

  const tryPublishGallery = async () => {
    try {
      if (typeof window === 'undefined') return;
      const secret = window.localStorage.getItem('akrb-publish-secret');
      if (!secret) return;
      const items = getGalleryItems().map((it) => ({ name: it.name, role: it.role, image: it.image }));
      const resp = await fetch('/api/publish-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-publish-secret': secret },
        body: JSON.stringify({ gallery: items }),
      });
      if (!resp.ok) {
        const t = await resp.text().catch(() => '');
        console.warn('publish failed', t);
        return;
      }
      toast.success('Published gallery to repo (visible to all).');
    } catch (err) {
      console.error('publish error', err);
    }
  };

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchName.trim() || !branchRegion.trim() || !branchAddress.trim()) {
      toast.error("Please fill the branch name, region and address.");
      return;
    }

      const finishAdd = (imageValue: string) => {
        addBranchItem({ name: branchName, region: branchRegion, address: branchAddress, phone: branchPhone, hours: branchHours, image: imageValue });
        setBranches(getBranchItems());
        setBranchName(""); setBranchRegion(""); setBranchAddress(""); setBranchPhone(""); setBranchHours(""); setBranchImageFile(null); setBranchImagePreview("");
        toast.success("Branch added.");
      };

    if (branchImageFile) {
      const reader = new FileReader();
      reader.onload = () => finishAdd(String(reader.result ?? ""));
      reader.onerror = () => toast.error("Failed to read image file.");
      reader.readAsDataURL(branchImageFile);
      return;
    }

    // prefer image URL if provided
    if (branchImageUrl.trim()) {
      finishAdd(branchImageUrl.trim());
      setBranchImageUrl("");
      return;
    }

    finishAdd("");
  };

  const handleRemoveBranch = (id: string) => {
    removeBranchItem(id);
    setBranches(getBranchItems());
    toast.success("Branch removed.");
  };

  // Bulk import images as new branches
  const handleBulkBranchDrop = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const toAdd = Array.from(files);
    try {
      await Promise.all(
        toAdd.map(async (file) => {
          if (!file.type.startsWith("image/")) return;
          const base64 = await new Promise<string>((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(String(r.result ?? ""));
            r.onerror = rej;
            r.readAsDataURL(file);
          });
          const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
          addBranchItem({ name: name, region: "", address: "", phone: "", hours: "", image: base64 });
        }),
      );
      setBranches(getBranchItems());
      toast.success("Imported images as branches.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to import images.");
    }
  };

  // Bulk add images to gallery
  const handleBulkAddGallery = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const toAdd = Array.from(files);
    try {
      await Promise.all(
        toAdd.map(async (file) => {
          if (!file.type.startsWith("image/")) return;
          const base64 = await new Promise<string>((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(String(r.result ?? ""));
            r.onerror = rej;
            r.readAsDataURL(file);
          });
          const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
          addGalleryItem({ name: name, role: "", image: base64 });
        }),
      );
      setGallery(getGalleryItems());
      toast.success("Added images to gallery.");
      tryPublishGallery();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add gallery images.");
    }
  };

  const handleStartEditBranch = (id: string) => {
    const b = getBranchItems().find((x) => x.id === id);
    if (!b) return;
    setEditingBranchId(id);
    setBranchName(b.name); setBranchRegion(b.region); setBranchAddress(b.address); setBranchPhone(b.phone); setBranchHours(b.hours); setBranchImagePreview(b.image ?? "");
  };

  const handleSaveEditBranch = () => {
    if (!editingBranchId) return;
    if (!isAdminLoggedIn()) { toast.error("You must be signed in as admin."); return; }
    const finishUpdate = (imageValue: string) => {
      updateBranchItem(editingBranchId, { name: branchName, region: branchRegion, address: branchAddress, phone: branchPhone, hours: branchHours, image: imageValue });
      setBranches(getBranchItems());
      setEditingBranchId(null);
      setBranchName(""); setBranchRegion(""); setBranchAddress(""); setBranchPhone(""); setBranchHours(""); setBranchImagePreview("");
      toast.success("Branch updated.");
    };

    if (branchImageFile) {
      const reader = new FileReader();
      reader.onload = () => finishUpdate(String(reader.result ?? ""));
      reader.onerror = () => toast.error("Failed to read image file.");
      reader.readAsDataURL(branchImageFile);
      return;
    }

    finishUpdate(branchImagePreview);
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialName.trim() || !testimonialRole.trim() || !testimonialQuote.trim() || !testimonialAvatarFile) {
      toast.error("Please fill all fields and upload an avatar.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const avatarBase64 = String(reader.result ?? "");
      addTestimonialItem({
        name: testimonialName,
        role: testimonialRole,
        quote: testimonialQuote,
        rating: testimonialRating,
        avatar: avatarBase64,
      });
      setTestimonials(getTestimonials());
      setTestimonialName("");
      setTestimonialRole("");
      setTestimonialQuote("");
      setTestimonialRating(5);
      setTestimonialAvatarFile(null);
      setTestimonialAvatarPreview("");
      setTestimonialAvatarError("");
      toast.success("Testimonial added successfully.");
    };
    reader.onerror = () => {
      toast.error("Failed to read the avatar file. Please try again.");
    };
    reader.readAsDataURL(testimonialAvatarFile);
  };

  const handleTestimonialAvatarChange = (file: File | null) => {
    if (!file) {
      setTestimonialAvatarFile(null);
      setTestimonialAvatarPreview("");
      setTestimonialAvatarError("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setTestimonialAvatarError("Please select a valid image file.");
      setTestimonialAvatarFile(null);
      setTestimonialAvatarPreview("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setTestimonialAvatarError("Image file should be 5MB or smaller.");
      setTestimonialAvatarFile(null);
      setTestimonialAvatarPreview("");
      return;
    }

    setTestimonialAvatarError("");
    setTestimonialAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);
    setTestimonialAvatarPreview(previewUrl);
  };

  const handleTestimonialDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsTestimonialDragging(true);
  };

  const handleTestimonialDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsTestimonialDragging(false);
  };

  const handleTestimonialDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsTestimonialDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    handleTestimonialAvatarChange(file);
  };

  const handleRemoveTestimonialItem = (id: string) => {
    removeTestimonialItem(id);
    setTestimonials(getTestimonials());
    toast.success("Testimonial removed.");
  };

  if (!loggedIn) {
    return (
      <>
        <PageHeader eyebrow="Admin" title="Sign in to manage requests" desc="Enter your admin credentials to review customer messages and reply." />
        <Section>
          <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-3xl border bg-card p-8 shadow-elegant">
            <div className="mb-6 rounded-3xl border bg-secondary/40 p-5">
              <p className="text-sm text-muted-foreground">Use admin/admin123 to sign in.</p>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" required />
              </div>
              <div>
                <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <Button type="submit" className="rounded-full gradient-primary text-primary-foreground">
                Sign in
              </Button>
            </div>
          </form>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Admin Dashboard" desc="Manage customer requests and gallery photos." />
      <Section>
<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "contacts"
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border bg-card hover:border-primary"
              }`}
            >
              Contact Requests
            </button>
            <button
              onClick={() => setActiveTab("branches")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "branches"
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border bg-card hover:border-primary"
              }`}
            >
              Branches
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "gallery"
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border bg-card hover:border-primary"
              }`}
            >
              Gallery Management
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "testimonials"
                  ? "gradient-primary text-primary-foreground shadow-elegant"
                  : "border bg-card hover:border-primary"
              }`}
            >
              Testimonials
            </button>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-full">
            Sign out
          </Button>
        </div>

        {/* Contact Requests Tab */}
        {activeTab === "contacts" && (
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2">
              <h2 className="mb-4 text-xl font-semibold">Requests</h2>
              {submissions.length === 0 ? (
                <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
                  No customer messages have been submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <button
                      key={submission.id}
                      type="button"
                      onClick={() => setSelectedId(submission.id)}
                      className={`w-full rounded-3xl border p-5 text-left transition-all ${
                        submission.id === selectedId ? "border-primary bg-primary/5" : "border-input bg-card hover:border-primary/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">{submission.subject}</div>
                          <div className="text-xs text-muted-foreground">{submission.name} • {submission.email}</div>
                        </div>
                        <div className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {submission.status}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{submission.message}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              {activeSubmission ? (
                <div className="rounded-3xl border bg-card p-8 shadow-elegant">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected request</div>
                      <div className="text-lg font-semibold">{activeSubmission.subject}</div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {new Date(activeSubmission.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <div className="font-semibold">Customer</div>
                      <div>{activeSubmission.name}</div>
                      <div>{activeSubmission.email}</div>
                      <div>{activeSubmission.phone}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Message</div>
                      <div>{activeSubmission.message}</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                      Response
                    </Label>
                    <Textarea
                      rows={6}
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write your reply here..."
                    />
                  </div>
                  <Button onClick={handleRespond} className="mt-6 rounded-full gradient-primary text-primary-foreground">
                    Save response
                  </Button>
                  {activeSubmission.response ? (
                    <div className="mt-6 rounded-3xl border bg-secondary/5 p-4 text-sm text-muted-foreground">
                      <div className="font-semibold">Last response</div>
                      <p className="mt-2 whitespace-pre-wrap">{activeSubmission.response}</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
                  Select a request from the left to view details and respond.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Management Tab */}
        {activeTab === "gallery" && (
          <>
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2">
              <div className="rounded-3xl border bg-card p-8 shadow-elegant">
                <h3 className="mb-6 text-lg font-semibold">Add Team Member Photo</h3>
                <form onSubmit={handleAddGalleryItem} className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                    <Input
                      value={galleryName}
                      onChange={(e) => setGalleryName(e.target.value)}
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Role/Position</Label>
                    <Input
                      value={galleryRole}
                      onChange={(e) => setGalleryRole(e.target.value)}
                      placeholder="e.g., Finance Manager"
                      required
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Upload Photo</Label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`group relative rounded-3xl border px-4 py-10 text-center transition-all ${
                        isDragging ? "border-primary bg-primary/10" : "border-input bg-card hover:border-primary/70"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                          <span className="text-xl">📤</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">Drag & drop a photo here</p>
                          <p className="text-xs text-muted-foreground">or click to browse</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGalleryImageChange(e.target.files?.[0] ?? null)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        required
                      />
                    </div>
                    {galleryImageError ? (
                      <p className="mt-2 text-xs text-red-500">{galleryImageError}</p>
                    ) : null}
                    {galleryImagePreview ? (
                      <div className="mt-3 overflow-hidden rounded-3xl border bg-muted/10">
                        <img src={galleryImagePreview} alt="Preview" className="h-48 w-full object-cover" />
                      </div>
                    ) : null}
                  </div>
                  <Button type="submit" className="w-full rounded-full gradient-primary text-primary-foreground">
                    Add to Gallery
                  </Button>
                  <div className="mt-4">
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Publish Secret (optional)</Label>
                    <Input value={publishSecretInput} onChange={(e) => setPublishSecretInput(e.target.value)} placeholder="Set publish secret for repo commits" />
                    <p className="mt-2 text-xs text-muted-foreground">When set, gallery changes are automatically published to the repository.</p>
                  </div>
                </form>
              </div>

              <div className="w-full xl:w-1/2 mt-6">
                <div className="rounded-3xl border bg-card p-8 shadow-elegant">
                  <h3 className="mb-4 text-lg font-semibold">Bulk add to gallery (drop images)</h3>
                  <div
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsBulkGalleryDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsBulkGalleryDragging(false); }}
                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsBulkGalleryDragging(false); handleBulkAddGallery(e.dataTransfer.files); }}
                    className={`group relative rounded-3xl border px-4 py-10 text-center transition-all ${isBulkGalleryDragging ? "border-primary bg-primary/10" : "border-input bg-card hover:border-primary/70"}`}
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">📁</div>
                      <div>
                        <p className="text-sm font-semibold text-primary">Drop multiple photos here to add to gallery</p>
                        <p className="text-xs text-muted-foreground">Each file will become a gallery item (name from filename).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <h3 className="mb-4 text-lg font-semibold">Gallery Photos ({gallery.length})</h3>
              {gallery.length === 0 ? (
                <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
                  No photos in gallery yet. Add one to get started!
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {gallery.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-2xl border bg-card p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.role}</div>
                        <div className="text-xs text-muted-foreground">Added {new Date(item.addedAt).toLocaleDateString()}</div>
                      </div>
                      <button
                        onClick={() => handleRemoveGalleryItem(item.id)}
                        className="self-center rounded-lg p-2 hover:bg-red-50 hover:text-red-600 transition-all"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border bg-card p-8 shadow-elegant">
              <h3 className="mb-6 text-lg font-semibold">Add Testimonial</h3>
              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div>
                  <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                  <Input
                    value={testimonialName}
                    onChange={(e) => setTestimonialName(e.target.value)}
                    placeholder="e.g., Ama Serwaa"
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Role</Label>
                  <Input
                    value={testimonialRole}
                    onChange={(e) => setTestimonialRole(e.target.value)}
                    placeholder="e.g., SME Owner"
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Rating</Label>
                  <select
                    value={testimonialRating}
                    onChange={(e) => setTestimonialRating(Number(e.target.value))}
                    className="w-full rounded-2xl border bg-background px-4 py-3 text-sm"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>{rating} stars</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Quote</Label>
                  <Textarea
                    rows={4}
                    value={testimonialQuote}
                    onChange={(e) => setTestimonialQuote(e.target.value)}
                    placeholder="Enter the testimonial quote"
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Upload Avatar</Label>
                  <div
                    onDragOver={handleTestimonialDragOver}
                    onDragLeave={handleTestimonialDragLeave}
                    onDrop={handleTestimonialDrop}
                    className={`group relative rounded-3xl border px-4 py-10 text-center transition-all ${
                      isTestimonialDragging ? "border-primary bg-primary/10" : "border-input bg-card hover:border-primary/70"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                        <span className="text-xl">📸</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">Drag & drop an avatar here</p>
                        <p className="text-xs text-muted-foreground">or click to browse</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleTestimonialAvatarChange(e.target.files?.[0] ?? null)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      required
                    />
                  </div>
                  {testimonialAvatarError ? (
                    <p className="mt-2 text-xs text-red-500">{testimonialAvatarError}</p>
                  ) : null}
                  {testimonialAvatarPreview ? (
                    <div className="mt-3 overflow-hidden rounded-3xl border bg-muted/10">
                      <img src={testimonialAvatarPreview} alt="Avatar preview" className="h-48 w-full object-cover" />
                    </div>
                  ) : null}
                </div>
                <Button type="submit" className="w-full rounded-full gradient-primary text-primary-foreground">
                  Add Testimonial
                </Button>
              </form>
            </div>

            <div className="rounded-3xl border bg-card p-8 shadow-elegant">
              <h3 className="mb-6 text-lg font-semibold">Existing Testimonials ({testimonials.length})</h3>
              {testimonials.length === 0 ? (
                <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
                  No testimonials added yet.
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {testimonials.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-2xl border bg-card p-4">
                      <img src={item.avatar} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.role}</div>
                        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">"{item.quote}"</div>
                      </div>
                      <button
                        onClick={() => handleRemoveTestimonialItem(item.id)}
                        className="self-center rounded-lg p-2 hover:bg-red-50 hover:text-red-600 transition-all"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Branches Tab */}
        {activeTab === "branches" && (
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2">
              <h2 className="mb-4 text-xl font-semibold">Branches</h2>
              {branches.length === 0 ? (
                <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">No branches defined.</div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {branches.map((b) => (
                    <div key={b.id} className="flex gap-3 rounded-2xl border bg-card p-4">
                      <img src={b.image || "https://via.placeholder.com/80"} alt={b.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{b.name}</div>
                        <div className="text-xs text-muted-foreground">{b.region} • {b.address}</div>
                        <div className="text-xs text-muted-foreground">{b.phone}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => handleStartEditBranch(b.id)} variant="ghost">Edit</Button>
                        <Button onClick={() => handleRemoveBranch(b.id)} variant="destructive">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full xl:w-1/2">
              <div className="rounded-3xl border bg-card p-8 shadow-elegant">
                <h3 className="mb-6 text-lg font-semibold">{editingBranchId ? "Edit Branch" : "Add Branch"}</h3>
                <form onSubmit={handleAddBranch} className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                    <Input value={branchName} onChange={(e) => setBranchName(e.target.value)} placeholder="Branch name" required />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Region</Label>
                    <Input value={branchRegion} onChange={(e) => setBranchRegion(e.target.value)} placeholder="Region" required />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Address</Label>
                    <Input value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} placeholder="Address" required />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Phone</Label>
                    <Input value={branchPhone} onChange={(e) => setBranchPhone(e.target.value)} placeholder="Phone" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Hours</Label>
                    <Input value={branchHours} onChange={(e) => setBranchHours(e.target.value)} placeholder="Hours" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Upload Photo</Label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsBranchDragging(true); }}
                      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsBranchDragging(false); }}
                      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsBranchDragging(false); const file = e.dataTransfer.files?.[0] ?? null; if (file) { setBranchImageFile(file); setBranchImagePreview(URL.createObjectURL(file)); } }}
                      className={`group relative rounded-3xl border px-4 py-6 text-center transition-all ${isBranchDragging ? "border-primary bg-primary/10" : "border-input bg-card hover:border-primary/70"}`}
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                          <span className="text-xl">📤</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">Drag & drop a photo here</p>
                          <p className="text-xs text-muted-foreground">or click to browse</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => { setBranchImageFile(e.target.files?.[0] ?? null); if (e.target.files?.[0]) setBranchImagePreview(URL.createObjectURL(e.target.files[0])); }}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Or provide an image URL</div>
                    <Input value={branchImageUrl} onChange={(e) => setBranchImageUrl(e.target.value)} placeholder="https://... or data:image/..." />
                    {branchImagePreview ? <div className="mt-3 overflow-hidden rounded-3xl border bg-muted/10"><img src={branchImagePreview} alt="Preview" className="h-48 w-full object-cover" /></div> : null}
                  </div>
                  <div className="flex gap-2">
                    {editingBranchId ? (
                      <>
                        <Button type="button" onClick={handleSaveEditBranch}>Save changes</Button>
                        <Button type="button" variant="ghost" onClick={() => { setEditingBranchId(null); setBranchName(""); setBranchRegion(""); setBranchAddress(""); setBranchPhone(""); setBranchHours(""); setBranchImagePreview(""); }}>Cancel</Button>
                      </>
                    ) : (
                      <Button type="submit" className="rounded-full gradient-primary text-primary-foreground">Add Branch</Button>
                    )}
                  </div>
                </form>
              </div>
              <div className="rounded-3xl border bg-card p-8 shadow-elegant mt-4">
                <h3 className="mb-4 text-lg font-semibold">Bulk import branches (drop images)</h3>
                <div
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsBranchDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsBranchDragging(false); }}
                  onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsBranchDragging(false); handleBulkBranchDrop(e.dataTransfer.files); }}
                  className={`group relative rounded-3xl border px-4 py-10 text-center transition-all ${isBranchDragging ? "border-primary bg-primary/10" : "border-input bg-card hover:border-primary/70"}`}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">📤</div>
                    <div>
                      <p className="text-sm font-semibold text-primary">Drop multiple images here to create branch entries</p>
                      <p className="text-xs text-muted-foreground">Name will be derived from filename; edit details after import.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
