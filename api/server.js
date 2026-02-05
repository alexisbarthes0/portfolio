const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connecté à MongoDB avec succès');
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
    console.error('\n💡 Solutions possibles:');
    console.error('   1. Vérifiez que MongoDB est installé et démarré');
    console.error('   2. Sur Windows, démarrez MongoDB avec: net start MongoDB');
    console.error('   3. Ou utilisez MongoDB Compass pour vérifier l\'état du service');
    console.error('   4. Vérifiez que le port 27017 n\'est pas utilisé par une autre application');
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.error('Erreur MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB déconnecté');
});
const Project = mongoose.model('Project', new mongoose.Schema({
  title: String,
  description: String,
  image: String
}));

app.get('/projects', async (req, res) => res.send(await Project.find()));
app.post('/projects', async (req, res) => {
  const p = new Project(req.body);
  await p.save();
  res.send(p);
});

app.listen(3000, () => console.log('API en ligne sur http://localhost:3000'));