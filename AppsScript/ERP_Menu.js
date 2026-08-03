/**
 * ============================================================
 * Glowva ERP Menu
 * ============================================================
 */

function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu("Glowva ERP")

    .addItem("🔄 تحديث Lifetime", "updateLifetime")

    .addItem("🧱 إعادة بناء Lifetime", "rebuildLifetime")

    .addSeparator()

    .addItem("📊 فتح ملف Lifetime", "openLifetime")

    .addToUi();

}


/**
 * فتح ملف Lifetime
 */
function openLifetime() {

  const url =
    "https://docs.google.com/spreadsheets/d/" +
    CONFIG.LIFETIME_FILE_ID;

  SpreadsheetApp.getUi().alert(url);

}