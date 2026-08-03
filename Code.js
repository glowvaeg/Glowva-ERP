/**
 * 1) تلوين كل صف في "المشتريات" حسب اسم المورد
 * 2) إضافة أي مورد جديد تلقائي لصفحة "الموردين" مع لون ومعادلة إجمالي المشتريات
 */

var PURCH_SHEET = "المشتريات";
var PURCH_SUPPLIER_COL = 2;   // B = اسم المورد
var PURCH_FIRST_ROW = 5;      // أول صف بيانات في المشتريات
var PURCH_COL_FROM = 1;       // A
var PURCH_COL_TO = 6;         // F
var PURCH_TOTAL_COL = 6;      // F = الإجمالي

var SUPPLIER_SHEET = "الموردين";
var SUPPLIER_NAME_COL = 1;    // A
var SUPPLIER_COLOR_COL = 2;   // B = اللون
var SUPPLIER_TOTAL_COL = 3;   // C = حجم المشتريات
var SUPPLIER_FIRST_ROW = 2;   // أول صف بيانات في الموردين

function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  if (sheet.getName() === PURCH_SHEET) {
    syncSuppliers();
    colorRowsBySupplier();
  }
}

function colorRowsBySupplier() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PURCH_SHEET);
  var lastRow = sheet.getLastRow();
  if (lastRow < PURCH_FIRST_ROW) return;

  var range = sheet.getRange(PURCH_FIRST_ROW, PURCH_SUPPLIER_COL, lastRow - PURCH_FIRST_ROW + 1, 1);
  var names = range.getValues();

  for (var i = 0; i < names.length; i++) {
    var name = String(names[i][0]).trim();
    var row = PURCH_FIRST_ROW + i;
    if (!name) continue;
    var color = colorForName(name);
    sheet.getRange(row, PURCH_COL_FROM, 1, PURCH_COL_TO - PURCH_COL_FROM + 1).setBackground(color);
  }
}

function syncSuppliers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var purchSheet = ss.getSheetByName(PURCH_SHEET);
  var supSheet = ss.getSheetByName(SUPPLIER_SHEET);

  var purchLastRow = purchSheet.getLastRow();
  if (purchLastRow < PURCH_FIRST_ROW) return;

  var purchNames = purchSheet
    .getRange(PURCH_FIRST_ROW, PURCH_SUPPLIER_COL, purchLastRow - PURCH_FIRST_ROW + 1, 1)
    .getValues()
    .map(function (r) { return String(r[0]).trim(); })
    .filter(function (n) { return n !== ""; });

  var uniqueNames = purchNames.filter(function (n, i) { return purchNames.indexOf(n) === i; });

  var supLastRow = supSheet.getLastRow();
  var existingNames = [];
  if (supLastRow >= SUPPLIER_FIRST_ROW) {
    existingNames = supSheet
      .getRange(SUPPLIER_FIRST_ROW, SUPPLIER_NAME_COL, supLastRow - SUPPLIER_FIRST_ROW + 1, 1)
      .getValues()
      .map(function (r) { return String(r[0]).trim(); });
  }

  var nextRow = Math.max(supLastRow + 1, SUPPLIER_FIRST_ROW);

  uniqueNames.forEach(function (name) {
    if (existingNames.indexOf(name) === -1) {
      supSheet.getRange(nextRow, SUPPLIER_NAME_COL).setValue(name);
      supSheet.getRange(nextRow, SUPPLIER_COLOR_COL).setBackground(colorForName(name));
      var formula = "=SUMIF('" + PURCH_SHEET + "'!" +
        columnLetter(PURCH_SUPPLIER_COL) + ":" + columnLetter(PURCH_SUPPLIER_COL) +
        ",A" + nextRow + ",'" + PURCH_SHEET + "'!" +
        columnLetter(PURCH_TOTAL_COL) + ":" + columnLetter(PURCH_TOTAL_COL) + ")";
      supSheet.getRange(nextRow, SUPPLIER_TOTAL_COL).setFormula(formula);
      existingNames.push(name);
      nextRow++;
    }
  });
}

function columnLetter(col) {
  var letter = "";
  while (col > 0) {
    var rem = (col - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}

function colorForName(name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  var hue = Math.abs(hash) % 360;
  return hslToHex(hue, 55, 88);
}
function printSheetNames() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  sheets.forEach(function (s) {
    Logger.log(s.getName());
  });
}
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs((h / 60) % 2 - 1));
  var m = l - c / 2;
  var r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  var toHex = function (v) {
    var hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}