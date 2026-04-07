import { jsPDF } from "jspdf";
import type { Restaurant, MenuSection, MenuItem } from "@/data/mockData";

export function generateMenuPDF(restaurant: Restaurant) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // Header
  doc.setFillColor(249, 115, 22);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(restaurant.name, pageWidth / 2, 25, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Cardapio Digital - Powered by CardUp", pageWidth / 2, 33, { align: "center" });

  y = 50;

  // Sections
  restaurant.sections.forEach((section, sectionIndex) => {
    // Check if we need a new page
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    // Section header
    doc.setFillColor(249, 115, 22);
    doc.roundedRect(15, y - 5, pageWidth - 30, 10, 2, 2, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(section.name, 20, y + 2);
    
    y += 15;

    // Items
    section.items.forEach((item) => {
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }

      if (!item.available) {
        doc.setTextColor(180, 180, 180);
      } else {
        doc.setTextColor(30, 30, 30);
      }

      // Item name
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(item.name, 20, y);

      // Price
      doc.setTextColor(249, 115, 22);
      doc.setFontSize(11);
      doc.text(`R$ ${item.price.toFixed(2).replace(".", ",")}`, pageWidth - 20, y, { align: "right" });

      // Description
      if (item.description) {
        y += 5;
        doc.setTextColor(120, 120, 120);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        const descLines = doc.splitTextToSize(item.description, pageWidth - 40);
        doc.text(descLines, 20, y);
        y += descLines.length * 4;
      } else {
        y += 2;
      }

      // Separator line
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.3);
      doc.line(20, y, pageWidth - 20, y);
      y += 6;
    });

    y += 5;
  });

  // Footer
  doc.setFillColor(15, 15, 15);
  doc.rect(0, pageHeight - 15, pageWidth, 15, "F");
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text("Gerado por CardUp - cardup.com.br", pageWidth / 2, pageHeight - 6, { align: "center" });

  // Save
  doc.save(`${restaurant.slug}-cardapio.pdf`);
}
