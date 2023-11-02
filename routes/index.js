var express = require('express');
var router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/get/demo',function(req,res){
  res.status(200).json({message: "Hello World"}); 
}); //work

router.get('/api/JBscrape', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    // Select the meta element using its attribute (e.g., name="price")
    const titleraw = $('meta[property="og:title"]');
    const imageraw = $('meta[property="og:image"]');
    const priceraw = $('meta[property="og:price:amount"]');
    const currencyraw = $('meta[property="og:price:currency"]');
    
    if (titleraw.length > 0 && imageraw.length > 0 && priceraw.length > 0 && currencyraw.length > 0) {
      const title = titleraw.attr('content');
      const image = imageraw.attr('content');
      const price = priceraw.attr('content');
      const currency = currencyraw.attr('content');

      res.status(200).json({ title, image,price,currency });
    } else {
      res.status(404).json({ error: 'Price meta element not found on the page' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape data from the URL' });
  }
});




module.exports = router;
