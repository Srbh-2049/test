console.log('Client_Side_JavaScript');
const info=document.querySelector('.data');
const bad=document.querySelector('.error');
const weather_form=document.querySelector('.f');
const search=document.querySelector('.location');
var answer=[];
weather_form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    var location=search.value;
    bad.textContent=`Loading info on ${location} ...`;
    fetch(`/weather?location=${encodeURIComponent(location)}`).then((response)=>
{
    response.json().then((data)=>
    {
        if(data.err)
        {
            bad.textContent=err;
        }
        else
        {   
            console.log(data);
            var country=data.Country;
            var temperature=data.Temperature;
            var feels_like=data.Feels_Like;
            console.log(temperature);
            console.log(country);
            bad.textContent=``;
            var text=`Location Entered is ${location} ,${country}.`;
            text+=`It is Currently ${temperature} degrees and it feels like ${feels_like} degrees`;
            answer.push(text);
            info.textContent=answer[answer.length-1];
            console.log(';sadjla');
        }
        
    })
})})
