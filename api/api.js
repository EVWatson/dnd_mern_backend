const express = require('express');

const app = new express();
const port = process.env.PORT || 5000;

const classes = [
{
  id: 1,
  index: 1,
  name: "Barbarian",
  hit_die: 12,
  proficiency_choices: [
    {
          from: [
            {
                name: "Skill: Animal Handling",
                url: "http://www.dnd5eapi.co/api/proficiencies/106"
            },
            {
                name: "Skill: Athletics",
                url: "http://www.dnd5eapi.co/api/proficiencies/108"
            },
            {
                name: "Skill: Intimidation",
                url: "http://www.dnd5eapi.co/api/proficiencies/112"
            },
            {
                name: "Skill: Nature",
                url: "http://www.dnd5eapi.co/api/proficiencies/115"
            },
            {
                name: "Skill: Perception",
                url: "http://www.dnd5eapi.co/api/proficiencies/116"
            },
            {
                name: "Skill: Survival",
                url: "http://www.dnd5eapi.co/api/proficiencies/122"
            }
        ],
        type: "proficiencies",
        choose: 2
    }
  ],
  proficiencies: [
      {
          url: "http://www.dnd5eapi.co/api/proficiencies/1",
          name: "Light armor"
      },
      {
          url: "http://www.dnd5eapi.co/api/proficiencies/2",
          name: "Medium armor"
      },
      {
          url: "http://www.dnd5eapi.co/api/proficiencies/18",
          name: "Shields"
      },
      {
          url: "http://www.dnd5eapi.co/api/proficiencies/19",
          name: "Simple weapons"
      },
      {
          url: "http://www.dnd5eapi.co/api/proficiencies/20",
          name: "Martial weapons"
      }
  ],
  saving_throws: [
      {
          url: "http://www.dnd5eapi.co/api/ability-scores/1",
          name: "STR"
      },
      {
          "url": "http://www.dnd5eapi.co/api/ability-scores/3",
          "name": "CON"
      }
    ]
  }
]


app.get('/', (req, res) => {
  return res.send('Greetings Traveller from API');
});

app.get('/classes', (req, res) => {
  return res.send(classes);
});

app.get('/classes/:id', (req, res) => {
  const { id } = req.params;
  const character = classes.find(c => c.id === parseInt(id));
  return res.send(character);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
