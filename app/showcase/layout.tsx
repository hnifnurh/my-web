import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Explore my creative projects and works",
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}