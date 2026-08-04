/**
 * ==========================================================
 * Glowva ERP
 * ERP_Database.js
 * Database Layer
 * ==========================================================
 */

const DB = {

  ss() {
    return SpreadsheetApp.getActiveSpreadsheet();
  },

  sheet(name) {

    const sheet = this.ss().getSheetByName(name);

    if (!sheet)
      throw new Error(`Sheet "${name}" غير موجود.`);

    return sheet;

  },

  rows(sheetName, startRow = 2) {

    const sheet = this.sheet(sheetName);

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

  append(sheetName, row) {

    this.sheet(sheetName)
      .appendRow(row);

  },

  write(sheetName, row, col, values) {

    this.sheet(sheetName)
      .getRange(
        row,
        col,
        values.length,
        values[0].length
      )
      .setValues(values);

  },

  clear(sheetName, startRow = 2) {

    const sheet = this.sheet(sheetName);

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