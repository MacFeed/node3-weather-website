// core node modules  here

const path = require('path');


// external node modules here
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


// setup path
const viewsPath = path.join(__dirname,'../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');


// set handlerbars engine and view
app.set('view engine','hbs'); // handlerbars
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// set static directory
app.use(express.static(publicDirectoryPath));



app.get('',(req,res)=>{
    res.render('index',{ // possiamo renderizzare handlebars templates
        title: 'Weather App',
        name: 'Donato Mecca'
    }); 
});

app.get('/about', (req,res)=>{ // cosa fare quando qualcuno vuole delle risorse dall'url -> req=request of the server

    res.render('about',{
        title: 'Aboute Me',
        name: 'Donato Mecca'
    });

}); 

app.get('/weather', (req,res)=>{
    // check the address
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        });
    }

// valore default per destrutturare
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });

    });

})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This is an example text',
        title: 'Help',
        name: 'Donato Mecca'
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        text: 'Article not found',
        name: 'Donato Mecca'
    });
});

app.get('/products', (req,res)=>{
    if(!req.query.search){
         return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        text: 'Page not found',
        name: 'Donato Mecca'
    });
});




// il server non è attualmente startato, dobbiamo accenderlo!

app.listen(3000, () => { // 3000 è la porta di default
    console.log('server is up on port 3000');
}); 


