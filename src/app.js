const path=require('path');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const express=require('express');
const hbs=require('hbs');
const app=express();
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');
//Set up Static Directory
app.use(express.static(path.join(__dirname,'../public')));
//Setting Up Port

const port=process.env.PORT||3005;
//Set up EJS
app.set("view engine","hbs")
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
//Rendering Files
app.get('',(req,res)=>
{
    res.render('index',
    {
        'title':'Weather',
        'name':'Saurabh Ojha'
    });
})
app.get('/about',(req,res)=>
{
    res.render('about',
    {
        'title':'About_Page',
        'name':'Saurabh Ojha'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',
    {
        'title':'Help_Page',
        'name':'Saurabh Ojha',
        'help_text':'Go to Weather Page and enter the address and get your Rain-Check' 

    })
})

app.get('/weather',(req,res)=>
{
   if(!req.query.location)
   {
    return res.send(
        {
            'error':'Must Provide an Address'
        }
    )
   }
   else
   {
        geocode(req.query.location,(err,{latitude,longitude,location}={})=>
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                //console.log(data)
                var longitude=longitude;
                var latitude=latitude;
                var location=location;
                forecast(latitude,longitude,(err,data)=>
                {
                    if(err)
                    {
                        res.send('Error');
                    }
                    else
                    {
                        res.send(data);
                    }
                })
            }
        })
   }
  
})
app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send(
            {
                'error':'You must provide a search query'
            }
        )
    }
    
    console.log(req.query.search)
    res.send(
        {
            products:[]
        }
    )
})
app.get('/help/*',(req,res)=>
{
   res.render('404',
    {
        'title':'Help Not Found',
        'name':'Saurabh Ojha',
        'errorMessage':'Help article not found'
    }
   )
})
app.get('*',(req,res)=>
{
    res.render('error',
    {
        'title':'Page not present',
        'name':'Saurabh Ojha'
    });
})
app.listen(port,()=>
{
    console.log(`Server running on port ${port}`);
})
