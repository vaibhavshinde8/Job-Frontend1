"use client";

import * as Y from "yjs";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import socket from "./socket"; // Your socket.io client
import { useParams } from "react-router-dom";
const languages = {
  python: { id: 71, label: "Python", value: "python", defaultCode: 'print("Hello, Python!")' },
  c: { id: 50, label: "C", value: "c", defaultCode: '#include <stdio.h>\nint main() { printf("Hello, C!"); return 0; }' },
  cpp: { id: 54, label: "C++", value: "cpp", defaultCode: '#include <iostream>\nint main() { std::cout << "Hello, C++!"; return 0; }' },
  javascript: { id: 63, label: "JavaScript", value: "javascript", defaultCode: 'console.log("Hello, JavaScript!");' },
  java: { id: 62, label: "Java", value: "java", defaultCode: 'public class Main { public static void main(String[] args) { System.out.println("Hello, Java!"); } }' },
};

export function CollaborativeEditor() {
  const [editorRef, setEditorRef] = useState(null);
  const [selectedLang, setSelectedLang] = useState(languages.javascript);
  const [output, setOutput] = useState("// Output will appear here...");
  const room = useRoom();
  const yProvider = getYjsProviderForRoom(room);
  const yDocRef = useRef(null);

  // Setup Monaco Binding
  useEffect(() => {
    if (!editorRef || !yProvider) return;

    const yDoc = yProvider.getYDoc();
    yDocRef.current = yDoc;

    const yText = yDoc.getText("monaco");
    const binding = new MonacoBinding(
      yText,
      editorRef.getModel(),
      new Set([editorRef]),
      yProvider.awareness
    );

    return () => binding.destroy();
  }, [editorRef, yProvider]);
const {interviweID}=useParams();
const interviewId=interviweID;
  // Listen for output from socket
  useEffect(() => {
    socket.on("code-result", (data) => {
      setOutput(data.output);
    });
    return () => {
      socket.off("code-result");
    };
  }, []);

  const handleOnMount = useCallback((editor, monaco) => {
    setEditorRef(editor);
  }, []);

  const handleLanguageChange = (e) => {
    const langKey = e.target.value;
    const langConfig = languages[langKey];
    setSelectedLang(langConfig);

    if (editorRef) {
      const model = editorRef.getModel();
      monaco.editor.setModelLanguage(model, langConfig.value);
      editorRef.setValue(langConfig.defaultCode);
    }
  };

  const runCode = async () => {
    if (!editorRef) return;

    const code = editorRef.getValue();
    setOutput("⏳ Creating Submission...\n");

    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "b9c2291363msh5aad1d3e8ce6a1ap142b2fjsndf22f0cab1f6",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: selectedLang.id,
      }),
    });

    const { token } = await response.json();
    setOutput("⏳ Waiting for result...\n");

    const poll = async () => {
      const res = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`, {
        headers: {
          "X-RapidAPI-Key": "b9c2291363msh5aad1d3e8ce6a1ap142b2fjsndf22f0cab1f6",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      });

      const result = await res.json();

      if (["In Queue", "Processing"].includes(result.status.description)) {
        setTimeout(poll, 1000);
      } else {
        let finalOutput = "";

        if (result.stdout) {
          finalOutput = `✅ Output:\n${atob(result.stdout)}\n⏱ Time: ${result.time} secs\n📦 Memory: ${result.memory} bytes`;
        } else if (result.stderr) {
          finalOutput = `❌ Runtime Error:\n${atob(result.stderr)}`;
        } else if (result.compile_output) {
          finalOutput = `🚫 Compilation Error:\n${atob(result.compile_output)}`;
        } else {
          finalOutput = "⚠️ Unknown error occurred.";
        }

        setOutput(finalOutput);
        // Send the final output to all users via socket
        socket.emit("code-result", { output: finalOutput,interviewId });
        console.log('result sent')
      }
    };

    poll();
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#fff", padding: "20px", fontFamily: "monospace" }}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Select Language:</label>
        <select
          value={selectedLang.value}
          onChange={handleLanguageChange}
          style={{ padding: "5px", backgroundColor: "black", color: "white" }}
        >
          {Object.entries(languages).map(([key, lang]) => (
            <option key={key} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <Editor
        height="300px"
        theme="vs-dark"
        defaultLanguage={selectedLang.value}
        defaultValue={selectedLang.defaultCode}
        onMount={handleOnMount}
        options={{ fontSize: 14, tabSize: 2 }}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={runCode}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          ▶ Run Code
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>📤 Output</label>
        <textarea
          rows={10}
          cols={100}
          readOnly
          style={{
            backgroundColor: "#2d2d2d",
            color: "lime",
            padding: "10px",
            borderRadius: "6px",
            whiteSpace: "pre-wrap",
          }}
          value={output}
        />
      </div>
    </div>
  );
}
