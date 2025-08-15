"use client";

// import { headers } from "next/headers";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState("");
  const [streamResponse, setStreamResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }), // Use the message state
      });

      const data = await res.json();

      if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        setResponse(data.content);
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message"
          rows={5}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>
      <div>
        <button
          onClick={handleChat}
          style={{ padding: "10px 20px", backgroundColor: "orange" }}
        >
          {loading ? "Loading..." : "chat"}
        </button>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          whiteSpace: "pre-wrap",
        }}
      >
        {response}
      </div>
    </div>
  );
}
