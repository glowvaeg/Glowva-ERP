/**
 * ==========================================
 * Glowva ERP
 * ERP_Rebuild.js
 * إعادة بناء ملف Lifetime بالكامل
 * ==========================================
 */

function rebuildLifetime() {
  const ui = SpreadsheetApp.getUi();

  try {
    ui.alert(
      "إعادة بناء Lifetime",
      "سيتم تنفيذ هذه الميزة في الخطوة التالية.",
      ui.ButtonSet.OK
    );

  } catch (err) {
    ui.alert(err.message);
  }
}