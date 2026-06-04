'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const REPORT_TYPES = [
  { value: 'assets', label: '📦 Assets Report' },
  { value: 'staff', label: '👥 Staff Report' },
  { value: 'inspections', label: '🔍 Inspections Report' },
  { value: 'assignments', label: '📋 Assignment History' },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function downloadReport(type: string, format: 'pdf' | 'excel') {
    setLoading(`${type}-${format}`);
    try {
      const res = await fetch(`/api/reports?type=${type}`);
      const { data } = await res.json();

      if (format === 'excel') {
        const XLSX = await import('xlsx');
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, type);
        XLSX.writeFile(wb, `${type}-report-${Date.now()}.xlsx`);
        toast.success('Excel report downloaded!');
      } else {
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Virtual Staffing Solution', 14, 20);
        doc.setFontSize(12);
        doc.text(`${type.toUpperCase()} REPORT`, 14, 30);
        doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 38);

        if (data.length > 0) {
          const headers = Object.keys(data[0]).slice(0, 8);
          const rows = data.map((row: Record<string, unknown>) =>
            headers.map(h => String(row[h] ?? '—').slice(0, 30))
          );
          autoTable(doc, {
            head: [headers],
            body: rows,
            startY: 48,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [99, 102, 241] },
          });
        }

        doc.save(`${type}-report-${Date.now()}.pdf`);
        toast.success('PDF report downloaded!');
      }
    } catch {
      toast.error('Report generation failed');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Export system data in PDF or Excel format
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORT_TYPES.map(({ value, label }) => (
          <div key={value}
               className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border
                          border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {label}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => downloadReport(value, 'pdf')}
                disabled={!!loading}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-400 disabled:bg-red-300
                           text-white text-sm font-medium rounded-xl transition-all"
              >
                {loading === `${value}-pdf` ? 'Generating...' : '📄 Download PDF'}
              </button>
              <button
                onClick={() => downloadReport(value, 'excel')}
                disabled={!!loading}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-500
                           disabled:bg-green-300 text-white text-sm font-medium
                           rounded-xl transition-all"
              >
                {loading === `${value}-excel` ? 'Generating...' : '📊 Download Excel'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const REPORT_TYPES = [
  { value: 'assets', label: '📦 Assets Report' },
  { value: 'staff', label: '👥 Staff Report' },
  { value: 'inspections', label: '🔍 Inspections Report' },
  { value: 'assignments', label: '📋 Assignment History' },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function downloadReport(type: string, format: 'pdf' | 'excel') {
    setLoading(`${type}-${format}`);
    try {
      const res = await fetch(`/api/reports?type=${type}`);
      const { data } = await res.json();

      if (format === 'excel') {
        const XLSX = await import('xlsx');
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, type);
        XLSX.writeFile(wb, `${type}-report-${Date.now()}.xlsx`);
        toast.success('Excel report downloaded!');
      } else {
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Virtual Staffing Solution', 14, 20);
        doc.setFontSize(12);
        doc.text(`${type.toUpperCase()} REPORT`, 14, 30);
        doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 38);

        if (data.length > 0) {
          const headers = Object.keys(data[0]).slice(0, 8);
          const rows = data.map((row: Record<string, unknown>) =>
            headers.map(h => String(row[h] ?? '—').slice(0, 30))
          );
          autoTable(doc, {
            head: [headers],
            body: rows,
            startY: 48,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [99, 102, 241] },
          });
        }

        doc.save(`${type}-report-${Date.now()}.pdf`);
        toast.success('PDF report downloaded!');
      }
    } catch {
      toast.error('Report generation failed');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Export system data in PDF or Excel format
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORT_TYPES.map(({ value, label }) => (
          <div key={value}
               className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border
                          border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {label}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => downloadReport(value, 'pdf')}
                disabled={!!loading}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-400 disabled:bg-red-300
                           text-white text-sm font-medium rounded-xl transition-all"
              >
                {loading === `${value}-pdf` ? 'Generating...' : '📄 Download PDF'}
              </button>
              <button
                onClick={() => downloadReport(value, 'excel')}
                disabled={!!loading}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-500
                           disabled:bg-green-300 text-white text-sm font-medium
                           rounded-xl transition-all"
              >
                {loading === `${value}-excel` ? 'Generating...' : '📊 Download Excel'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
