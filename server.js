const express = require("express");
var parser = require('ua-parser-js');
const cookieParser = require('cookie-parser');
const ShortUniqueId = require('short-unique-id');
const app = express();
const engine = 'gpt-3.5-turbo';
const number_gifts = 5;
const {
  Configuration,
  OpenAIApi
} = require("openai");
const db = require('./DB');

let id_research = 0;
let old_prompt ='';
let previous_answer = '';

openai_organization = process.env.OPENAI_ORGANIZATION;
openai_api_key = process.env.OPENAI_API;;

const configuration = new Configuration({
  organization: openai_organization,
  apiKey: openai_api_key,
});

const openai = new OpenAIApi(configuration);

const role = `I want you to act as a salesman. suggest me 5 gift ideas, purchasable on Amazon, based on the person's description that i will write you in the next prompt. Only provide a  RFC8259 compliant JSON response , in italian, following this format without deviation.
{
    "gifts": {
        "title": "",
        "description": ""
    }
}
If the next prompts aren't a description of a person write only this:
{
    "gifts": [{
        "title": "error",
        "description": "error"
    }]
}`;

const moreIdeas= 'Suggest me other 5 gift ideas. Only provide a  RFC8259 compliant JSON response , in italian';

async function chatBot(prompt) {
  const response = await openai.createChatCompletion({
    model: engine,
    messages: [{
        role: 'system',
        content: role
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });
  return response.data.choices[0].message.content;
}

async function chatBotMore(old_prompt, previous_answer) {
  const response = await openai.createChatCompletion({
    model: engine,
    messages: [{
        role: 'system',
        content: role
      },
      {
        role: 'user',
        content: old_prompt
      },
      {
        role: 'system',
        content: previous_answer
      },
      {
        role: 'user',
        content: moreIdeas
      },
    ],
  });
  return response.data.choices[0].message.content;
}


app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname));
app.use(cookieParser());
app.use(express.json({
  extended: true,
  limit: '1mb'
}))

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/desired", async(req, res) => {
  res.sendFile(__dirname + "/desired.html");
});

app.post("/desired_table", async(req, res) => {
  await db.getProducts().then(data => {
    if (data !== 0) {
      res.json(data);
    }
  });
});

app.get("/search", (req, res) => {
  res.sendFile(__dirname + "/search.html");
});

app.post("/researches_table", async(req, res) => {
  await db.getresearches().then(data => {
    if (data !== 0) {
      res.json(data);
    }
  });
});

app.post("/showGiftsResearch", async(req, res) => {
  const title = req.body.title;
  await db.getProductsFromResearch(title).then(data => {
    if (data !== 0) {
      console.log(data);
      res.json(data);
    }
  });
});

app.get("/info", (req, res) => {
  res.sendFile(__dirname + "/info.html");
});

app.post('/searched', async (req, res) => {
  const userAgent = req.headers['user-agent'];
  var ua = parser(userAgent);
  var browser = ua.browser["name"];
  var os = ua.os["name"]
  var device = ua.device["model"];
  const user_id = req.cookies.user_id;
  const timestamp = new Date();

  if (user_id) {
    console.log('User ID:', user_id);
  } else {
    const new_user_id = new ShortUniqueId({
      length: 10
    });
    res.cookie('user_id', new_user_id());
    console.log('New User ID:', new_user_id());
  }
  const response = await chatBot(req.body.searchQuery);
  previous_answer = response;
  let response_json = JSON.parse(response);

  await db.insertResearch(user_id, device, os, req.body.searchQuery, timestamp).then(data => {
    if (data !== 0) {
      id_research = data.rows[0].id;
    }
  });

  if (response_json.gifts.length < number_gifts) {
    console.log("Non hai inserito una descrizione di una persona o di un occasione speciale");
  } else {
      for (let i = 0; i < response_json.gifts.length; i++) {
        await db.insertProduct(id_research, response_json.gifts[i].title, response_json.gifts[i].description, 'Amazon');
      }
    }
  old_prompt = req.body.searchQuery;
  res.json(response_json.gifts);
});

app.post('/moreGifts', async (req, res) => {
  const response_more = await chatBotMore(old_prompt, previous_answer);
  let response_more_json = JSON.parse(response_more);
  for (let i = 0; i < response_more_json.gifts.length; i++) {
    await db.insertProduct(id_research, response_more_json.gifts[i].title, response_more_json.gifts[i].description, 'Amazon');
  }

  res.json(response_more_json.gifts);
});