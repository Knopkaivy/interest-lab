export const exportCsv = (filename: string, headers: string[], rows: (string | number)[][]): void =>{
 const headerRow = headers.join(',');
 const dataRows = rows.map(row => row.join(','));
 const csv = [headerRow, ...dataRows].join('\n');

 const blob = new Blob([csv], {type: 'text/csv'});
 const url = URL.createObjectURL(blob);

 const a = document.createElement('a');
 a.href = url;
 a.download = `${filename}.csv`;
 a.click();

 URL.revokeObjectURL(url);
}