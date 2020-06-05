const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;

app = express();
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.get('/', (req, res) => {
    fetch(`http://localhost:3004/messages`).then(response => {
        response.json().then(json => {
            res.render('default/home', {
                articles: json
            })
        })
    }).catch(error => {
        alert(error);
    })
})

app.get('/add_note', (req, res) => {
    res.render('crud/add_note');
})

app.post('/api/add_note', jsonParser, (req, res) => {
    fetch(`http://localhost:3004/messages`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        res.status(200).send();
    }).catch(error => {
        alert(error);
    })
})

app.get('/edit_note/:id', (req, res) => {
    fetch(`http://localhost:3004/messages/${req.params.id}`).then(response => {
        response.json().then(json => {
            res.render('crud/edit_note', {
                articles: json
            })
        })
    }).catch(error => {
        alert(error);
    })
})

app.patch('/api/edit_note/:id', jsonParser, (req, res) => {
    fetch(`http://localhost:3004/messages/${req.params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        res.status(200).send();
    }).catch(error => {
        alert(error);
    })
})

app.delete('/api/delete/:id', (req, res) => {
    fetch(`http://localhost:3004/messages/${req.params.id}`, {
        method: 'DELETE'
    }).then(() => {
        res.status(200).send();
    }).catch(error => {
        alert(error);
    })
})

app.listen(port, () => {
    console.log(`Application server running on PORT ` + port);
})