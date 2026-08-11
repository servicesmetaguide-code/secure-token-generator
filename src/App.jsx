import { useState } from "react";
import "./App.css";

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

  return (
    <main className="app">
      <section className="token-generator">
        <h1>Secure Token Generator</h1>

        <p className="description">
          Generate a cryptographically secure random token.
        </p>

        <div className="length-section">
          <div className="length-header">
            <label htmlFor="token-length">Token Length</label>
            <span>{tokenLength}</span>
          </div>

          <input
            id="token-length"
            type="range"
            min="8"
            max="32"
            value={tokenLength}
            onChange={(event) =>
              setTokenLength(Number(event.target.value))
            }
          />
        </div>

        <button
          className="generate-button"
          onClick={generateToken}
        >
          Generate
        </button>

        {token && (
          <div className="token-section">
            <input
              type="text"
              value={token}
              readOnly
              aria-label="Generated token"
            />

            <button
              className="copy-button"
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