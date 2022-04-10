const {MongoClient} = require('mongodb');

async function main() {
	// we'll add code here soon
    const uri = "mongodb+srv://barcelparts:barcelparts@cluster0.uv4lk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);


    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

mongoose.connect('mongodb+srv://barcelparts:barcelparts@cluster0.uv4lk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');