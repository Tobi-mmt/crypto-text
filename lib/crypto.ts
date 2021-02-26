import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { AES, enc } from "crypto-js";

export const decrypt = (data: string, key: string): string => {
  if (key) {
    const wordArray = enc.Base64.parse(data);
    const encryptedData = wordArray.toString(enc.Utf8);
    const bytes = AES.decrypt(encryptedData, key);
    const compressedData = bytes.toString(enc.Utf8);
    const plainText = decompressFromUTF16(compressedData);
    return plainText || "";
  }
  return "";
};

export const encrypt = (data: string, key: string): string => {
  const compressedData = compressToUTF16(data);
  const encryptedData = AES.encrypt(compressedData, key).toString();
  const wordArray = enc.Utf8.parse(encryptedData);
  const urlSafeBase64String = enc.Base64.stringify(wordArray);
  return urlSafeBase64String;
};

export const stringToBase64 = (plainString: string): string => {
  const wordArray = enc.Utf8.parse(plainString);
  const urlSafeBase64String = enc.Base64.stringify(wordArray);
  return urlSafeBase64String;
};

export const base64ToString = (base64String: string): string => {
  const wordArray = enc.Base64.parse(base64String);
  const plainString = wordArray.toString(enc.Utf8);
  return plainString;
};
