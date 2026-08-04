/**
 * ==========================================================
 * Glowva ERP
 * Barcode Service
 * ==========================================================
 */

const BarcodeService = {

  find(barcode) {

    const rows = DB.rows(ERP.SHEETS.PRODUCTS);

    for (const row of rows) {

      if (String(row[2]).trim() === String(barcode).trim()) {

        return {
          row: row,
          rowNumber: rows.indexOf(row) + 2
        };

      }

    }

    return null;

  },

  exists(barcode) {

    return this.find(barcode) !== null;

  }

};