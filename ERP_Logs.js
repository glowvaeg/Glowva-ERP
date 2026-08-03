/**
 * ==========================================
 * ERP Logs
 * ==========================================
 */

function writeLog(action, status, message) {

  const ss = SpreadsheetApp.openById(CONFIG.LIFETIME_FILE_ID);

  let sheet = ss.getSheetByName(CONFIG.LOGS_SHEET);

  if (!sheet) {

    sheet = ss.insertSheet(CONFIG.LOGS_SHEET);

    sheet.appendRow([
      "Date",
      "Action",
      "Status",
      "Message"
    ]);

  }

  sheet.appendRow([
    new Date(),
    action,
    status,
    message
  ]);

}