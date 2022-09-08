const request=require('request');
const geocode=(address,callback)=>
{
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiazIwNDkiLCJhIjoiY2w0bXE2enprMTJ2NTNkbGg1bTUwbnRseCJ9.Wl3fDDBwrwrqZmOCGJbU4Q&limit=1`;
    //console.log(url);
    request ({url:url ,json:true},(err,resp)=>
    {
        if(err)
        {
            callback('Unable to connect to location services!', undefined);
        }
        else
        {
            callback(undefined,
                {
                    latitude: resp.body.features[0].center[1],
                    longitude: resp.body.features[0].center[0],
                    location: resp.body.features[0].place_name
                })
        }
    })
}

module.exports=geocode;