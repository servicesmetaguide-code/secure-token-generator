import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [tokenLength, setTokenLength] = useState(16);
  const [isCopied, setIsCopied] = useState(false);

  const generateToken = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz" +
      "0123456789" +
      "!@#$%^&*()";

    const randomValues = new Uint32Array(tokenLength);

    window.crypto.getRandomValues(randomValues);

    let newToken = "";

    for (let i = 0; i < tokenLength; i++) {
      newToken += characters[randomValues[i] % characters.length];
    }

    setToken(newToken);
    setIsCopied(false);
  };

  const copyToken = async () => {
    if (!token) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(token);

        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to copy token:", error);
    }
  };

  const styles = {
    app: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px",
      background:
        "radial-gradient(circle at top left, #1e3a8a 0%, transparent 35%), radial-gradient(circle at bottom right, #312e81 0%, transparent 35%), #0f172a",
      fontFamily: "Arial, sans-serif",
      color: "#f8fafc",
    },

    card: {
      width: "100%",
      maxWidth: "560px",
      padding: "40px",
      background: "#0f172a",
      border: "1px solid #475569",
      borderRadius: "20px",
      boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
    },

    heading: {
      margin: "0",
      textAlign: "center",
      fontSize: "32px",
      fontWeight: "700",
      color: "#ffffff",
      textShadow: "0 2px 12px rgba(59, 130, 246, 0.4)",
    },

    description: {
      margin: "12px 0 35px",
      textAlign: "center",
      color: "#cbd5e1",
      fontSize: "15px",
      lineHeight: "1.6",
    },

    lengthSection: {
      marginBottom: "28px",
    },

    lengthHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "14px",
      fontSize: "15px",
      color: "#e2e8f0",
    },

    lengthValue: {
      minWidth: "42px",
      padding: "5px 10px",
      textAlign: "center",
      background: "#1e293b",
      border: "1px solid #475569",
      borderRadius: "8px",
      color: "#60a5fa",
      fontWeight: "700",
    },

    slider: {
      width: "100%",
      cursor: "pointer",
      accentColor: "#3b82f6",
    },

    generateButton: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "10px",
      background: "#2563eb",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
    },

    tokenSection: {
      display: "flex",
      gap: "10px",
      marginTop: "24px",
      padding: "12px",
      background: "#020617",
      border: "1px solid #475569",
      borderRadius: "12px",
    },

    tokenInput: {
      flex: "1",
      minWidth: "0",
      padding: "12px",
      border: "none",
      outline: "none",
      background: "transparent",
      color: "#60a5fa",
      fontFamily: "Courier New, monospace",
      fontSize: "15px",
      letterSpacing: "1px",
    },

    copyButton: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      background: "#334155",
      color: "#ffffff",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <main style={styles.app}>
      <section style={styles.card}>
        <h1 style={styles.heading}>Secure Token Generator</h1>

        <p style={styles.description}>
          Generate a cryptographically secure random token.
        </p>

        <div style={styles.lengthSection}>
          <div style={styles.lengthHeader}>
            <label htmlFor="token-length">Token Length</label>

            <span style={styles.lengthValue}>
              {tokenLength}
            </span>
          </div>

          <input
            id="token-length"
            type="range"
            min="8"
            max="32"
            value={tokenLength}
            style={styles.slider}
            onChange={(event) =>
              setTokenLength(Number(event.target.value))
            }
          />
        </div>

        <button
          style={styles.generateButton}
          onClick={generateToken}
        >
          Generate
        </button>

        {token && (
          <div style={styles.tokenSection}>
            <input
              type="text"
              value={token}
              readOnly
              aria-label="Generated token"
              style={styles.tokenInput}
            />

            <button
              style={styles.copyButton}
              onClick={copyToken}
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
