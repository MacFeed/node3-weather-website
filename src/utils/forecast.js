const request = require('request');

const weatherstack = 'http://api.weatherstack.com/current?access_key=8a0ffe810192dd72b64215cbec1f3f64';


const forecast = (latitude, longitude, callback)=>{
    let url = weatherstack+'&query='+latitude+','+longitude+'&units=m';
    request({url:url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weatherstack',undefined); // n.b. call back ha (error,data) e stampa error 
        }
        else if( response.body.error){
            this.call('Unable to find location',undefined)
        }
        else{
            
            callback(undefined, response.body.location.name+ " is currently "+response.body.current.weather_descriptions[0]+' with '+response.body.current.temperature+'°C');
        }
    });

}

/** CON DESTRUTTURAZIONE DIVENTEREBBE COSI'
 * 
 * const forecast = (latitude, longitude, callback)=>{
    let url = weatherstack+'&query='+latitude+','+longitude+'&units=m';
    request({url, json: true}, (error, {body}) => { // prendo solo il body da response
        if(error){
            callback('Unable to connect to weatherstack',undefined); // n.b. call back ha (error,data) e stampa error 
        }
        else if( body.error){
            this.call('Unable to find location',undefined)
        }
        else{
            
            callback(undefined, body.location.name+ " is currently "+body.current.weather_descriptions[0]+' with '+body.current.temperature+'°C');
        }
    });

}
 * 
 * 
 * 
 * 
 * 
 */


module.exports = forecast;