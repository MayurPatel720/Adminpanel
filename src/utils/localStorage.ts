import CryptoJS from "crypto-js";

export const getLocalStorage = (key: string) => {
  let encryptedValue;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    encryptedValue = localStorage.getItem(key);
  }
  if (encryptedValue) {
    try {
      const decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        process.env.LOCAL_STORAGE_ENCRYPTION_SECRET || "my-temp"
      ).toString(CryptoJS.enc.Utf8);

      return decryptedValue ? JSON.parse(decryptedValue) : null;
    } catch (error) {
      // console.error("Error decrypting localStorage value:", error);
      return null;
    }
  }

  return null;
};

export const setLocalStorage = (key: string, value: any) => {
  try {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      process.env.LOCAL_STORAGE_ENCRYPTION_SECRET || "my-temp"
    ).toString();
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    // console.error("Error encrypting and storing localStorage value:", error);
  }
};
