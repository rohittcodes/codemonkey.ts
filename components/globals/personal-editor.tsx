/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import styles from "./editor.module.css";

export interface PersonalEditorProps {
  initialValue?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
}

const PersonalEditor = ({
  initialValue = "",
  language = "typescript",
  onCodeChange,
}: PersonalEditorProps) => {
  const [code, setCode] = useState(initialValue);
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
  };

  return (
    <div className={styles.editorContainer}>
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={initialValue}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          wrappingIndent: "indent",
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export { PersonalEditor };
export default PersonalEditor;
