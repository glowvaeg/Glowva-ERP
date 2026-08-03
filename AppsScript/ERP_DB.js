/**
 * ==========================================================
 * Glowva ERP
 * ERP_DB.js
 * Database Layer
 * ==========================================================
 */

const DB = {

  spreadsheet(id) {
    return SpreadsheetApp.openById(id);
  },

  sheet(fileId, sheetName) {
    return this.spreadsheet(fileId).getSheetByName(sheetName);
  },

  values(fileId, sheetName) {
    const sh = this.sheet(fileId, sheetName);

    if (!sh) {
      throw new Error(`Sheet "${sheetName}" not found.`);
    }

    return sh.getDataRange().getValues();
  },

  lastRow(fileId, sheetName) {
    return this.sheet(fileId, sheetName).getLastRow();
  },

  append(fileId, sheetName, row) {
    this.sheet(fileId, sheetName).appendRow(row);
  },

  write(fileId, sheetName, row, col, values) {
    this.sheet(fileId, sheetName)
      .getRange(row, col, values.length, values[0].length)
      .setValues(values);
  },

  clear(fileId, sheetName) {
    const sh = this.sheet(fileId, sheetName);

    if (sh.getLastRow() > 1) {
      sh.getRange(
        2,
        1,
        sh.getLastRow() - 1,
        sh.getLastColumn()
      ).clearContent();
    }
  }

};