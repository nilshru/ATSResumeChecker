export function cleanExtractedText(rawText) {
  return rawText
    // Multiple spaces → single space
    .replace(/\s{2,}/g, " ")
    // Remove space before punctuation
    .replace(/\s+([,.!?;:])/g, "$1")
    // Fix broken words split by line breaks (e.g., "appli\ncation" → "application")
    .replace(/(\w)-\n(\w)/g, "$1$2")
    // Fix unintended space inside all-caps words (e.g., "P ROJECT" → "PROJECT")
    .replace(/\b([A-Z])\s+([A-Z])\b/g, "$1$2")
    // Fix unintended space in CGPA-like patterns (e.g., "CGP A" → "CGPA")
    .replace(/\bCGP\s+A\b/g, "CGPA")
    // Remove extra line breaks but keep paragraph separation
    .replace(/\n{3,}/g, "\n\n")
    // Replace single line breaks inside sentences with space
    .replace(/([^\n])\n([^\n])/g, "$1 $2")
    // Trim starting/ending spaces
    .trim();
}
