const express = require('express');
const app = express();
app.set("json spaces", 4);
const PORT = 3000;
const fs = require('fs');

let axios = require("axios");




app.get('/', async function (req, res) {
res.json({status:"ok"});
});


const ig = require('ig-unduh')

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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
