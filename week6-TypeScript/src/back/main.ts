import axios from 'axios';

type DofusPet = {
  id: number,
  ankamaId: number,
  name: string,
  level: number,
  type: string,
  imgUrl: string,
  url: string,
  description: string,
  statistics: any,
  conditions: string[],
}

export function fetchAllPet(url: string): Promise<DofusPet[]> {
  return axios
    .get(url).then((dataResponse) => dataResponse.data)
    .catch((err) => err);
}

export async function isGood(toTest, tab): Promise<boolean> {
  let bool = true;
  tab.forEach((element) => {
    if (toTest.test(element)) {
      bool = false;
    }
  });
  return bool;
}

export async function fetchCount(): Promise<number> {
  return axios
    .get('https://fr.dofus.dofapi.fr/pets/count').then((dataResponse) => dataResponse.data.count)
    .catch((err) => err);
}

export async function fetchFromRoot(parameterUrl: string): Promise<string[]> {
  let parameter = parameterUrl;

  if (parameterUrl === 'id') {
    parameter = '_id';
  }

  const temp = [];
  const dataAPI = await fetchAllPet('https://fr.dofus.dofapi.fr/pets');

  dataAPI.forEach((element) => {
    temp.push(element[parameter]);
  });
  return temp;
}

export async function isKey(url: string): Promise<boolean> {
  let parameter = url;

  if (url === 'id') {
    parameter = '_id';
  }

  return parameter === '_id' || parameter === 'ankamaId' || parameter === 'name' || parameter === 'level' || parameter === 'type' || parameter === 'imgUrl' || parameter === 'url' || parameter === 'description' || parameter === 'statistics' || parameter === 'conditions';
}
