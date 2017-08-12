var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article1 by Sujan',
        heading: 'Article1',
        date: '05 Aug 2017',
        content: `
            <p>
                THis is pargragh 1 for article. 
            </p>
        `
     },

    'article-two' : {
        title: 'Article2 by Suraj',
        heading: 'Article2',
        date: '05 Aug 2017',
        content: `
            <p>
                THis is pargragh 1 for article2. 
            </p>
    `
    },
    
    'article-three' : {
        title: 'Article3 by Naveen',
        heading: 'Article3',
        date: '05 Aug 2017',
        content: `
            <p>
                THis is pargragh 1 for article3. 
            </p>
    `
    }
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
    <!doctype html>
    <html>
        <head>
            <title>
               ${title}
            </title>
            <meta name="viewport" context="width=device-width, initial-scaled">
            <link href='/ui/style.css' rel='stylesheet'/>
        </head>
        <body>
            <div class="container">
                <div>
                    <a href = '/'>Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                   ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function (req,res){
    counter = counter+1;
    res.send(counter.toString());
});

app.get('/:articleName',function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));//(articles[articleName]));  
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names = [];
app.get('/submit-name/:name', function (req, res) {
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringfy(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
