const express = require('express');
const Joi = require('joi');

const app = new express();
const port = process.env.PORT || 5000;

const classes = [
{
  id: 1,
  index: 1,
  name: "Barbarian",
  hit_die: 12,
  proficiencies: [
      {
       name: "Light armor"
      },
      {
       name: "Medium armor"
      },
      {
       name: "Shields"
      },
      {
       name: "Simple weapons"
      },
      {
      name: "Martial weapons"
      }
  ],
  saving_throws: [
      {
          name: "STR"
      },
      {
          name: "CON"
      }
    ]
},


  {
    id: 2,
    index: 2,
    name: "Bard",
    hit_die: 8,
    proficiencies: [
        {
            name: "Light armor"
        },
        {

            name: "Simple weapons"
        },
        {
            name: "Longswords"
        },
        {
            name: "Rapiers"
        },
        {
            name: "Shortswords"
        },
        {
          name: "Crossbows, hand"
        }
    ],
    saving_throws: [
        {
            name: "DEX"
        },
        {
            name: "CHA"
        }
      ]
  }
]


app.use(express.json());


app.get('/', (req, res) => {
  return res.send('Greetings Traveller from API');
});

app.get('/classes', (req, res) => {
  return res.send(classes);
});

app.get('/classes/:id', (req, res) => {
  const { id } = req.params;
  const character = classes.find(c => c.id === parseInt(id));
  if (!character) {
    return res.status(404).send('Character lost in dungeon');
  }
  return res.send(character);
});

app.post('/classes', (req, res) => {
const {id, index, name, hit_die, proficiencies, saving_throws} = req.body;
const character = {
   id,
   name,
   index,
   hit_die,
   proficiencies,
   saving_throws
 };
const schema = {
  id: Joi.number().required(),
  index: Joi.number().required(),
  name: Joi.string().min(3).required(),
  hit_die: Joi.number().required(),
  proficiencies: Joi.array().items({
    name: Joi.string().min(3).required()
  }).min(1).required(),
  saving_throws: Joi.array().items({
    name: Joi.string().min(3).required()
  }).min(1).required()
}
const valid = Joi.validate(character, schema);
if (valid.error) {
  const message = valid.error.details[0].message;
  return res.status(400).send(message)
}
classes.push(character);
return res.send(character);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
