export const revalidate = 60;
export const dynamicParams = true;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PAGE_BY_SLUG_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/queries";
import SectionRenderer from "@/components/section-renderer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(PAGE_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page: SA = await client.fetch(PAGE_BY_SLUG_QUERY, { slug });
  if (!page) return { title: "Page introuvable" };
  return {
    title: page.seo?.metaTitre || page.titre,
    description: page.seo?.metaDescription || null,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page: SA = await client.fetch(PAGE_BY_SLUG_QUERY, { slug });

  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
