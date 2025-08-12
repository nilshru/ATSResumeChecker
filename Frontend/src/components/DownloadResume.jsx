import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import htmlDocx from "html-docx-js/dist/html-docx";

function DownloadResume({ resumeRef }) {
  const downloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  const downloadDOCX = () => {
    const element = resumeRef.current;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            ${getAllStyles()}
          </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>
    `;
    const blob = htmlDocx.asBlob(htmlContent);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.docx";
    link.click();
  };

  const getAllStyles = () => {
    let css = "";
    for (let sheet of document.styleSheets) {
      try {
        if (sheet.cssRules) {
          for (let rule of sheet.cssRules) {
            css += rule.cssText + "\n";
          }
        }
      } catch (e) {
        console.warn("Can't access stylesheet", e);
      }
    }
    return css;
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={downloadPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
      <button
        onClick={downloadDOCX}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Download DOCX
      </button>
    </div>
  );
}

export default DownloadResume;
