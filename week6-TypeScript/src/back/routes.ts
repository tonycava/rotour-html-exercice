import * as express from 'express';

import {
  fetchAllPet, fetchCount, fetchFromRoot, isGood, isKey,
} from './main';

const app = express();

app.use(express.json());

app.get('/*/:id/', async (req, res) => {
  const count = await fetchCount();
  let num: number;
  const { url } = req;
  const reset = url.split('/');
  const resetString = [...reset][2];
  const string = [...reset][1];

  const toTest = /^[A-Za-z]+$/;
  const tab = Array.from(resetString);

  if (await isGood(toTest, tab)) {
    num = Number(resetString);
    if (num > count) {
      res.sendStatus(400).send('Bad request');
    } else {
      const petData = await fetchAllPet('https://fr.dofus.dofapi.fr/pets');
      res.send(petData[num][string]);
    }
  } else {
    res.sendStatus(400).send('Bad request');
  }
});

app.get('/:id/', async (req, res) => {
  const count = await fetchCount();
  const idUrl = req.params.id;
  const numUrl = Number(idUrl);
  let { url } = req;
  url = url.slice(1);
  const boolean = await isKey(url);

  if (boolean) {
    const data = await fetchFromRoot(url);
    res.send(data);
  }

  if (url === '') {
    const petData = await fetchAllPet('https://fr.dofus.dofapi.fr/pets');
    res.json(petData);
  } else if (numUrl > count) {
    res.sendStatus(400).send('Bad request');
  } else {
    const petData = await fetchAllPet('https://fr.dofus.dofapi.fr/pets');
    res.send(petData[numUrl]);
  }
});

app.get('/', async (req, res) => { // && app app.get('/:id/')
  const petData = await fetchAllPet('https://fr.dofus.dofapi.fr/pets');
  res.send(petData);
});

app.listen(3000, () => {
  console.log('Server Running');
});
