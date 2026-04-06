export const ASSET_CONSTANTS = {
  MAX_FILE_SIZE_IMAGE: 5 * 1024 * 1024, // 5MB
  MAX_FILE_SIZE_AUDIO: 15 * 1024 * 1024, // 15MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_AUDIO_TYPES: ["audio/mpeg", "audio/wav"],
};

export function validateImage(file: File) {
  if (!ASSET_CONSTANTS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: "Format gambar tidak didukung (gunakan JPG, PNG, GIF, atau WEBP)." };
  }
  if (file.size > ASSET_CONSTANTS.MAX_FILE_SIZE_IMAGE) {
    return { valid: false, error: "Ukuran gambar maksimal 5MB." };
  }
  return { valid: true };
}

export function validateAudio(file: File) {
  if (!ASSET_CONSTANTS.ALLOWED_AUDIO_TYPES.includes(file.type)) {
    return { valid: false, error: "Format audio tidak didukung (gunakan MP3 atau WAV)." };
  }
  if (file.size > ASSET_CONSTANTS.MAX_FILE_SIZE_AUDIO) {
    return { valid: false, error: "Ukuran audio maksimal 15MB." };
  }
  return { valid: true };
}
