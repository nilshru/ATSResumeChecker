// extractText.js
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import mammoth from "mammoth";
import { cleanExtractedText } from "./cleanText";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromFile(file) {
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    throw new Error("File size exceeds 2MB limit.");
  }

  const fileExt = file.name.split(".").pop().toLowerCase();

  let rawText = "";
  if (fileExt === "pdf") {
    rawText = await extractFromPDF(file); 
  } else if (fileExt === "docx") {
    rawText = await extractFromDOCX(file);
  } else {
    throw new Error("Only PDF or DOCX files are supported.");
  }

  const cleanedText = cleanExtractedText(rawText);
  //console.log("Cleaned Resume Text:", cleanedText); 
  return cleanedText;
}

async function extractFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let textContent = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textItems = await page.getTextContent();
    const pageText = textItems.items.map(item => item.str).join(" ");
    textContent += pageText + "\n";
  }

  return textContent.trim();
}

async function extractFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}
