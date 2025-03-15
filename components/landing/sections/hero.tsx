import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Session } from "next-auth";
import { GradualSpacing } from "@/components/ui/gradual-spacing";

interface HeroSectionProps {
  session: Session | null;
  isLoading?: boolean;
}

export const HeroSection = ({ session, isLoading }: HeroSectionProps) => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-xs px-3 py-1">
            <span className="mr-1 text-primary">
              <Badge className="text-[10px] px-2 py-0.5">Beta</Badge>
            </span>
            <span>Join our dev community!</span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <GradualSpacing text="Level Up Your Coding " />
            <GradualSpacing text="Journey with CodeMonkey" />
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Your all-in-one platform for collaborative coding, AI-powered learning, structured roadmaps, and interactive quizzes. Master programming with intelligent guidance.`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {isLoading ? (
              <Button disabled className="w-5/6 md:w-1/4 font-bold">
                Loading...
              </Button>
            ) : session ? (
              <Button asChild className="w-5/6 md:w-1/4 font-bold group/arrow">
                <Link href="/app">
                  Dashboard
                  <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-5/6 md:w-1/4 font-bold group/arrow">
                <Link href="/login">
                  Get Started
                  <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
