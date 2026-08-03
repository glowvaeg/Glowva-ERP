/**
 * إعادة بناء Lifetime
 */
function rebuildLifetime() {
  const ui = SpreadsheetApp.getUi();

  try {

    const folder = DriveApp.getFolderById(CONFIG.MONTHS_FOLDER_ID);

    const files = [];
    const iterator = folder.getFiles();

    while (iterator.hasNext()) {
      const file = iterator.next();

      if (file.getName() >= "2026_07") {
        files.push(file);
      }
    }

    files.sort((a, b) => a.getName().localeCompare(b.getName()));

    ui.alert(
      "سيتم قراءة " +
      files.length +
      " ملف بداية من 2026_07"
    );

  } catch (err) {
    ui.alert(err.message);
  }
}