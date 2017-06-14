import Frisbee from 'frisbee';
import env from './env.json';

const baseURI = env.API_ADDRESS;
const headers = {
  Accepts: 'application/json',
  'Content-Type': 'application/json'
};

let internalAPI = new Frisbee({ baseURI, headers });

export const api = () => internalAPI;

export const setAPIHeader = (name, value) => {
  headers[name] = value;
  internalAPI = new Frisbee({ baseURI, headers });
};

export const removeAPIHeader = (name) => {
  delete headers[name];
  internalAPI = new Frisbee({ baseURI, headers });
};
