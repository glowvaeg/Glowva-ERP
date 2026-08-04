/**
 * ==========================================================
 * Glowva ERP
 * Inventory Service
 * ==========================================================
 */

const InventoryService = {

  increase(productId, qty) {

    this.update(productId, qty);

  },

  decrease(productId, qty) {

    this.update(productId, -qty);

  },

  update(productId, change) {

    const sheet = DB.sheet(ERP.SHEETS.PRODUCTS);

    const rows = DB.rows(ERP.SHEETS.PRODUCTS);

    for (let i = 0; i < rows.length; i++) {

      if (String(rows[i][0]) === String(productId)) {

        const current = Number(rows[i][9]) || 0;

        const balance = current + Number(change);

        sheet.getRange(i + 2, 10).setValue(balance);

        return balance;

      }

    }

    throw new Error("المنتج غير موجود");

  },

  quantity(productId) {

    const rows = DB.rows(ERP.SHEETS.PRODUCTS);

    for (const row of rows) {

      if (String(row[0]) === String(productId))

        return Number(row[9]) || 0;

    }

    return 0;

  }

};