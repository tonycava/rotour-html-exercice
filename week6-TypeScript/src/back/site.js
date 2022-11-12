const plein = 'zesr';
const plein2 = 'rstdf';

const data = {
  plein, plein2,
};

const options = {
  mode: 'no-cors',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  url: 'http://localhost:3000',
  body: JSON.stringify(data),
};

fetch('http://localhost:3000/api', options).then((response) => {
  console.log(response);
}).catch((err) => console.log(err));
