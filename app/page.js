"use client";

// import { headers } from "next/headers";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Chat Assistant</h1>
        <p className={styles.subtitle}>Powered by Cohere AI</p>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.responseArea}>
          {response ? (
            <div className={styles.responseContent}>
              <div className={styles.responseLabel}>AI Response:</div>
              <div className={styles.responseText}>{response}</div>
            </div>
          ) : (
            <div className={styles.placeholder}>
              Your AI responses will appear here...
            </div>
          )}
        </div>

        <div className={styles.inputArea}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            className={styles.textarea}
            disabled={loading}
          />
          <button
            onClick={handleChat}
            disabled={loading || !message.trim()}
            className={`${styles.button} ${
              loading ? styles.buttonLoading : ""
            }`}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
