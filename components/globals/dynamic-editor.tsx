"use client";

import dynamic from "next/dynamic";

export interface EditorProps {
  initialValue?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
}

export const PersonalEditorDynamic = dynamic<EditorProps>(
  () => import("./personal-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <EditorLoading /> },
);

export const CollaborativeEditorDynamic = dynamic<EditorProps>(
  () => import("./collaborative-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <EditorLoading /> },
);

export function EditorLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-50 border rounded-md">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-sm text-gray-500">Loading editor...</p>
      </div>
    </div>
  );
}
