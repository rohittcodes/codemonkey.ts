"use client";

import { useCallback, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRoom } from "@liveblocks/react/suspense";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import styles from "./editor.module.css";

export interface CollaborativeEditorProps {
  initialValue?: string;
  language?: string;
}

const CollaborativeEditor = ({
  initialValue = "",
  language = "typescript",
}: CollaborativeEditorProps) => {
  const room = useRoom();
  const [editorRef, setEditorRef] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!editorRef) return;

    const provider = getYjsProviderForRoom(room);
    const yDoc = provider.getYDoc();
    const yText = yDoc.getText("monaco");

    if (initialValue && yText.toString() === "" && !initialized) {
      yText.insert(0, initialValue);
      setInitialized(true);
    }

    const binding = new MonacoBinding(
      yText,
      editorRef.getModel() as editor.ITextModel,
      new Set([editorRef]),
      provider.awareness as unknown as Awareness,
    );

    return () => {
      binding.destroy();
      provider.disconnect();
    };
  }, [editorRef, initialValue, initialized, room]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  return (
    <div className={styles.editorContainer}>
      <Editor
        onMount={handleOnMount}
        height="100%"
        width="100%"
        defaultLanguage={language}
        defaultValue=""
        options={{
          tabSize: 2,
          padding: { top: 20 },
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export { CollaborativeEditor };
export default CollaborativeEditor;
