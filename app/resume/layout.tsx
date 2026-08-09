import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steven Adkins - Professional Resume | Trine",
  description: "Steven Adkins's professional resume covering product operations, UX/UI, AI-assisted product development, customer experience, B2B partnerships, and brand strategy.",
};

export default function ResumeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
