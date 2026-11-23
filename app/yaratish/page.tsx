import type { Metadata } from "next";
import { Editor } from "@/components/editor/Editor";

export const metadata: Metadata = {
  title: "Vinetka yaratish",
  description:
    "Sinfingiz uchun onlayn vinetka yarating: maktab, bitiruvchilar, ustozlar, rasm va videolar. Avtomatik saqlanadi.",
};

export default function CreatePage() {
  return <Editor />;
}
