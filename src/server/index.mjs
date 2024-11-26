import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = 99;

app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'data.json');

const readData = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.post('/api/companies-get', (req, res) => {
  const data = readData();
  const { limit, lastCursor } = req.body;

  if(lastCursor === -1) {
    res.json({
      companies: [],
      lastCursor: -1
    });
  }

  const startIndex = lastCursor ? data.companies.findIndex(company => company.id === lastCursor) + 1 : 0;
  const resultCompanies = data.companies.slice(startIndex, startIndex + parseInt(limit, 10));
  const nextCursor = resultCompanies.length > 0 ? resultCompanies[resultCompanies.length - 1].id : -1;

  setTimeout(() => {
    res.json({
      companies: resultCompanies,
      lastCursor: nextCursor
    });
  }, 500);
});

app.post('/api/companies-create', (req, res) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).json({ error: true });
  }

  const data = readData();
  const newCompany = {
    id: Math.floor(Math.random() * (99999999999 - 1 + 1)) + 1,
    name,
    address
  };

  data.companies.unshift(newCompany);
  writeData(data);

  setTimeout(() => {
    res.status(201).json({
      company: newCompany
    });
  }, 500);
});

app.post('/api/companies-delete', (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: true });
  }

  const data = readData();
  data.companies = data.companies.filter(company => !ids.includes(company.id));
  writeData(data);

  setTimeout(() => {
    res.status(200).json({ ok: true });
  }, 500);
});

app.post('/api/companies-edit', (req, res) => {
  const { id } = req.body;

  const companies = readData().companies.map((company) => {
    if(company.id === id) {
      return {
        ...company,
        ...req.body
      };
    }

    return company;
  });

  writeData({ companies });

  setTimeout(() => {
    res.status(200).json({ ok: true });
  }, 500);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});
