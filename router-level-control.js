const express = require('express');

const app = express();

const router = express.Router();
router.use((request, response, next) => {
  if (!request.query.id) {
    next('router');
  } else {
    next();
  }
});
router.get('/', (request, response) => {
  const { id } = request.query;
  response.send(`You specified a user ID => ${id}`);
});

app.get('/', router, (request, response) => {
  response.status(400).send('A user ID needs to be specified');
});

app.listen(1337, () => console.log('Web Server running on port 1337'));
