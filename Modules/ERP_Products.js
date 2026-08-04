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

    if(BarcodeService.exists(product.barcode))
      throw new Error("الباركود موجود بالفعل.");

    const id = Utilities.getUuid();

    const sku =
      "GL-" +
      Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyMMddHHmmss"
      );

    DB.append(
      ERP.SHEETS.PRODUCTS,
      [

        id,

        sku,

        product.barcode,

        product.name,

        product.category,

        product.brand,

        product.supplier,

        product.buyPrice,

        product.sellPrice,

        0,

        product.minQty,

        product.unit,

        "نشط",

        new Date(),

        new Date()

      ]
    );

    Logger.log(
      "ADD_PRODUCT",
      product.name
    );

    return id;

  }

};