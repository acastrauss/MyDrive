const exppress = require('express');
const {MongoClient} = require('mongodb');



const PORT = process.env.PORT || 3001;

const MongoPass = `hwb9IWqRMg2Lwyqh`;
const DBName = `MyDriveProject`;

const app = exppress();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

async function main(){
    const uri = `mongodb+srv://DriveProjectDev:${MongoPass}@mydriveproject.qibd5.mongodb.net/${DBName}?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try{
        
        await client.connect();
        await listDatabases(client);
    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);