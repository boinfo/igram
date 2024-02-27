const express = require('express');
const app = express();
app.set("json spaces", 4);
const PORT = 3000;
const fs = require('fs');
const ig = require('ig-unduh')
let axios = require("axios");




app.get('/', async function (req, res) {
res.json({status:"ok"});
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



app.get('/yt', async function (req, res) {
    let link = req.query.url;

    const videoInfo = require("youtube-ext").videoInfo;

    try {
        const result = await videoInfo(link);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 