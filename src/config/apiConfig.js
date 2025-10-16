/**
 * API Configuration
 * 
 * Để bảo mật, bạn có 2 cách:
 * 1. Để user tự nhập API key qua UI (khuyến nghị)
 * 2. Hardcode key vào đây (CHỈ cho demo, KHÔNG nên production)
 */

// Option 1: Default key (có thể để trống để bắt user nhập)
export const DEFAULT_GEMINI_API_KEY = 'AIzaSyCkTDvFKxr18HDzUXqjSLCdB5F9sfPzaGI';

// Option 2: Bắt buộc user nhập key
export const REQUIRE_API_KEY = false; // Set true nếu muốn bắt buộc user nhập

/**
 * Lấy API key từ localStorage hoặc default
 */
export function getGeminiApiKey() {
  // Ưu tiên key từ localStorage (user đã nhập)
  const userKey = localStorage.getItem('gemini_api_key');
  if (userKey) {
    return userKey;
  }
  
  // Nếu không có và không bắt buộc, dùng default
  if (!REQUIRE_API_KEY && DEFAULT_GEMINI_API_KEY) {
    return DEFAULT_GEMINI_API_KEY;
  }
  
  return null;
}

/**
 * Lưu API key vào localStorage
 */
export function saveGeminiApiKey(key) {
  if (key) {
    localStorage.setItem('gemini_api_key', key);
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

