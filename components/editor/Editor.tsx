"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  ImagePlus,
  Loader2,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import {
  compressImage,
  demoDraft,
  emptyDraft,
  loadDraft,
  saveDraft,
} from "@/lib/draft";
import { THEME_LIST, themeStyle } from "@/lib/themes";
import type { Memory, Person, Vignette } from "@/lib/types";
import { cn, isVideoUrl, uid } from "@/lib/utils";
import { PreviewCard } from "./PreviewCard";
import {
  AddButton,
  EditorCard,
  Field,
  GroupTitle,
  Input,
  RemoveButton,
  Select,
  Textarea,
} from "./fields";

const STEPS = [
  { n: 1, label: "Asosiy" },
  { n: 2, label: "Dizayn" },
  { n: 3, label: "Xotiralar" },
  { n: 4, label: "Yakun" },
];

const COVERS = [
  { src: "/images/cover-graduation.jpg", label: "Oltin kun" },
  { src: "/images/memory-corridor.jpg", label: "Maktab" },
  { src: "/images/memory-classroom.jpg", label: "Sinf xonasi" },
  { src: "/images/memory-yard.jpg", label: "Hovli" },
  { src: "/images/memory-flowers.jpg", label: "Gullar" },
];

export function Editor() {
  const [draft, setDraft] = useState<Vignette | null>(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadMsg, setUploadMsg] = useState("");
  const [memoryUrl, setMemoryUrl] = useState("");
  const [memoryTitle, setMemoryTitle] = useState("");
  const coverInput = useRef<HTMLInputElement>(null);
  const memoryInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = loadDraft();
    setDraft(stored ?? demoDraft());
    setStatus(stored ? "saved" : "idle");
  }, []);

  // debounced autosave
  useEffect(() => {
    if (!draft) return;
    setStatus("saving");
    const t = window.setTimeout(() => {
      const res = saveDraft(draft);
      if (res.ok) {
        setStatus("saved");
        setErrorMsg("");
      } else {
        setStatus("error");
        setErrorMsg(res.error);
      }
    }, 700);
    return () => window.clearTimeout(t);
  }, [draft]);

  const patch = (p: Partial<Vignette>) =>
    setDraft((d) => (d ? { ...d, ...p } : d));

  const patchPerson = (
    list: "graduates" | "teachers",
    id: string,
    p: Partial<Person>,
  ) =>
    setDraft((d) =>
      d
        ? ({
            ...d,
            [list]: d[list].map((x) => (x.id === id ? { ...x, ...p } : x)),
          } as Vignette)
        : d,
    );

  const addPerson = (list: "graduates" | "teachers") =>
    setDraft((d) =>
      d
        ? ({
            ...d,
            [list]: [...d[list], { id: uid("p"), name: "", role: "", quote: "" }],
          } as Vignette)
        : d,
    );

  const removePerson = (list: "graduates" | "teachers", id: string) =>
    setDraft((d) =>
      d
        ? ({ ...d, [list]: d[list].filter((x) => x.id !== id) } as Vignette)
        : d,
    );

  const patchMemory = (id: string, p: Partial<Memory>) =>
    setDraft((d) =>
      d
        ? {
            ...d,
            memories: d.memories.map((m) => (m.id === id ? { ...m, ...p } : m)),
          }
        : d,
    );

  const addMemory = (src: string, title = "") => {
    if (!src.trim()) return;
    const type: Memory["type"] = isVideoUrl(src) ? "video" : "photo";
    setDraft((d) =>
      d
        ? {
            ...d,
            memories: [
              ...d.memories,
              {
                id: uid("m"),
                type,
                src: src.trim(),
                title: title.trim() || undefined,
                poster: type === "video" ? d.coverImage : undefined,
                ratio: type === "video" ? "wide" : "square",
              },
            ],
          }
        : d,
    );
    setMemoryUrl("");
    setMemoryTitle("");
  };

  const uploadMemory = async (file: File) => {
    setUploadMsg("");
    try {
      const dataUrl = await compressImage(file);
      addMemory(dataUrl, file.name.replace(/\.[^.]+$/, ""));
    } catch (err) {
      setUploadMsg(err instanceof Error ? err.message : "Yuklab bo‘lmadi.");
    }
  };

  const uploadCover = async (file: File) => {
    setUploadMsg("");
    try {
      const dataUrl = await compressImage(file, 2000, 0.85);
      patch({ coverImage: dataUrl });
    } catch (err) {
      setUploadMsg(err instanceof Error ? err.message : "Yuklab bo‘lmadi.");
    }
  };

  const uploadPersonPhoto = async (
    list: "graduates" | "teachers",
    id: string,
    file: File,
  ) => {
    setUploadMsg("");
    try {
      // portraits are small on screen — 640px keeps localStorage light
      const dataUrl = await compressImage(file, 640, 0.8);
      patchPerson(list, id, { photo: dataUrl });
    } catch (err) {
      setUploadMsg(err instanceof Error ? err.message : "Yuklab bo‘lmadi.");
    }
  };

  const downloadJson = () => {
    if (!draft) return;
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${draft.slug || "vinetka"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!draft) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink">
        <div className="flex items-center gap-3 text-ivory-dim/60">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">Tahrirlash yuklanmoqda…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[66px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Logo label={false} />
            <div className="hidden h-6 w-px bg-white/10 sm:block" />
            <div className="hidden sm:block">
              <p className="text-[11.5px] text-ivory">Vinetka tahrirlovchisi</p>
              <p className="text-[9.5px] text-ivory-dim/40">
                {draft.className || "Sinfingiz"} · {draft.graduationYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 text-[10px] text-ivory-dim/45 sm:flex">
              {status === "saving" && (
                <>
                  <Loader2 className="size-3 animate-spin" /> Saqlanmoqda
                </>
              )}
              {status === "saved" && (
                <>
                  <Check className="size-3 text-gold/70" /> Saqlandi
                </>
              )}
              {status === "error" && (
                <span className="text-red-300/80">Saqlanmadi</span>
              )}
              {status === "idle" && "Namuna ma’lumotlari"}
            </span>

            <button
              onClick={downloadJson}
              className="hidden items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-[10.5px] text-ivory-dim/75 transition-colors hover:border-white/35 hover:text-ivory sm:flex"
            >
              <Download className="size-3" /> JSON
            </button>
            <Link
              href="/v/preview"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[10.5px] font-semibold text-ink transition-colors hover:bg-[#ecd39c]"
            >
              Ko‘rish <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-gold/20 bg-gold/[0.04] px-4 py-3">
          <p className="flex items-center gap-2 text-[11px] text-ivory-dim/70">
            <Sparkles className="size-3.5 text-gold" />
            Shablon namuna ma’lumotlari bilan to‘ldirilgan — o‘zingiznikiga
            almashtiring.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm("Namuna ma’lumotlari qaytarilsinmi?")) {
                  setDraft(demoDraft());
                }
              }}
              className="inline-flex items-center gap-1.5 text-[10.5px] text-gold/80 hover:text-gold"
            >
              <RotateCcw className="size-3" /> Namuna
            </button>
            <span className="h-3 w-px bg-white/15" />
            <button
              onClick={() => {
                if (window.confirm("Hammasi tozalansinmi? Bu amalni qaytarib bo‘lmaydi.")) {
                  setDraft(emptyDraft());
                }
              }}
              className="inline-flex items-center gap-1.5 text-[10.5px] text-ivory-dim/45 hover:text-ivory"
            >
              <Trash2 className="size-3" /> Bo‘shdan
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0">
            <nav className="mb-7 flex gap-1 overflow-x-auto border-b border-white/10 pb-0">
              {STEPS.map((s) => (
                <button
                  key={s.n}
                  onClick={() => setStep(s.n)}
                  className={cn(
                    "relative shrink-0 px-4 py-3 text-[11.5px] transition-colors",
                    step === s.n
                      ? "text-ivory"
                      : "text-ivory-dim/40 hover:text-ivory-dim/70",
                  )}
                >
                  <span className="mr-2 font-serif text-[13px] text-gold/70">
                    0{s.n}
                  </span>
                  {s.label}
                  {step === s.n && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gold" />
                  )}
                </button>
              ))}
            </nav>

            {step === 1 && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Maktab nomi" hint="qopqoqda ko‘rinadi">
                    <Input
                      value={draft.school}
                      onChange={(e) => patch({ school: e.target.value })}
                      placeholder="Navoiy nomidagi 1-maktab"
                    />
                  </Field>
                  <Field label="Ustki yozuv" hint="ixtiyoriy">
                    <Input
                      value={draft.overline ?? ""}
                      onChange={(e) => patch({ overline: e.target.value })}
                      placeholder="Toshkent shahri, Yunusobod tumani"
                    />
                  </Field>
                  <Field label="Sinf" hint="masalan 11-A sinf">
                    <Input
                      value={draft.className}
                      onChange={(e) => patch({ className: e.target.value })}
                      placeholder="11-A sinf"
                    />
                  </Field>
                  <Field label="Bitiruv yili">
                    <Input
                      type="number"
                      value={draft.graduationYear}
                      onChange={(e) =>
                        patch({ graduationYear: Number(e.target.value) || "" })
                      }
                      placeholder="2026"
                    />
                  </Field>
                </div>

                <Field label="Shior" hint="qopqoq ostidagi bir jumla">
                  <Input
                    value={draft.motto ?? ""}
                    onChange={(e) => patch({ motto: e.target.value })}
                    placeholder="Biz birga yozgan yillar hech qachon tugamaydi."
                  />
                </Field>

                <div className="my-2 h-px bg-white/10" />

                <div>
                  <h3 className="font-serif text-xl text-ivory">
                    Sinf rahbari so‘zi
                  </h3>
                  <p className="mt-1 text-[11px] text-ivory-dim/40">
                    Bu bo‘lim eng ko‘p o‘qiladigan qism — samimiy yozing.
                  </p>
                </div>

                <EditorCard>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Sarlavha">
                      <Input
                        value={draft.letter?.title ?? ""}
                        onChange={(e) =>
                          patch({
                            letter: {
                              text: draft.letter?.text ?? "",
                              ...draft.letter,
                              title: e.target.value,
                            },
                          })
                        }
                        placeholder="Aziz bolalarim,"
                      />
                    </Field>
                    <Field label="Imzo">
                      <Input
                        value={draft.letter?.signature ?? ""}
                        onChange={(e) =>
                          patch({
                            letter: {
                              text: draft.letter?.text ?? "",
                              ...draft.letter,
                              signature: e.target.value,
                            },
                          })
                        }
                        placeholder="Zulfiya Ahmedova"
                      />
                    </Field>
                    <Field label="Lavozim">
                      <Input
                        value={draft.letter?.role ?? ""}
                        onChange={(e) =>
                          patch({
                            letter: {
                              text: draft.letter?.text ?? "",
                              ...draft.letter,
                              role: e.target.value,
                            },
                          })
                        }
                        placeholder="Sinf rahbari"
                      />
                    </Field>
                  </div>
                  <Field label="Xat matni" hint="bo‘sh qator — yangi abzas">
                    <Textarea
                      rows={7}
                      value={draft.letter?.text ?? ""}
                      onChange={(e) =>
                        patch({
                          letter: {
                            ...draft.letter,
                            text: e.target.value,
                            title: draft.letter?.title ?? "",
                          },
                        })
                      }
                      placeholder="Sizni birinchi sinfda ko‘rgan kunim hamon ko‘z oldimda…"
                    />
                  </Field>
                </EditorCard>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <h3 className="font-serif text-xl text-ivory">Rang va kayfiyat</h3>
                  <p className="mt-1 text-[11px] text-ivory-dim/40">
                    Tanlangan uslub butun vinetkaga ta’sir qiladi.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {THEME_LIST.map((t) => {
                    const active = draft.theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => patch({ theme: t.id })}
                        className={cn(
                          "group relative overflow-hidden rounded-sm border p-4 text-left transition-all duration-300",
                          active
                            ? "border-gold/60 bg-gold/[0.06]"
                            : "border-white/10 hover:border-white/25",
                        )}
                      >
                        <div
                          className="mb-3 flex h-10 items-end gap-1 overflow-hidden rounded-sm p-2"
                          style={themeStyle(t.id)}
                        >
                          <span
                            className="h-full flex-1 rounded-sm"
                            style={{ backgroundColor: "var(--v-accent)" }}
                          />
                          <span
                            className="h-2/3 flex-1 rounded-sm"
                            style={{ backgroundColor: "var(--v-ink)", opacity: 0.7 }}
                          />
                          <span
                            className="h-1/2 flex-1 rounded-sm"
                            style={{ backgroundColor: "var(--v-surface)" }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-ivory">{t.name}</span>
                          {active && <Check className="size-3.5 text-gold" />}
                        </div>
                        <p className="mt-1 text-[10px] leading-relaxed text-ivory-dim/40">
                          {t.note}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="my-2 h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-ivory">Qopqoq rasmi</h3>
                  <button
                    onClick={() => coverInput.current?.click()}
                    className="inline-flex items-center gap-1.5 text-[10.5px] text-gold/80 hover:text-gold"
                  >
                    <Upload className="size-3" /> O‘zimdan yuklash
                  </button>
                  <input
                    ref={coverInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadCover(f);
                      e.target.value = "";
                    }}
                  />
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {COVERS.map((c) => (
                    <button
                      key={c.src}
                      onClick={() => patch({ coverImage: c.src })}
                      className={cn(
                        "relative aspect-[3/4] overflow-hidden rounded-sm border transition-all duration-300",
                        draft.coverImage === c.src
                          ? "border-gold ring-1 ring-gold/40"
                          : "border-white/10 opacity-70 hover:opacity-100",
                      )}
                      title={c.label}
                    >
                      <Image
                        src={c.src}
                        alt={c.label}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                <Field label="Yoki rasm havolasi (URL)">
                  <Input
                    value={draft.coverImage.startsWith("data:") ? "" : draft.coverImage}
                    onChange={(e) => patch({ coverImage: e.target.value })}
                    placeholder="https://… yoki /images/cover.jpg"
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Rasm markazi" hint="vertikal siljish">
                    <Select
                      value={draft.coverPosition ?? "center 50%"}
                      onChange={(e) => patch({ coverPosition: e.target.value })}
                    >
                      <option value="center 25%">Yuqori</option>
                      <option value="center 45%">O‘rta</option>
                      <option value="center 65%">Past</option>
                      <option value="center 85%">Juda past</option>
                    </Select>
                  </Field>
                  <Field label="Fon musiqasi" hint="ixtiyoriy, mp3">
                    <Input
                      value={draft.audioUrl ?? ""}
                      onChange={(e) => patch({ audioUrl: e.target.value })}
                      placeholder="https://…/music.mp3"
                    />
                  </Field>
                </div>

                {uploadMsg && (
                  <p className="rounded-sm border border-red-400/30 bg-red-400/5 px-3 py-2 text-[11px] text-red-200/80">
                    {uploadMsg}
                  </p>
                )}

                <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
                    Maslahat
                  </p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ivory-dim/55">
                    Qopqoq uchun gorizontal, iliq yorug‘likdagi rasm eng yaxshi
                    ishlaydi. Tong va Shaftoli uslublari yorug‘ — ular bosma albom
                    kayfiyatini beradi, Oltin va Yulduzlar esa kinematik.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <GroupTitle
                  count={draft.graduates.length}
                  action={
                    <AddButton onClick={() => addPerson("graduates")}>Qo‘shish</AddButton>
                  }
                >
                  Bitiruvchilar
                </GroupTitle>

                <div className="space-y-3">
                  {draft.graduates.map((p, i) => (
                    <EditorCard key={p.id}>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.22em] text-ivory-dim/35">
                          {String(i + 1).padStart(2, "0")} · bitiruvchi
                        </span>
                        <RemoveButton
                          label="O‘chirish"
                          onClick={() => removePerson("graduates", p.id)}
                        />
                      </div>
                      <PhotoPicker
                        photo={p.photo}
                        name={p.name}
                        onFile={(f) => uploadPersonPhoto("graduates", p.id, f)}
                        onClear={() => patchPerson("graduates", p.id, { photo: undefined })}
                      />
                      <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
                        <Field label="Ism familiya">
                          <Input
                            value={p.name}
                            onChange={(e) =>
                              patchPerson("graduates", p.id, { name: e.target.value })
                            }
                            placeholder="Dilnoza Karimova"
                          />
                        </Field>
                        <Field label="Lavozim / orzu">
                          <Input
                            value={p.role ?? ""}
                            onChange={(e) =>
                              patchPerson("graduates", p.id, { role: e.target.value })
                            }
                            placeholder="Kelajakda shifokor"
                          />
                        </Field>
                      </div>
                      <Field label="Iqtibos" hint="ixtiyoriy">
                        <Input
                          value={p.quote ?? ""}
                          onChange={(e) =>
                            patchPerson("graduates", p.id, { quote: e.target.value })
                          }
                          placeholder="Birinchi kodimni shu sinfda yozgandim."
                        />
                      </Field>
                    </EditorCard>
                  ))}
                  {!draft.graduates.length && (
                    <div className="rounded-sm border border-dashed border-white/15 py-10 text-center">
                      <p className="text-[12px] text-ivory-dim/40">
                        Hali bitiruvchi qo‘shilmagan.
                      </p>
                      <div className="mt-3 flex justify-center">
                        <AddButton onClick={() => addPerson("graduates")}>
                          Birinchi bitiruvchini qo‘shish
                        </AddButton>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10" />

                <GroupTitle
                  count={draft.teachers.length}
                  action={<AddButton onClick={() => addPerson("teachers")}>Qo‘shish</AddButton>}
                >
                  Ustozlar
                </GroupTitle>

                <div className="space-y-3">
                  {draft.teachers.map((p) => (
                    <EditorCard key={p.id}>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.22em] text-ivory-dim/35">
                          ustoz
                        </span>
                        <RemoveButton
                          label="O‘chirish"
                          onClick={() => removePerson("teachers", p.id)}
                        />
                      </div>
                      <PhotoPicker
                        photo={p.photo}
                        name={p.name}
                        onFile={(f) => uploadPersonPhoto("teachers", p.id, f)}
                        onClear={() => patchPerson("teachers", p.id, { photo: undefined })}
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Ism familiya">
                          <Input
                            value={p.name}
                            onChange={(e) =>
                              patchPerson("teachers", p.id, { name: e.target.value })
                            }
                            placeholder="Ravshan Ergashev"
                          />
                        </Field>
                        <Field label="Fan / lavozim">
                          <Input
                            value={p.role ?? ""}
                            onChange={(e) =>
                              patchPerson("teachers", p.id, { role: e.target.value })
                            }
                            placeholder="Matematika o‘qituvchisi"
                          />
                        </Field>
                      </div>
                      <Field label="Ustoz so‘zi">
                        <Input
                          value={p.quote ?? ""}
                          onChange={(e) =>
                            patchPerson("teachers", p.id, { quote: e.target.value })
                          }
                          placeholder="Har bir tenglamaning yechimi bor."
                        />
                      </Field>
                    </EditorCard>
                  ))}
                </div>

                <div className="h-px bg-white/10" />

                <GroupTitle
                  count={draft.memories.length}
                  action={
                    <>
                      <button
                        onClick={() => memoryInput.current?.click()}
                        className="inline-flex items-center gap-1.5 text-[10.5px] text-gold/80 hover:text-gold"
                      >
                        <ImagePlus className="size-3.5" /> Rasm yuklash
                      </button>
                      <input
                        ref={memoryInput}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files ?? []);
                          for (const f of files) await uploadMemory(f);
                          e.target.value = "";
                        }}
                      />
                    </>
                  }
                >
                  Rasm va videolar
                </GroupTitle>

                <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
                    Havola orqali qo‘shish
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-[1.6fr_1fr_auto]">
                    <Input
                      value={memoryUrl}
                      onChange={(e) => setMemoryUrl(e.target.value)}
                      placeholder="YouTube / Vimeo / .mp4 yoki rasm URL"
                    />
                    <Input
                      value={memoryTitle}
                      onChange={(e) => setMemoryTitle(e.target.value)}
                      placeholder="Sarlavha"
                    />
                    <button
                      onClick={() => addMemory(memoryUrl, memoryTitle)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-gold px-4 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-[#ecd39c]"
                    >
                      <Plus className="size-3.5" /> Qo‘shish
                    </button>
                  </div>
                  <p className="mt-2.5 text-[10px] leading-relaxed text-ivory-dim/35">
                    YouTube havolasini qo‘ysangiz video avtomatik aniqlanadi. Rasm
                    yuklashda hajm 700 KB dan kichik bo‘lishi kerak (namuna rejimi
                    brauzer xotirasidan foydalanadi).
                  </p>
                </div>

                {uploadMsg && (
                  <p className="rounded-sm border border-red-400/30 bg-red-400/5 px-3 py-2 text-[11px] text-red-200/80">
                    {uploadMsg}
                  </p>
                )}

                <div className="space-y-3">
                  {draft.memories.map((m, i) => (
                    <div
                      key={m.id}
                      className="flex gap-3 rounded-sm border border-white/10 bg-white/[0.012] p-3"
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-ink-2">
                        <Image
                          src={m.type === "video" ? m.poster || draft.coverImage : m.src}
                          alt={m.title || "xotira"}
                          fill
                          unoptimized
                          sizes="80px"
                          className="object-cover"
                        />
                        {m.type === "video" && (
                          <span className="absolute inset-x-0 bottom-0 bg-black/65 py-0.5 text-center text-[7px] uppercase tracking-widest text-white/80">
                            video
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-ivory-dim/35">
                            {String(i + 1).padStart(2, "0")} · {m.type}
                          </span>
                          <div className="flex items-center gap-2">
                            {m.type === "photo" && (
                              <Select
                                value={m.ratio ?? "square"}
                                onChange={(e) =>
                                  patchMemory(m.id, {
                                    ratio: e.target.value as Memory["ratio"],
                                  })
                                }
                                className="w-auto px-2.5 py-1 text-[10px]"
                                aria-label="Rasm nisbati"
                              >
                                <option value="square">kvadrat</option>
                                <option value="portrait">vertikal</option>
                                <option value="wide">gorizontal</option>
                              </Select>
                            )}
                            <RemoveButton
                              label="O‘chirish"
                              onClick={() =>
                                setDraft((d) =>
                                  d
                                    ? {
                                        ...d,
                                        memories: d.memories.filter((x) => x.id !== m.id),
                                      }
                                    : d,
                                )
                              }
                            />
                          </div>
                        </div>
                        <Input
                          value={m.title ?? ""}
                          onChange={(e) => patchMemory(m.id, { title: e.target.value })}
                          placeholder="Sarlavha"
                        />
                        <Input
                          value={m.caption ?? ""}
                          onChange={(e) => patchMemory(m.id, { caption: e.target.value })}
                          placeholder="O‘sha kun haqida bir jumla…"
                        />
                      </div>
                    </div>
                  ))}
                  {!draft.memories.length && (
                    <p className="rounded-sm border border-dashed border-white/15 py-8 text-center text-[12px] text-ivory-dim/35">
                      Hali rasm yoki video yo‘q.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <GroupTitle
                  count={draft.timeline.length}
                  action={
                    <AddButton
                      onClick={() =>
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                timeline: [
                                  ...d.timeline,
                                  { id: uid("y"), year: "", title: "", text: "" },
                                ],
                              }
                            : d,
                        )
                      }
                    >
                      Yil qo‘shish
                    </AddButton>
                  }
                >
                  Yo‘l xaritasi
                </GroupTitle>

                <div className="space-y-3">
                  {draft.timeline.map((t, i) => (
                    <EditorCard key={t.id}>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.22em] text-ivory-dim/35">
                          {String(i + 1).padStart(2, "0")} · lahza
                        </span>
                        <RemoveButton
                          label="O‘chirish"
                          onClick={() =>
                            setDraft((d) =>
                              d
                                ? { ...d, timeline: d.timeline.filter((x) => x.id !== t.id) }
                                : d,
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-[90px_1fr]">
                        <Field label="Yil">
                          <Input
                            value={t.year}
                            onChange={(e) =>
                              setDraft((d) =>
                                d
                                  ? {
                                      ...d,
                                      timeline: d.timeline.map((x) =>
                                        x.id === t.id ? { ...x, year: e.target.value } : x,
                                      ),
                                    }
                                  : d,
                              )
                            }
                            placeholder="2026"
                          />
                        </Field>
                        <Field label="Voqea">
                          <Input
                            value={t.title}
                            onChange={(e) =>
                              setDraft((d) =>
                                d
                                  ? {
                                      ...d,
                                      timeline: d.timeline.map((x) =>
                                        x.id === t.id ? { ...x, title: e.target.value } : x,
                                      ),
                                    }
                                  : d,
                              )
                            }
                            placeholder="Oxirgi qo‘ng‘iroq"
                          />
                        </Field>
                      </div>
                      <Field label="Tafsilot" hint="ixtiyoriy">
                        <Input
                          value={t.text ?? ""}
                          onChange={(e) =>
                            setDraft((d) =>
                              d
                                ? {
                                    ...d,
                                    timeline: d.timeline.map((x) =>
                                      x.id === t.id ? { ...x, text: e.target.value } : x,
                                    ),
                                  }
                                : d,
                            )
                          }
                          placeholder="Oq ko‘ylaklar, gullar va yig‘lash…"
                        />
                      </Field>
                    </EditorCard>
                  ))}
                </div>

                <div className="h-px bg-white/10" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Yakun sarlavhasi">
                    <Input
                      value={draft.closing?.title ?? ""}
                      onChange={(e) =>
                        patch({
                          closing: { ...draft.closing, title: e.target.value },
                        })
                      }
                      placeholder="Bu sahifa tugamaydi"
                    />
                  </Field>
                  <Field label="Yakun matni">
                    <Input
                      value={draft.closing?.text ?? ""}
                      onChange={(e) =>
                        patch({
                          closing: { ...draft.closing, text: e.target.value },
                        })
                      }
                      placeholder="Rasmlar qo‘shiladi, hikoya davom etadi."
                    />
                  </Field>
                  <Field label="Telefon">
                    <Input
                      value={draft.contact?.phone ?? ""}
                      onChange={(e) =>
                        patch({ contact: { ...draft.contact, phone: e.target.value } })
                      }
                      placeholder="+998 90 123 45 67"
                    />
                  </Field>
                  <Field label="Telegram">
                    <Input
                      value={draft.contact?.telegram ?? ""}
                      onChange={(e) =>
                        patch({
                          contact: { ...draft.contact, telegram: e.target.value },
                        })
                      }
                      placeholder="@sinf_rahbari"
                    />
                  </Field>
                </div>

                <div className="my-2 h-px bg-white/10" />

                <div className="rounded-sm border border-gold/25 bg-gold/[0.04] p-5">
                  <h3 className="font-serif text-xl text-ivory">
                    Mijozga topshirishga tayyormi?
                  </h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ivory-dim/55">
                    “JSON yuklab olish” tugmasi kontentni fayl qilib beradi. Uni
                    <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5 text-[10px] text-gold/80">
                      content/vignettes/
                    </code>
                    papkasiga joylashtirsangiz, vinetka
                    <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5 text-[10px] text-gold/80">
                      /v/slug
                    </code>
                    manzilida doimiy ochiladi.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Field label="Slug (havola nomi)" hint="faqat a-z, 0-9, -">
                      <Input
                        value={draft.slug}
                        onChange={(e) =>
                          patch({
                            slug: e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, ""),
                          })
                        }
                        placeholder="11-a-2026"
                      />
                    </Field>
                    <div className="flex items-end gap-2">
                      <button
                        onClick={downloadJson}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-white/15 px-4 py-2.5 text-[11px] text-ivory transition-colors hover:border-gold/50 hover:text-gold"
                      >
                        <Download className="size-3.5" /> JSON yuklab olish
                      </button>
                      <Link
                        href="/v/preview"
                        target="_blank"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-gold px-4 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-[#ecd39c]"
                      >
                        Ko‘rish <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </div>
                  {(draft.coverImage.startsWith("data:") ||
                    draft.memories.some((m) => m.src.startsWith("data:"))) && (
                    <p className="mt-3 rounded-sm border border-gold/25 bg-gold/[0.05] px-3 py-2 text-[10px] leading-relaxed text-gold/80">
                      Diqqat: yuklangan rasmlar JSON ichida base64 ko‘rinishida
                      ketadi va faylni og‘irlashtiradi. Mijozga topshirishdan oldin
                      ularni `public/uploads/...` ga ko‘chirib, havola (URL) bilan
                      almashtiring.
                    </p>
                  )}
                  <p className="mt-3 text-[10px] leading-relaxed text-ivory-dim/35">
                    Eslatma: mehmonlar kitobi va yuklangan rasmlar hozircha brauzer
                    xotirasida saqlanadi. Serverga ulash uchun README’dagi
                    “Keyingi qadamlar” bo‘limiga qarang.
                  </p>
                </div>

                <div className="rounded-sm border border-red-400/20 bg-red-400/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-red-300/70">
                    Xavfli zona
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-ivory-dim/45">
                    Barcha kiritilgan ma’lumotlar shu brauzerdan o‘chiriladi.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("Barcha ma’lumot o‘chirilsinmi?")) {
                        setDraft(emptyDraft());
                      }
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-[10.5px] text-red-300/70 hover:text-red-300"
                  >
                    <Trash2 className="size-3" /> Hammasini o‘chirish
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <p className="mt-4 rounded-sm border border-red-400/30 bg-red-400/5 px-3 py-2 text-[11px] text-red-200/80">
                {errorMsg}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[11.5px] text-ivory-dim/70 transition-colors hover:text-ivory disabled:opacity-30"
              >
                <ArrowLeft className="size-3.5" /> Orqaga
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-[11.5px] font-semibold text-ink transition-colors hover:bg-[#ecd39c]"
                >
                  Keyingi qadam <ArrowRight className="size-3.5" />
                </button>
              ) : (
                <Link
                  href="/v/preview"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-[11.5px] font-semibold text-ink transition-colors hover:bg-[#ecd39c]"
                >
                  Vinetkani ko‘rish <ExternalLink className="size-3.5" />
                </Link>
              )}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-[86px]">
              <PreviewCard draft={draft} />
              <p className="mt-4 text-center text-[10px] leading-relaxed text-ivory-dim/30">
                Vinetka avtomatik saqlanadi. Havolani yopib, keyin davom ettirishingiz
                mumkin.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function PhotoPicker({
  photo,
  name,
  onFile,
  onClear,
}: {
  photo?: string;
  name: string;
  onFile: (file: File) => void;
  onClear: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-sm border border-dashed border-white/20 text-ivory-dim/50 transition-colors hover:border-gold/60 hover:text-gold"
        aria-label={photo ? "Rasmni almashtirish" : "Rasm yuklash"}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name || "Rasm"} className="absolute inset-0 size-full object-cover" />
        ) : (
          <ImagePlus className="size-4" />
        )}
      </button>
      <div className="text-[11px] leading-relaxed text-ivory-dim/50">
        {photo ? (
          <button type="button" onClick={onClear} className="text-ivory-dim/60 underline-offset-2 hover:text-red-300 hover:underline">
            Rasmni olib tashlash
          </button>
        ) : (
          <span>Portret rasmi (ixtiyoriy) — vinetkada polaroid bo‘lib chiqadi</span>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
