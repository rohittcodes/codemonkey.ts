"use client";

import { LiveblocksProvider } from "@liveblocks/react";
import { PropsWithChildren } from "react";

export function LiveBlocksProvider({ children }: PropsWithChildren) {
  return (
    <LiveblocksProvider authEndpoint="/api/auth/liveblocks" throttle={16}>
      {children}
    </LiveblocksProvider>
  );
}
