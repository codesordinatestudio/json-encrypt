import { describe, expect, it } from "bun:test";
import { decryptJSON, encryptJSON } from "../mod";

const smallData = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "hiking"],
};

const encryptedSmallData =
  "eyJuYW1lIjoiQWxpY2UiLCJhZ2UiOjMwLCJob2JiaWVzIjpbInJlYWRc4ewg9rcopbmciLCJoaWtpbmciXX0=0900055";

describe("JSON Encrypt/Decrypt", () => {
  it("should store snapshot", () => {
    const encryptLogic = encryptJSON?.toString();
    const decryptLogic = decryptJSON?.toString();
    const snapshot = { encryptLogic, decryptLogic, smallData, encryptedSmallData };
    expect(snapshot).toMatchSnapshot();
  });

  it("should encrypt and decrypt small data correctly", () => {
    const smallEncrypted = encryptJSON(smallData);
    const decrypted = decryptJSON<typeof smallData>(smallEncrypted);
    console.log("Encrypted:", smallEncrypted);
    console.log("Decrypted:", decrypted);
    expect(decrypted).toEqual(smallData);
  });

  it("should decrypt the provided encrypted string correctly", () => {
    const decrypted = decryptJSON<typeof smallData>(encryptedSmallData);
    console.log("Decrypted from provided string:", decrypted);
    expect(decrypted).toEqual(smallData);
  });

  it("should throw an error for invalid encrypted string", () => {
    const invalidEncrypted = "invalid_string";
    expect(() => decryptJSON(invalidEncrypted)).toThrowError("Decryption failed: Invalid character");
  });
});
