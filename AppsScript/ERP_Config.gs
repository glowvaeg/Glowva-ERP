/*****************************************************
 * Glowva ERP v2
 * ERP_Config.gs
 *****************************************************/

const ERP = {

  // =============================
  // Lifetime File
  // =============================

  lifetimeFileId: "1ANZrA_tjyL07ROLfMndb7sV0f_gMalGuTwrJVOrk2cs",

  // =============================
  // Folder of Monthly Files
  // =============================

  monthsFolderId: "1sUK0YzCwAcBqjW_uyjG06FjbwIWerkjI",

  // =============================
  // Sheet Names
  // =============================

  reportSheet: "تقرير الأصناف",

  lifetimeSheet: "تقرير مبيعات اصناف",

  updatesSheet: "سجل التحديثات",

  logsSheet: "Logs",

  // =============================
  // Report Settings
  // =============================

  reportFirstRow: 5,

  reportColumns: {

    product: 1,

    qty: 2,

    value: 3,

    orders: 4

  },

  // =============================
  // Lifetime Settings
  // =============================

  lifetimeFirstRow: 2,

  lifetimeColumns: {

    product: 1,

    qty: 2,

    value: 3,

    orders: 4,

    lastFile: 5,

    lastUpdate: 6

  }

};
