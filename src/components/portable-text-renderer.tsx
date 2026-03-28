import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-secondary mt-10 mb-4 font-normal">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl text-secondary mt-8 mb-3 font-normal">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-charcoal/50 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-6 italic text-charcoal/50 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-secondary">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary underline underline-offset-2 hover:text-secondary transition-colors"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    imageWithAlt: ({ value }) => {
      if (!value?.image?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value.image).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={500}
            className="w-full h-auto"
          />
          {value.alt && (
            <figcaption className="text-center text-sm text-charcoal/30 mt-3">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PortableTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
