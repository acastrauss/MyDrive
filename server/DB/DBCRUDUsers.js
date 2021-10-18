const { ObjectId } = require('bson');
const {MongoClient} = require('mongodb');
const DBInfo = require('./DBInfo');
const UserDBName = 'Users';
const UserCollection = 'Users';

exports.CreateUser = async function CreateUser(user){
    
    const client = new MongoClient(DBInfo.uri);

    try {
        await client.connect();
        
        let inserted = await client.db(UserDBName).collection(UserCollection)
        .insertOne(user);

    } catch (error) {
        console.error(error);
    }
    finally{
        client.close();
    }
}

exports.CheckIfUserExists = async function Check(username, passwordHash){
    const client = new MongoClient(DBInfo.uri);
    let retVal;

    try {
        await client.connect();
        
        let found = await client.db(UserDBName).collection(UserCollection)
        .findOne({
            Username: username,
            PasswordHash: passwordHash
        });

        retVal = found;

    } catch (error) {
        console.error(error);
        retVal = null;
    }
    finally{
        client.close();
    }

    return retVal;
}

exports.UpdateUser = async function UpdateUser(id, user) 
{
    const client = new MongoClient(DBInfo.uri);
    let retVal;

    try {
        await client.connect();
        
        let query = {
            _id: new ObjectId(id)
        };

        let found = await client.db(UserDBName).collection(UserCollection)
        .updateOne(query, {
            $set: user
        });

        retVal = found;

    } catch (error) {
        console.error(error);
        retVal = null;
    }
    finally{
        client.close();
    }

    return retVal;    
}

exports.DeleteUser = async function DeleteUser(id) {
    const client = new MongoClient(DBInfo.uri);
    let retVal;

    try {
        await client.connect();
        
        let query = {
            _id: new ObjectId(id)
        };

        let found = await client.db(UserDBName).collection(UserCollection)
        .deleteOne(query);

        retVal = found;

    } catch (error) {
        console.error(error);
        retVal = null;
    }
    finally{
        client.close();
    }

    return retVal;    
    
}