import { auth } from "@/lib/auth";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId =
      session?.user?.id ||
      `anonymous-${Math.random().toString(36).substring(2, 9)}`;

    const searchParams = new URL(request.url).searchParams;
    const room = searchParams.get("room");

    if (!room) {
      console.log("No room ID provided, creating general session");
      const liveblocksSession = await liveblocks.prepareSession(userId, {
        userInfo: {
          name: session?.user?.name || "Anonymous",
          picture:
            session?.user?.image ||
            `https://api.dicebear.com/6.x/personas/svg?seed=${userId}`,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
      });

      liveblocksSession.allow("*", [
        "room:write",
        "room:read",
        "room:presence:write",
      ]);

      const { body, status } = await liveblocksSession.authorize();

      return new Response(body, {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Creating session for room:", room);
    const liveblocksSession = await liveblocks.prepareSession(userId, {
      userInfo: {
        name: session?.user?.name || "Anonymous",
        picture:
          session?.user?.image ||
          `https://api.dicebear.com/6.x/personas/svg?seed=${userId}`,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      },
    });

    liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

    liveblocksSession.allow("*", [
      "room:write",
      "room:read",
      "room:presence:write",
    ]);

    const { body, status } = await liveblocksSession.authorize();

    return new Response(body, {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error("Liveblocks error:", error);
    return new Response(
      JSON.stringify({
        error: "Authentication failed",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
