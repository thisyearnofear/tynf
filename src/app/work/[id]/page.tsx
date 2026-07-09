import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { details } from "@/data/details";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import WebGLBackground from "@/components/WebGLBackground";
import Cursor from "@/components/Cursor";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === id);
  const next = projects[(index + 1) % projects.length];
  const detail = details[id];

  return (
    <SmoothScrollProvider>
      <WebGLBackground />
      <Cursor />
      <ProjectDetail project={project} detail={detail} next={next} />
    </SmoothScrollProvider>
  );
}
