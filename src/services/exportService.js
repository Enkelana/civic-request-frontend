import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const statusLabels = { 0: 'Në Pritje', 1: 'Në Process', 2: 'Zgjidhur', 3: 'Refuzuar' };

// EKSPORT EXCEL
export const exportToExcel = (requests, filename = 'Kerkesa') => {
  const data = requests.map(r => ({
    'ID': r.id,
    'Titulli': r.title,
    'Përshkrimi': r.description,
    'Qytetari': r.citizen?.fullName || '',
    'Email': r.citizen?.email || '',
    'Telefon': r.citizen?.phone || '',
    'Kategoria': r.category?.name || '',
    'Statusi': statusLabels[r.status],
    'Data e Krijimit': new Date(r.createdAt).toLocaleDateString('sq-AL'),
    'Shënime Zyrtari': r.officerNotes || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // Gjerësia e kolonave
  worksheet['!cols'] = [
    { wch: 5 }, { wch: 30 }, { wch: 40 }, { wch: 20 },
    { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 },
    { wch: 20 }, { wch: 30 }
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kërkesat');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}_${new Date().toLocaleDateString('sq-AL')}.xlsx`);
};

// EKSPORT PDF
export const exportToPDF = (requests, filename = 'Kerkesa') => {
  const doc = new jsPDF('landscape');

  // Header
  doc.setFillColor(31, 78, 121);
  doc.rect(0, 0, 300, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CivicRequest - Lista e Kerkesave', 14, 16);

  // Data
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text(`Gjeneruar: ${new Date().toLocaleDateString('sq-AL')}`, 220, 16);

  // Tabela
  autoTable(doc, {
    startY: 30,
    head: [['ID', 'Titulli', 'Qytetari', 'Kategoria', 'Statusi', 'Data']],
    body: requests.map(r => [
      r.id,
      r.title,
      r.citizen?.fullName || '',
      r.category?.name || '',
      statusLabels[r.status],
      new Date(r.createdAt).toLocaleDateString('sq-AL'),
    ]),
    headStyles: { fillColor: [46, 117, 182], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [240, 244, 248] },
    styles: { fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 70 },
      2: { cellWidth: 50 },
      3: { cellWidth: 40 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 },
    }
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Faqe ${i} nga ${pageCount} | CivicRequest © 2026 - Agjencia e Inovacionit dhe Ekselences`,
      14, doc.internal.pageSize.height - 10
    );
  }

  doc.save(`${filename}_${new Date().toLocaleDateString('sq-AL')}.pdf`);
};