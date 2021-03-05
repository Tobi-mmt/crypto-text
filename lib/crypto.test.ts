import { encrypt, decrypt } from "./crypto";

const plainText = "Hello I am a super secret message";
const key = "superSavePassword";

describe("encryption", () => {
  it("should return cypher", () => {
    /*
     * Since the cypher does contain a salt it's not the same value on each encryption.
     * We have to check the result on another way.
     */
    const encryptedText = encrypt(plainText, key);
    expect(encryptedText).not.toContain(plainText);
    expect(encryptedText.length).toBeGreaterThan(plainText.length);
  });

  it("should contain a salt (not same output on same input text)", () => {
    const encryptedTextOne = encrypt(plainText, key);
    const encryptedTextTwo = encrypt(plainText, key);
    expect(encryptedTextOne).not.toBe(encryptedTextTwo);
  });
});

describe("decryption", () => {
  const cypher =
    "VTJGc2RHVmtYMStzZDhMR1JqV2RQZ1ZqMURSV01GR2pld3VhVURsYjc0TUxLUzM3U3UwM21mTEJENkd2a1lHTVlhcmJSL0xTUUplMHczWXR3a3h5SVdjbGs3ZU9SUU5YbTQxSTdNckxsR2s9";

  it("should return plain text", () => {
    const plainTextTestValue = decrypt(cypher, key);
    expect(plainTextTestValue).toBe(plainText);
  });

  it("should return empty string of no key present", () => {
    const plainTextTestValue = decrypt(cypher, "");
    expect(plainTextTestValue).toBe("");
  });

  it("should return empty string of no cypher present", () => {
    const plainTextTestValue = decrypt("", key);
    expect(plainTextTestValue).toBe("");
  });
});

describe("integration", () => {
  it("output of encrypting and decrypting should be the exact same string as input", () => {
    const cypher = encrypt(plainText, key);
    const plainTextTestValue = decrypt(cypher, key);
    expect(plainTextTestValue).toBe(plainText);
  });
});
