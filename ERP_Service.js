/**
 * ==========================================================
 * Glowva ERP
 * ERP_Service.js
 * جميع عمليات التعامل مع Google Sheets
 * ==========================================================
 */

const ERPService = {

  openSpreadsheet(id) {
    return SpreadsheetApp.openById(id);
  },

  getSheet(ss, name) {
    const sheet = ss.getSheetByName(name);

    if (!sheet)
      throw new Error("Sheet not found: " + name);

    return sheet;
  },

  read(sheet, startRow = 2) {

    const lastRow = sheet.getLastRow();

    if (lastRow < startRow)
      return [];

    return sheet
      .getRange(
        startRow,
        1,
        lastRow - startRow + 1,
        sheet.getLastColumn()
      )
      .getValues();

  },

  write(sheet, startRow, data) {

    if (!data.length) return;

    sheet
      .getRange(
        startRow,
        1,
        data.length,
        data[0].length
      )
      .setValues(data);

  },

  clear(sheet, startRow = 2) {

    if (sheet.getLastRow() < startRow)
      return;

    sheet
      .getRange(
        startRow,
        1,
        sheet.getLastRow() - startRow + 1,
        sheet.getLastColumn()
      )
      .clearContent();

  }

};