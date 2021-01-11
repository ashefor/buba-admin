import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }
  async generateExcel(header: any, data: any, name: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name);
     worksheet.columns = header;
    data.forEach((d:Object) => {
      worksheet.addRow(d);
      }
    );
    worksheet.getRow(1).font = { bold: true };
    worksheet.getColumn(1).width = 20
    worksheet.getColumn(2).width = 20
    worksheet.getColumn(3).width = 20
    worksheet.getColumn(4).width = 20
    worksheet.getColumn(5).width = 20
    worksheet.getColumn(6).width = 20
    worksheet.getColumn(7).width = 20
    worksheet.addRow([]);
 
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${name}.xlsx`);
    });
 
  }
}
