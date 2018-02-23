import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.API_ROOT || 'http://localhost:3001/api';

//const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Products = {
  all: page =>
    requests.get(`/products`),
  del: id =>
    requests.del(`/products/${id}`),
  get: id =>
    requests.get(`/products/${id}`),
  update: product =>
    requests.put(`/products/${product._id}`, { product }),
  create: product =>
    requests.post('/products', { product })
};

const Invoices = {
  all: page =>
    requests.get(`/invoices`),
  del: id =>
    requests.del(`/invoices/${id}`),
  get: id =>
    requests.get(`/invoices/${id}`),
  update: invoice =>
    requests.put(`/invoices/${invoice.id}`, { invoice }),
  create: invoice =>
    requests.post('/invoices', { invoice })
};

const Vendors = {
  all: page =>
    requests.get(`/vendors`),
  del: id =>
    requests.del(`/vendors/${id}`),
  get: id =>
    requests.get(`/vendors/${id}`),
  update: vendor =>
    requests.put(`/vendors/${vendor.id}`, { vendor }),
  create: vendor =>
    requests.post('/vendors', { vendor })
};

const Orders = {
  submit: orders =>
    requests.post('/submitOrders', { orders })
};

export default {
  Products,
  Invoices,
  Vendors,
  Orders,
  setToken: _token => { token = _token; }
};
