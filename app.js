// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// require express-handlebars here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurantsInfo = restaurantList.results
  res.render('index', { restuarants: restaurantsInfo })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantsInfo = restaurantList.results
  const id = req.params.id
  const restaurant = restaurantsInfo.filter(item => item.id === Number(id))
  res.render('show', { restaurant: restaurant[0] })
})

app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const restaurantFilter = restaurantList.results.filter(item => item.name.toLowerCase().includes(keywords.toLowerCase()) || item.name_en.toLowerCase().includes(keywords.toLowerCase()) || item.category.toLowerCase().includes(keywords.toLowerCase()))
  res.render('index', { restuarants: restaurantFilter, keywords })
})

app.listen(port, () => {
  console.log(`this web is running on https://localhost:${port}`)
})