const ScanResult = require('../schema/scanResult');

// get all the scanResult
exports.index = function (req, res) {
  ScanResult.find({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
};

// Create new ScanResult
exports.new = function (req, res) {
  let data = new ScanResult(req.body);
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

// Update new ScanResult
exports.update = function (req, res) {
  const { id, update } = req.body;
  ScanResult.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};

// Delete new ScanResult
exports.delete = function (req, res) {
  const { id } = req.body;
  ScanResult.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
};
