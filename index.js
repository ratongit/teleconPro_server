const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')

// middleware
app.use(cors())
app.use(express.json())


// Database Name
// telecomPro

// password
// aWeHI2PhKCYtADSl

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://telecomPro:aWeHI2PhKCYtADSl@cluster0.vboitvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";




const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const SiteInfoDataBase = client.db('telecomPro').collection('siteInfoDataBase');
const impactSites = client.db('telecomPro').collection('impactSites');



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //  Found all data from database
        app.get('/allsiteinfo', async (req, res) => {
            const result = await SiteInfoDataBase.find()?.toArray();
            res?.send(result)
            // all Site info Lat-Long
            // console.log(result);

        })


        //  Post impact site code on database from input form .
        app.post('/impactsitepost', async (req, res) => {
            const newSite = req.body; // Data sent from frontend
            try {
                const result = await impactSites.insertOne(newSite);
                res.send({ success: true, message: "Site added successfully!", result });
            } catch (error) {
                console.error("Error inserting site:", error);
                res.status(500).send({ success: false, message: "Failed to add site" });
            }
        });


        //  Now Get impact site code by database from impactSites .
        app.get('/impactsite', async (req, res) => {
            const result = await impactSites.find()?.toArray();
            res?.send(result)
            // all Site info Lat-Long
            // console.log(`Impact data list ${result}`);

        })




    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


const sites = [
    { siteDown: "MBBRL05", dcLow: "MBBRL05" },
    { siteDown: "MBBRL22", dcLow: "MBBRL22" },
    { siteDown: "MBBRL45", dcLow: "MBBRL45" },
    { siteDown: "MBSML75", dcLow: "GPHGJRI045" }
]


app.get('/', (req, res) => {
    res.send('User Telecom server is work poperly')
})

app.get('/allSites', (req, res) => {
    res.send(sites)
})






app.listen(port, () => {
    console.log(`Server is runing on Port: ${port}`)

});