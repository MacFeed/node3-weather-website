
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// const messageOne = document.querySelector('p'); // prende il primo p se non uso l'id
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault(); // evita che si aggiorni il browser (comportamento di default)

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageTwo.textContent = data.error;
                messageOne.textContent = '';
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});