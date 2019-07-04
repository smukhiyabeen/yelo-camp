const express = require('express');
const app = express();
const port = 3000;

const campgrounds = [
    {name: 'Salmon Creek', image: 'https://cdn.pixabay.com/photo/2018/10/28/16/58/lake-3779280_640.jpg'},
    {name: 'Granite Lake', image: 'https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412_640.jpg'},
    {name: 'Red Rocks', image: 'https://cdn.pixabay.com/photo/2015/05/23/00/25/utah-780108_640.jpg'},    
]

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds, campgrounds})
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

