"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react";

type Props = {
  children: ReactNode;
  problemId: string;
};

export function Room({ children, problemId }: Props) {
  return (
    <RoomProvider
      id={problemId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
