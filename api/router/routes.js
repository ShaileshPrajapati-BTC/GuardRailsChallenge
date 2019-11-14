let router = require('express').Router();
const ScanResultController = require("../controller/scanResultController");

router.route('/scanResults')
  .get(ScanResultController.index)
  .post(ScanResultController.new);

router.route('/scanResults/:scan_result_id')
  .get(ScanResultController.getFindings)
  .put(ScanResultController.update)
  .patch(ScanResultController.update)
  .delete(ScanResultController.delete);

module.exports = router;