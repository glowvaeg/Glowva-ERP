/**
 * ==========================================================
 * Glowva ERP
 * ERP_Logger.js
 * ==========================================================
 */

const Logger = {

  log(action, details = "", user = "") {

    DB.append(
      ERP.SHEETS.LOGS,
      [
        new Date(),
        action,
        details,
        user || Session.getActiveUser().getEmail()
      ]
    );

  },

  error(error) {

    DB.append(
      ERP.SHEETS.LOGS,
      [
        new Date(),
        "ERROR",
        error.toString(),
        Session.getActiveUser().getEmail()
      ]
    );

  }

};