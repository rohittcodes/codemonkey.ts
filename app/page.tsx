import { BenefitsSection } from "@/components/landing/sections/benefits";
import { FeaturesSection } from "@/components/landing/sections/features";
import { HeroSection } from "@/components/landing/sections/hero";
import { TeamSection } from "@/components/landing/sections/team";
import { Navbar } from "@/components/landing/navbar";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { FooterSection } from "@/components/landing/sections/footer";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full px-5 md:px-0">
        <Suspense fallback={<HeroSection session={null} isLoading={true} />}>
          <HeroSection session={session} isLoading={false} />
        </Suspense>
        <BenefitsSection />
        <FeaturesSection />
        <TeamSection />
        <FooterSection />
      </div>
    </main>
  );
}
