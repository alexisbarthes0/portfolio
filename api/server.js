const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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