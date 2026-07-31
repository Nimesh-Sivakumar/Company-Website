"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>Something went wrong</h1>
        <p style={{ color: "#6b6259", marginBottom: "24px" }}>
          The site hit an unexpected error. Please reload the page.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: "#8a6a44",
            color: "#f6efe1",
            border: "none",
            padding: "12px 24px",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
