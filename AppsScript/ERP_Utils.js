/**
 * ============================================================
 * Glowva ERP
 * Utility Functions
 * ============================================================
 */

/**
 * الحصول على الشيت الحالي بالاسم
 */
function getSheet(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

/**
 * فتح ملف جوجل شيت بواسطة ID
 */
function openSpreadsheet(id) {
  return SpreadsheetApp.openById(id);
}

/**
 * الحصول على شيت من ملف آخر
 */
function getExternalSheet(fileId, sheetName) {
  return openSpreadsheet(fileId).getSheetByName(sheetName);
}

/**
 * آخر صف يحتوي بيانات
 */
function lastRow(sheet) {
  return sheet.getLastRow();
}

/**
 * قراءة البيانات بدون صف العناوين
 */
function readData(sheet, startRow) {

  const lr = sheet.getLastRow();
  const lc = sheet.getLastColumn();

  SpreadsheetApp.getUi().alert(
    "Sheet: " + sheet.getName() +
    "\nLast Row: " + lr +
    "\nLast Column: " + lc +
    "\nStart Row: " + startRow
  );

  if (lr < startRow) {

    SpreadsheetApp.getUi().alert(
      "لا توجد صفوف للقراءة." +
      "\n\nSheet: " + sheet.getName() +
      "\nLast Row: " + lr +
      "\nStart Row: " + startRow
    );

    return [];
  }

  const data = sheet.getRange(
    startRow,
    1,
    lr - startRow + 1,
    lc
  ).getValues();

  SpreadsheetApp.getUi().alert(
    "Rows Read: " + data.length
  );

  return data;
}

/**
 * تحويل Array إلى Map حسب اسم الصنف
 */
function buildProductMap(data, productColumn) {

  const map = {};

  data.forEach((row, index) => {

    const name = String(row[productColumn - 1]).trim();

    if (name !== "") {
      map[name] = index;
    }

  });

  return map;
}

/**
 * كتابة Log
 */
function addLog(fileName, added, status) {

  const life = openSpreadsheet(CONFIG.LIFETIME_FILE_ID);

  let sheet = life.getSheetByName(CONFIG.LOGS_SHEET);

  if (!sheet) {

    sheet = life.insertSheet(CONFIG.LOGS_SHEET);

    sheet.appendRow([
      "التاريخ",
      "الملف",
      "عدد الأصناف",
      "الحالة"
    ]);

  }

  sheet.appendRow([
    new Date(),
    fileName,
    added,
    status
  ]);
}