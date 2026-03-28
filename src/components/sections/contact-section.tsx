import ContactForm from "@/components/contact-form";
import FadeIn from "@/components/fade-in";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactSectionBlock({ data }: { data: any }) {
  const bgColor = data.backgroundColor?.hex;
  const sujets = data.sujets || ["Commande sur mesure", "Mariage", "Événement", "Renseignement", "Autre"];

  return (
    <section className="py-24 md:py-32" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="mx-auto max-w-4xl px-6">
        {data.titre && (
          <FadeIn className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary font-normal">{data.titre}</h2>
            {data.texte && <p className="mt-4 text-charcoal/50 leading-relaxed">{data.texte}</p>}
          </FadeIn>
        )}
        <FadeIn delay={0.2}>
          <ContactForm sujets={sujets} />
        </FadeIn>
      </div>
    </section>
  );
}
