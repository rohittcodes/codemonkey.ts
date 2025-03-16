"use client";

import { useState, useEffect } from "react";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";

import styles from "./editor.module.css";
import { CheckIcon, CopyIcon, UsersIcon } from "lucide-react";

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
  const [editorKey, setEditorKey] = useState(Date.now());

  const roomId = activeRoom
    ? `problem-${problemId}-${activeRoom}`
    : `personal-${userId}-${problemId}`;

  const shareableUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/app/problems/${problemId}?room=${activeRoom}`
      : "";

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    try {
      localStorage.setItem(`code-${problemId}-${userId}`, newCode);
    } catch (e) {
      console.error("Failed to save code to localStorage:", e);
    }
  };

  useEffect(() => {
    try {
      const savedCode = localStorage.getItem(`code-${problemId}-${userId}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(initialCode);
      }
    } catch (e) {
      console.error("Failed to load code from localStorage:", e);
      setCode(initialCode);
    }
  }, [problemId, userId, initialCode]);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      const room = roomName.trim();
      setActiveRoom(room);
      setIsCollaborative(true);

      localStorage.setItem(`code-${problemId}-${userId}`, code);

      setEditorKey(Date.now());

      router.push(`/app/problems/${problemId}?room=${room}`, { scroll: false });
    }
  };

  const handleLeaveRoom = () => {
    setActiveRoom("");
    setIsCollaborative(false);
    setEditorKey(Date.now());
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

        <div className="flex items-center gap-3">
          {isCollaborative && activeRoom ? (
            <div className="flex items-center gap-2 border rounded-md p-1.5 bg-accent-50">
              <div className="flex items-center gap-1.5">
                <UsersIcon className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  Room: {activeRoom}
                </span>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyShareableLink}
                      className="h-8 px-2 flex items-center gap-1"
                    >
                      {copied ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copied ? "Copied!" : "Copy room link"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                size="sm"
                variant="destructive"
                onClick={handleLeaveRoom}
                className="h-8"
              >
                Leave Room
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 border rounded-md p-1.5 bg-accent-50">
              <Input
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-48 h-8"
              />
              <Button
                size="sm"
                onClick={handleCreateRoom}
                disabled={!roomName.trim()}
                className="h-8"
              >
                <UsersIcon className="h-4 w-4 mr-1" />
                Join Collaborative Room
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.editorWrapper}>
        <Suspense fallback={<EditorLoading />}>
          {isCollaborative && activeRoom ? (
            <Room problemId={roomId} key={`room-${editorKey}`}>
              <CollaborativeEditorDynamic
                key={`collab-${editorKey}`}
                initialValue={code}
                language={language}
                onCodeChange={handleCodeChange}
              />
            </Room>
          ) : (
            <PersonalEditorDynamic
              key={`personal-${editorKey}`}
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
