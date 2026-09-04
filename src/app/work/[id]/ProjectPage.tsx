"use client";

import { useRouter } from "next/navigation";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import DetailOverlay from "@/components/DetailOverlay";
import type { Project } from "@/data/projects";

export default function ProjectPage({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <SmoothScrollProvider>
      <DetailOverlay
        project={project}
        onClose={() => router.push("/")}
        onSelect={(id: string) => router.push(`/work/${id}`)}
      />
    </SmoothScrollProvider>
  );
}
