require('dotenv').load();

const express = require('express');
const escapeHTML = require('escape-html');
const bodyParser = require('body-parser');
const generateName = require('sillyname');

const app = express();

const PORT = process.env.PORT || 3000;

let id = 0;

function createMeowem(content) {
  return {
    id: id++,
    name: generateName(),
    content: content
  }
}

const meowems = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get('/meowems', (request, response) => {
  response.json(meowems);
});

app.post('/meowems', (request, response) => {
  /*
    We don't want the user to be able to post html tags.
    Clean the input before storing it to the 'db'.
  */
  const meowem = createMeowem(escapeHTML(request.body.content));
  
  /* Add the new poem to the list of existing poems. */
  meowems.push(meowem);

  /* Send back 201 and the resource that was just created as json. */
  response.status(201).json(meowem);
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`)
});
