/**
 * ==========================================
 * Glowva ERP
 * Lock Service
 * ==========================================
 */

function acquireLock() {

  const lock = LockService.getScriptLock();

  lock.waitLock(30000);

  return lock;

}

function releaseLock(lock) {

  if (lock) {

    lock.releaseLock();

  }

}