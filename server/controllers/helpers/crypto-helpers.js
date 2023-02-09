const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const IV_LENGTH = 16;

/**
 * Generates a Random String of characters of length 32, used in creating key for AES Encryption
 * @returns string of characters
 */
const generateKey = () => {
  return crypto.randomBytes(32).toString('hex');
};


/**
 * Encrypts the data using AES-256-CTR and returns the cipher
 * @param {string} data The data you want to encrypt
 * @param {string} key the key/password that you want to encrypt with. Data can only be decrypted with this key.
 * @returns {string} cipher string
 */
function encrypt(data,key) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decryptes the encrypted data using the provided key.
 * @param {string} encryptedData data in encrypted form.
 * @param {string} key key/password which is required for decrypting encrypted data.
 * @returns {string} plain text data
 */
function decrypt(encryptedData,key) {
  let textParts = encryptedData.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  generateKey,
  encrypt,
  decrypt
}

// console.log(Buffer.from(encrypt("2gkuKUjiUtov82pEvbn3_|_ef2TZb14OU80rHpPgEgs","517f952d8a4c2105b9053810f585a7d68b7abb228e78a30b327adda29aa486be")).toString('base64'))
