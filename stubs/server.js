const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");


const configs = {
    PORT: 8080,
    ALLOWED_ORIGINS: "http://localhost:3000/",
    GET_URLS:[
        { url: "/getdata/coords", fileName: "static/data-co-ord.json"}
    ]
};

const corsOption = {
    origin: configs.ALLOWED_ORIGINS,
    optionsSuccessStatus: 200   
};

app.options("*", cors()); //to enable for preflight 
app.use(cors(corsOption));

configs.GET_URLS.forEach((element) => {
    const { url, fileName } = element;

    app.get(url, (request, response) => {
    
        var options = {root: path.join(__dirname)};
        response.sendFile(fileName, options, function(err){
            console.log('File Sent', fileName);
        });
    });
});


app.listen(configs.PORT, () => {
    console.log(`Server listening on port ${configs.PORT}`);
});