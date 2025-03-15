import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="mt-20 pt-10 px-4 md:px-6 bg-background border-t">
      <div className="mx-auto max-w-6xl text-center md:text-center">
        <div className="flex flex-col justify-center items-center md:items-center">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <p className="flex items-center gap-4 rounded-lg text-2xl font-bold justify-center">
                <span className="w-9 h-9 bg-gradient-to-tr from-accent via-primary/70 to-primary rounded-lg border border-secondary flex items-center justify-center text-primary-foreground">
                  CM
                </span>
                CodeMonkey
              </p>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Learn coding with AI assistance.
            </p>
          </div>
        </div>
        <h1 className="font-eb-garamond text-center text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900">
          code.
        </h1>
      </div>
    </footer>
  );
}
