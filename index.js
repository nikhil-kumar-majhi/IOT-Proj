const functions = require("firebase-functions");

const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proj-iot-20d9e-default-rtdb.firebaseio.com"
});

const express = require("express");
const cors = require("cors");

// Main App
const app = express();

app.use(cors({origin: true})); //helps us use cross origin databases

// DB Ref
const db = admin.firestore();

// Routes
app.get('/',(req,res)=>{
    return res.status(200).send("Wrong api");
})
// get -> Method
app.get('/api/get/:id',(req,res)=>{
    (async () => {
        try{
            const reqDoc = db.collection('data').doc(req.params.id);
            let dt = await reqDoc.get();
            let response = dt.data();
            return res.status(200).send({data: response});
        }
        catch (error){
            return res.status(500).send({status: "Error : Fetching Data",msg: error});
        }
    })();
});

// export
exports.app = functions.https.onRequest(app);
