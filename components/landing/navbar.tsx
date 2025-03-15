"use client";
import { Github } from "lucide-react";
import Link from "next/link";
import { ToggleTheme } from "../theme/toggle-theme";
import { Button } from "../ui/button";

const navLinks = [
  { href: "#benefits", label: "Benefits" },
  { href: "#features", label: "Features" },
  { href: "#team", label: "Team" },
];

export const Navbar = () => {
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <span className="w-9 h-9 bg-gradient-to-tr from-accent via-primary/70 to-primary rounded-lg border border-secondary flex items-center justify-center text-primary-foreground">
          CM
        </span>
        <span className="ml-2">CodeMonkey</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <ToggleTheme />
        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            href="https://github.com/rohittcodes"
            target="_blank"
            aria-label="View on GitHub"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
