/**
 * ============================================================
 * Glowva ERP
 * Lifetime Engine
 * ============================================================
 */

function updateLifetime() {

  const ui = SpreadsheetApp.getUi();

  try {
const reportSheet = getSheet("تقرير مبيعات اصناف");
const ss = SpreadsheetApp.getActiveSpreadsheet();

SpreadsheetApp.getUi().alert(
  "Spreadsheet: " + ss.getName() +
  "\n\nSheets:\n" +
  ss.getSheets().map(s => s.getName()).join("\n")
);

    if (!reportSheet)
      throw new Error("لم يتم العثور على تقرير الأصناف.");

    const monthData = readData(reportSheet, 5);
    ui.alert("Rows in report: " + monthData.length);

    if (monthData.length === 0) {
      ui.alert("لا توجد بيانات داخل تقرير الأصناف.");
      return;
    }

    const lifetimeSS = openSpreadsheet(CONFIG.LIFETIME_FILE_ID);

    const lifeSheet =
      lifetimeSS.getSheetByName(CONFIG.LIFETIME_SHEET);
      ui.alert(
  "Lifetime sheet: " +
  (lifeSheet ? lifeSheet.getName() : "NOT FOUND")
);

    if (!lifeSheet)
      throw new Error("لم يتم العثور على ملف Lifetime.");

    const lifeData = readData(lifeSheet, 2);

    const map = buildProductMap(
      lifeData,
      CONFIG.LIFE.PRODUCT
    );

    let updated = 0;
    let added = 0;

    const currentFile =
      SpreadsheetApp.getActiveSpreadsheet().getName();

    monthData.forEach(row => {

      const product =
        String(row[CONFIG.REPORT.PRODUCT - 1]).trim();

      if (!product) return;

      const qty =
        Number(row[CONFIG.REPORT.MONTH_QTY - 1]) || 0;

      const value =
        Number(row[CONFIG.REPORT.MONTH_VALUE - 1]) || 0;

      const orders =
        Number(row[CONFIG.REPORT.MONTH_ORDERS - 1]) || 0;

      if (map.hasOwnProperty(product)) {

        const i = map[product];

        lifeData[i][1] += qty;
        lifeData[i][2] += value;
        lifeData[i][3] += orders;
        lifeData[i][4] = currentFile;
        lifeData[i][5] = new Date();

        updated++;

      } else {

        lifeData.push([
          product,
          qty,
          value,
          orders,
          currentFile,
          new Date()
        ]);

        added++;

      }

    });

    if (lifeData.length > 0) {

      lifeSheet
        .getRange(
          2,
          1,
          lifeData.length,
          6
        )
        .setValues(lifeData);

    }

    addLog(
      currentFile,
      added,
      "SUCCESS"
    );

    ui.alert(
      "تم تحديث Lifetime بنجاح.\n\n" +
      "تم تحديث: " + updated + "\n" +
      "تمت إضافة: " + added
    );

  } catch (err) {

    addLog(
      SpreadsheetApp.getActiveSpreadsheet().getName(),
      0,
      err.message
    );

    ui.alert(err.message);

  }

}