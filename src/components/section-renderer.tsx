import HeroSectionBlock from "@/components/sections/hero-section-block";
import TextImageSection from "@/components/sections/text-image-section";
import GridSection from "@/components/sections/grid-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import GallerySection from "@/components/sections/gallery-section";
import CtaBannerSection from "@/components/sections/cta-banner";
import ContactSectionBlock from "@/components/sections/contact-section";
import FaqSection from "@/components/sections/faq-section";
import DividerSection from "@/components/sections/divider-section";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SA = any;

const sectionMap: Record<string, React.ComponentType<{ data: SA }>> = {
  heroSectionBlock: HeroSectionBlock,
  textImageSection: TextImageSection,
  gridSection: GridSection,
  testimonialsSection: TestimonialsSection,
  gallerySection: GallerySection,
  ctaBanner: CtaBannerSection,
  contactSection: ContactSectionBlock,
  faqSection: FaqSection,
  dividerSection: DividerSection,
};

export default function SectionRenderer({ sections }: { sections: SA[] | null }) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section: SA) => {
        const Component = sectionMap[section._type];
        if (!Component) return null;
        return <Component key={section._key} data={section} />;
      })}
    </>
  );
}
