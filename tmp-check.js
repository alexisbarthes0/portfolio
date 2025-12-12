const mongoose = require('./api/node_modules/mongoose');
const { MongoClient } = require('./api/node_modules/mongodb');
const util = require('util');
const log = (label, data) => { console.log('\n=== ' + label + ' ==='); console.log(data); };

(async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/portfolio');
    const collections = await conn.connection.db.listCollections().toArray();
    log('portfolio collections', collections.map(c => c.name));
    for (const name of collections.map(c => c.name)) {
      const docs = await conn.connection.db.collection(name).find({}).limit(5).toArray();
      log('portfolio ' + name + ' sample', util.inspect(docs, { depth: 3, colors: false }));
    }
    await conn.disconnect();
  } catch (e) {
    console.error('\nportfolio error', e);
  }

  try {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('plongee');
    const collections = await db.listCollections().toArray();
    log('plongee collections', collections.map(c => c.name));
    for (const name of collections.map(c => c.name)) {
      const docs = await db.collection(name).find({}).limit(5).toArray();
      log('plongee ' + name + ' sample', util.inspect(docs, { depth: 3, colors: false }));
    }
    await client.close();
  } catch (e) {
    console.error('\nplongee error', e);
  }
})();
