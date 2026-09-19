import dynamic from "next/dynamic";
import Head from "next/head";
import { Faqs } from "../components/Hero/computer/FAQText";

const Navbar = dynamic(() => import("../components/Navbar/Navbar"));
const Hero = dynamic(() => import("../components/Hero/Hero"));
const Footer = dynamic(() => import("../components/Footer/Footer"));

// Built from the page's own existing copy (FAQ.tsx / FAQText.ts), not new claims.
const SITE_URL = "https://tyoh-zeta.vercel.app/";
const SITE_TITLE = "The Yard of Horror";
const SITE_DESCRIPTION =
  "The Yard of Horror (TYOH) is an NFT project on the Cardano blockchain. There are 5000 unique NFTs ready to fall in the hands of investors.";
const SITE_IMAGE = SITE_URL + "tyohfav.png";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

// Copied verbatim from components/Hero/computer/FAQText.ts - not reworded.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const Home: React.FC = () => {
  return (
    <>
      <Head>
        {/* Overrides the shorter default in pages/_app.tsx with a longer, still page-derived description. */}
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
