/**
 * ==========================================================
 * Glowva ERP
 * Products Module
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
    "الكمية الحالية",
    "الحد الأدنى",
    "الوحدة",
    "الحالة",
    "تاريخ الإنشاء",
    "آخر تحديث"

  ],

  initialize() {

    const sheet = DB.sheet(ERP.SHEETS.PRODUCTS);

    if (sheet.getRange(1,1).getValue() === "") {

      sheet.getRange(1,1,1,this.headers.length)
           .setValues([this.headers]);

      sheet.setFrozenRows(1);

    }

  },

  add(product){

  return ProductService.create(product);

}

};