/**
 * ==========================================================
 * Glowva ERP
 * Product Service
 * ==========================================================
 */

const ProductService = {

  create(product) {

    if (BarcodeService.exists(product.barcode))
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