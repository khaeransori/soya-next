const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const { createRouter } = require('soya-next');
const routes = require('./routes');
const routerOptions = {
  routes,
  defaultLocale: 'id-id',
  siteLocales: ['id-id'],
};

app.prepare()
  .then(() => {
    const server = express();
    server.use(createRouter(app, routerOptions));
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
