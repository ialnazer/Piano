const express = require('express');
const path = require('path');
const ExpressError = require('./utils/ExpressError');

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.get('/piano_play', (req, res) => {
    res.render('pianoPlay.ejs')
})
app.all('*', (req, res, next) => {
    throw new ExpressError('Page Not Found', 404)
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh no sth went wrong'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})