import React, { ReactElement, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { encrypt, stringToBase64 } from "../lib/crypto";

const IndexPage = (): ReactElement => {
  const [plainText, setPlainText] = useState<string>("");
  const [cypher, setCypher] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // encrypt on change
    setError("");
    if (plainText && key) {
      try {
        const plain = encrypt(plainText, key);
        if (!plain) throw new Error("Something went wrong while decrypting");
        setCypher(plain);
      } catch (e) {
        setError("Looks like your password is wrong");
      }
    } else {
      setError("You need to enter a password AND your message");
    }
  }, [key, plainText]);

  return (
    <Layout title="Crypto string">
      <h1>Crypto string - encrypt</h1>

      <h2>Password</h2>
      <input
        type="text"
        placeholder="Enter your password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <hr />
      <h2>Your secret Message</h2>
      <textarea
        placeholder="type your secret message"
        value={plainText}
        onChange={(e) => setPlainText(e.target.value)}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Public secrue link</h2>
          <p>
            It is save to post send this link via unsecured ways since all datas
            are securely encrypted.
          </p>
          <p>
            <a
              href={`localhost:3000/decrypt/${cypher}`}
              target="_blank"
              rel="noreferrer"
            >{`localhost:3000/decrypt/${cypher}`}</a>
          </p>
          <h2>Private link</h2>
          <p>
            This link contains the password. Do no post this in public places
          </p>
          <p>
            <a
              href={`localhost:3000/decrypt/${cypher}#${stringToBase64(key)}`}
              target="_blank"
              rel="noreferrer"
            >{`localhost:3000/decrypt/${cypher}#${stringToBase64(key)}`}</a>
          </p>
        </>
      )}
    </Layout>
  );
};

export default IndexPage;
