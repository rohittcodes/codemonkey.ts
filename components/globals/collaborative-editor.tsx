"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { editor, IDisposable } from "monaco-editor";
import { useRoom } from "@liveblocks/react/suspense";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import styles from "./editor.module.css";

export interface CollaborativeEditorProps {
  initialValue?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
}

const CollaborativeEditor = ({
  initialValue = "",
  language = "typescript",
  onCodeChange,
}: CollaborativeEditorProps) => {
  const room = useRoom();
  const [editorRef, setEditorRef] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [binding, setBinding] = useState<MonacoBinding | null>(null);
  const [provider, setProvider] = useState<ReturnType<
    typeof getYjsProviderForRoom
  > | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!editorRef) return;

    if (initializedRef.current) return;
    initializedRef.current = true;

    const newProvider = getYjsProviderForRoom(room);
    setProvider(newProvider);

    const yDoc = newProvider.getYDoc();
    const yText = yDoc.getText("monaco");

    if (initialValue && yText.toString() === "") {
      yDoc.transact(() => {
        yText.delete(0, yText.length);
        yText.insert(0, initialValue);
      });
    }

    const newBinding = new MonacoBinding(
      yText,
      editorRef.getModel() as editor.ITextModel,
      new Set([editorRef]),
      newProvider.awareness as unknown as Awareness,
    );

    setBinding(newBinding);

    let disposable: IDisposable | null = null;
    if (onCodeChange) {
      disposable = editorRef.onDidChangeModelContent(() => {
        if (initializedRef.current) {
          onCodeChange(editorRef.getValue());
        }
      });
    }

    return () => {
      disposable?.dispose();
    };
  }, [editorRef, initialValue, room, onCodeChange]);

  useEffect(() => {
    return () => {
      if (binding) {
        binding.destroy();
      }
      if (provider) {
        provider.disconnect();
      }
      initializedRef.current = false;
    };
  }, [binding, provider]);

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
          wordWrap: "on",
        }}
        theme="vs-dark"
      />
    </div>
  );
};

export { CollaborativeEditor };
export default CollaborativeEditor;
