/**
 * ==========================================================
 * Glowva ERP
 * ERP_Menu.js
 * ==========================================================
 */

function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu("Glowva ERP")

    .addItem("🏠 الرئيسية", "openHome")

    .addSeparator()

    .addSubMenu(

      SpreadsheetApp.getUi()

        .createMenu("📦 المنتجات")

        .addItem("عرض المنتجات", "openProducts")

        .addItem("إضافة منتج", "addProduct")

    )

    .addSubMenu(

      SpreadsheetApp.getUi()

        .createMenu("🛒 المبيعات")

        .addItem("فاتورة جديدة", "newSale")

    )

    .addSubMenu(

      SpreadsheetApp.getUi()

        .createMenu("🚚 المشتريات")

        .addItem("فاتورة شراء", "newPurchase")

    )

    .addSeparator()

    .addItem("📊 لوحة التحكم", "openDashboard")

    .addToUi();

}

function openHome() {
  DB.sheet(ERP.SHEETS.HOME).activate();
}

function openProducts() {
  DB.sheet(ERP.SHEETS.PRODUCTS).activate();
}

function openDashboard() {
  DB.sheet(ERP.SHEETS.DASHBOARD).activate();
}

function addProduct() {
  SpreadsheetApp.getUi().alert("قريبًا");
}

function newSale() {
  SpreadsheetApp.getUi().alert("قريبًا");
}

function newPurchase() {
  SpreadsheetApp.getUi().alert("قريبًا");
}