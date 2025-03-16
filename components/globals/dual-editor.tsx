"use client";

import { useState, useEffect } from "react";
import { EditorModeToggle } from "./editor-mode-toggle";
import { Room } from "@/lib/providers/room";
import {
  CollaborativeEditorDynamic,
  PersonalEditorDynamic,
  EditorLoading,
} from "./dynamic-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import styles from "./editor.module.css";
import { CheckIcon, CopyIcon } from "lucide-react";

type Props = {
  problemId: string;
  userId: string;
  initialCode: string;
  language?: string;
};

export function DualEditor({
  problemId,
  userId,
  initialCode,
  language = "typescript",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomFromUrl = searchParams?.get("room") || "";

  const [isCollaborative, setIsCollaborative] = useState(!!roomFromUrl);
  const [roomName, setRoomName] = useState("");
  const [activeRoom, setActiveRoom] = useState(roomFromUrl);
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const roomId = activeRoom
    ? `problem-${problemId}-${activeRoom}`
    : `personal-${userId}-${problemId}`;

  const shareableUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/app/problems/${problemId}?room=${activeRoom}`
      : "";

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`code-${problemId}-${userId}`, newCode);
  };

  useEffect(() => {
    try {
      const savedCode = localStorage.getItem(`code-${problemId}-${userId}`);
      if (savedCode) {
        setCode(savedCode);
      }
    } catch (e) {
      console.error("Failed to load code from localStorage:", e);
    }
  }, [problemId, userId]);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      const room = roomName.trim();
      setActiveRoom(room);
      setIsCollaborative(true);

      router.push(`/app/problems/${problemId}?room=${room}`, { scroll: false });
    }
  };

  const handleLeaveRoom = () => {
    setActiveRoom("");
    setIsCollaborative(false);
    router.push(`/app/problems/${problemId}`, { scroll: false });
  };

  const copyShareableLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.dualEditorContainer}>
      <div className={styles.editorHeader}>
        <h2 className={styles.editorTitle}>Code Editor</h2>

        <div className="flex items-center gap-4">
          {isCollaborative && activeRoom ? (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">
                Room: {activeRoom}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent>
                    {copied ? "Copied!" : "Copy link"}
                  </TooltipContent>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyShareableLink}
                    className="flex items-center gap-1"
                  >
                    {copied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                    Share
                  </Button>
                </Tooltip>
              </TooltipProvider>

              <Button size="sm" variant="outline" onClick={handleLeaveRoom}>
                Leave Room
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-48"
              />
              <Button size="sm" onClick={handleCreateRoom}>
                Create/Join Room
              </Button>
            </div>
          )}

          <EditorModeToggle
            onModeChange={(collaborative) => {
              setIsCollaborative(collaborative);
              if (!collaborative) {
                setActiveRoom("");
                router.push(`/app/problems/${problemId}`, { scroll: false });
              }
            }}
            defaultCollaborative={isCollaborative}
          />
        </div>
      </div>

      <div className={styles.editorWrapper}>
        <Suspense fallback={<EditorLoading />}>
          {isCollaborative && activeRoom ? (
            <Room problemId={roomId}>
              <CollaborativeEditorDynamic
                initialValue={code}
                language={language}
              />
            </Room>
          ) : (
            <PersonalEditorDynamic
              initialValue={code}
              language={language}
              onCodeChange={handleCodeChange}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
