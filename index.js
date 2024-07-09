const express = require('express');
const app = express();
app.set("json spaces", 4);
const PORT = 3000;
const fs = require('fs');
const ig = require('ig-unduh')
let axios = require("axios");
const Youtube = require('youtube-stream-url');
const ndown = require("imran-downloader");
const { pinterestdl } = require('imran-servar');


app.get('/', async function (req, res) {
res.json({status:"ok 3"});
});

app.get('/pin', async function (req, res) {
  try {
    let link = req.query.url;

    let vdourl = await pinterestdl(link);

    res.json({ vdourl });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/insta', async function (req, res) {
  try {
    let link = req.query.url;

    // Assuming 'ig' is a function that processes the Instagram link asynchronously
    let result = await ig(link);

    let d1 = result.data[0].url;
    

let newUrlPrefix = "https://ig95.snap-data.xyz";

let indexOfIg = d1.indexOf("/ig/");

let d2 = newUrlPrefix + d1.slice(indexOfIg);

    res.json({ link: result.data[0].url,
             dl: d2});
    console.log(result.data[0].url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/insta2', async function (req, res) {
  try {
    let link = req.query.url;

    let vdourl = await ndown(link);

    res.json({ vdourl });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/yt', async function (req, res) {
    let link = req.query.url;

    try {
        const video = await Youtube.getInfo({ url: link });
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
