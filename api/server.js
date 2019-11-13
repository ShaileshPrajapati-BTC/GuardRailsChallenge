const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const ScanResult = require('./schema/scanResult');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  'mongodb+srv://spMongo:mGz1Hi2eSqHrgEpu@cluster0-1thez.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getData', (req, res) => {
  ScanResult.find({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  ScanResult.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  ScanResult.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/putData', (req, res) => {
  let data = new ScanResult(req.body);
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));