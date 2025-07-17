export function getFontClass(text) {
  if (!text || text.length < 10) {
    return 'font-default'; // Fallback for very short texts
  }

  // Arabic-script languages (Arabic, Urdu, Pashto, Farsi, etc.)
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/; // Includes Arabic, Urdu, Pashto, Farsi
  if (arabicPattern.test(text)) {
    return 'font-upfa'; // Font for Arabic-script languages
  }

  // Latin-script languages (English, Spanish, etc.)
  const latinPattern = /^[A-Za-z]+$/; // Matches English and Latin-based languages
  if (latinPattern.test(text)) {
    return 'font-latin'; // Font for Latin-script languages
  }

  // Chinese, Japanese, Korean (CJK) languages
  const cjkPattern =
    /[\u4e00-\u9fff\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF]/; // Includes Chinese, Japanese, Korean
  if (cjkPattern.test(text)) {
    return 'font-chinese'; // Font for Chinese, Japanese, Korean languages
  }

  // Default font for everything else
  return 'font-default'; // Fallback font
}
