const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.get('/api/properties', async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

app.post('/api/properties', async (req, res) => {
  const { title, type, location, rent, gender } = req.body;
  const newProp = await prisma.property.create({
    data: { title, type, location, rent: parseFloat(rent), gender }
  });
  res.json(newProp);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
