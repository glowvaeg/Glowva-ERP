/**
 * ==========================================================
 * Glowva ERP
 * ERP_Products.js
 * ==========================================================
 */

const Products = {

  headers: [

    "رقم المنتج",
    "SKU",
    "الباركود",
    "اسم المنتج",
    "التصنيف",
    "العلامة التجارية",
    "المورد",
    "سعر الشراء",
    "سعر البيع",
    "المخزون الحالي",
    "الحد الأدنى",
    "الوحدة",
    "الحالة",
    "تاريخ الإنشاء",
    "آخر تحديث"

  ],

  initialize() {

    const sheet = DB.sheet(ERP.SHEETS.PRODUCTS);

    if (sheet.getLastRow() === 0) {

      sheet.appendRow(this.headers);

      sheet.setFrozenRows(1);

    }

  }

};
Products.findByBarcode = function(barcode) {

  return BarcodeService.find(barcode);

};