const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const PORT = config.get('port');
const MONGO_URI = config.get('mongoUri');
const MONGO_URI_LOCAL = config.get('mongoUriLocal');

app.use(express.json({ extended: true }));
app.use(cors());
app.use('/api/product', require('./routes/product.route'));
app.use('/api/auth', require('./routes/auth.route'));

async function start() {
  try {
    await mongoose.connect(MONGO_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log(`app startet port: ${PORT}`);
    });
  } catch (e) {
    console.log(e.message)
  }
}

start();