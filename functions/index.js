
// dependencias
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const app = express()

var serviceAccount = require("./chave.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://consulta-assinecar.firebaseio.com"
})
const db = admin.firestore()

//CORS
app.use(cors({ origin: true }))

//mass upload
/*
tabela = require("./tabela-marco.json")
tabela.forEach((item,index) => db.collection('tabela').doc('/' + index + '/').create(item))
*/

// create

/*app.post('/api/create', (req, res) => {
    (async () => {
        try {
            await db.collection('tabela').doc('/' + req.body.id + '/')
            .create({item: req.body.item})
            return res.status(200).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    })()
})

*/

// read item
app.get('/api/read/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('tabela').doc(req.params.item_id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// read all

app.get('/api/read', (req, res) => {
     (async () => {
        try {
            let query = db.collection('tabela');
            let response = [];
            await query.get()
            .then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = doc.data();
                response.push(selectedItem);
            }
            return null
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// update
/*
app.put('/api/update/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('tabela').doc(req.params.item_id);
            await document.update({
                item: req.body.item
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// delete

app.delete('/api/delete/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('tabela').doc(req.params.item_id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
*/

exports.app = functions.https.onRequest(app)