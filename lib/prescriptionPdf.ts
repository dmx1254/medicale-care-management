import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Prescription } from "./utils";

export const handleDownload = (prescription: Prescription) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Constants
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // Logo and Header Section
  const hospitalName = "Hôpital Général de Santé";
  const hospitalAddress = "123 Avenue de la Santé, Dakar, Sénégal";
  const hospitalContact =
    "Tél: +221 33 123 45 67 | Email: contact@hopital-sante.sn";
  const logoUrl = "/assets/icons/logo-i.png"; // Replace with the actual logo path

  // Logo
  doc.addImage(logoUrl, "PNG", margin, 10, 30, 30); // Adjust the size if needed

  // Hospital Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(hospitalName, margin + 40, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(hospitalAddress, margin + 40, 25);
  doc.text(hospitalContact, margin + 40, 30);

  // Divider
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, 40, pageWidth - margin, 40);

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ORDONNANCE MÉDICALE", pageWidth / 2, 50, { align: "center" });

  // Patient Information
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const patientInfoY = 60;
  doc.text(`Patient: ${prescription.patient.name}`, margin, patientInfoY);
  doc.text(`Âge: ${prescription.patient.age} ans`, margin, patientInfoY + 7);
  doc.text(
    `Date: ${new Date(prescription.createdAt).toLocaleDateString()}`,
    pageWidth - margin - 50,
    patientInfoY
  );

  // Prescription Table
  const tableHeaders = [
    "Médicament",
    "Dosage",
    "Fréquence",
    "Durée",
    "Instructions",
  ];
  const medicationsData = prescription.medications.map((med) => [
    med.name,
    med.dosage,
    med.frequency,
    med.duration,
    med.instructions,
  ]);

  autoTable(doc, {
    startY: patientInfoY + 20,
    head: [tableHeaders],
    body: medicationsData,
    theme: "striped",
    headStyles: {
      fillColor: [34, 197, 94], // Vert (code hex: #16a34a)
      textColor: 255,
      fontSize: 10,
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 40 }, // Médicament
      4: { cellWidth: "auto" }, // Instructions
    },
  });

  // Footer Section
   //@ts-ignores
  const footerY = doc.lastAutoTable.finalY + 10;
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.text(
    "Ce document est strictement confidentiel et réservé à l'usage médical.",
    pageWidth / 2,
    footerY + 10,
    { align: "center" }
  );

  // Save the PDF
  doc.save(
    `Ordonnance_${prescription.patient.name}_${
      new Date(prescription.createdAt).toISOString().split("T")[0]
    }.pdf`
  );
};
