// const crypto = require('crypto');

// // Generate a public-private key pair
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicKeyEncoding: {
//     type: 'pkcs1',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs1',
//     format: 'pem'
//   }
// });
// console.log("Public Key: ", publicKey);
// // console.log("SPLITED: ",publicKey.split('\n').slice(1, -2).join('\n'))
// console.log("Private Key: ", privateKey);

// // Encryption
// const data = "secret message";
// const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(data));
// console.log("Encrypted message: ", encrypted.toString('hex'));

// // Decryption
// const decrypted = crypto.privateDecrypt(privateKey, encrypted);
// console.log("Decrypted message: ", decrypted.toString());


/////#AES
// const crypto = require("crypto");

// const algorithm = "aes-256-ctr";
// const password = "mysecretkey";

// const crypto = require('crypto');

// const generateKey = (length) => {
//   return crypto.randomBytes(length).toString('hex');
// };
// const key = generateKey(32); // 32 bytes = 256 bits, a common key size for AES encryption

// // Encrypt the data
// function encrypt(data) {
//   const cipher = crypto.createCipher(algorithm, password);
//   let encrypted = cipher.update(data, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   return encrypted;
// }

// // Decrypt the data
// function decrypt(encryptedData) {
//   const decipher = crypto.createDecipher(algorithm, password);
//   let decrypted = decipher.update(encryptedData, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return decrypted;
// }

// const data = "Hello, world!";
// const encrypted = encrypt(data);
// console.log("Encrypted:", encrypted);
// const decrypted = decrypt(encrypted);
// console.log("Decrypted:", decrypted);