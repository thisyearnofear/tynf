import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectPage from "./ProjectPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) return {};

  const title = `${project.title} — thisyearnofear`;
  const description = project.tagline;
  const image = `/projects/hero/${project.id}.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: project.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return <ProjectPage project={project} />;
}
