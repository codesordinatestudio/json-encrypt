# @codesordinate/json-encrypt

A lightweight, simple JSON encryption/decryption utility for browser and server communications.

[![JSR](https://jsr.io/badges/@codesordinate/json-encrypt)](https://jsr.io/@codesordinate/json-encrypt)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- 🔒 Simple and effective JSON obfuscation
- 🚀 Fast encryption and decryption with minimal overhead
- 💻 Works in both browser and server environments
- 📦 Zero dependencies
- 🌐 Fully compatible with TypeScript and JSR
- 🔄 Preserves your original data types during roundtrip

## Installation

### Using JSR (Recommended)

```bash
# With Bun via jsr
bunx jsr add @codesordinate/json-encrypt


# With npm via jsr
npx jsr add @codesordinate/json-encrypt
```

## How It Works

This utility uses a simple yet effective approach to protect JSON data in transit:

1. The JSON object is stringified and encoded with base64
2. A random key of variable length (8-12 characters) is generated
3. The key is inserted at a random position in the encoded string
4. Metadata (key length and insertion position) is appended to the string

To decrypt, the process is simply reversed using the metadata at the end of the string.

## Usage

```typescript
import { encryptJSON, decryptJSON } from "@codesordinate/json-encrypt";

// Your data
const userData = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "hiking"],
};

// Encrypt
const encrypted = encryptJSON(userData);
console.log("Encrypted:", encrypted);
// Example output: eyJuYW1lIjoiQWxpY2UiLCJhZ2UiOjMwLCJob2JiaWVzIjpbInJlYWRpb37naXquMeciLCJoaWtpbmciXX0=100025

// Decrypt (with type safety)
const decrypted = decryptJSON<typeof userData>(encrypted);
console.log("Decrypted:", decrypted);
// Output: { name: "Alice", age: 30, hobbies: ["reading", "hiking"] }
```

### TypeScript Support

The utility is fully typed with generics to preserve your type information:

```typescript
// Define an interface for your data
interface UserProfile {
  id: number;
  name: string;
  isAdmin: boolean;
}

// Use the interface with encryption/decryption
const profile: UserProfile = {
  id: 42,
  name: "Bob",
  isAdmin: false,
};

const encrypted = encryptJSON(profile);
const decrypted = decryptJSON<UserProfile>(encrypted); // Properly typed!

// TypeScript knows the correct type
console.log(decrypted.id); // 42
```

## Security Considerations

This utility is designed for simple data obfuscation to prevent casual inspection of data. It is **NOT** suitable for:

- Encrypting sensitive information like passwords or personal data
- Protection against determined attackers
- Cryptographically secure encryption

For sensitive data, please use established cryptographic libraries.

## Use Cases

- Obfuscating data sent to the client side
- Preventing casual inspection of configuration or state information
- Simple protection of data in transit for non-critical applications
- Keeping data format and structure private

## License

MIT Licensed. See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by [CodesOrdinate](https://github.com/codesordinate)
