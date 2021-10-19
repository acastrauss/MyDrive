const exppress = require('express');
const sha256 = require('js-sha256');
const DBUsers = require('./DB/DBCRUDUsers');
var bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;

const app = exppress();

// body parser required
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);

    // let user = {
    //     Username: 'asd',
    //     PasswordHash: sha256.sha256('asd'),
    //     Email: 'asd@asd.com'
    // };

    // let newUser = await DBUsers.UpdateUser('616d25c6644b8bad5466182a', user);
    // console.log(newUser);

    // DBUsers.CreateUser(user);
    // DBUsers.DeleteUser('616d35a2260eea425aa4fa1f');
    // DBUsers.CheckIfUserExists('123', sha256.sha256('123'));
});

app.post('/RegisterUser', async (req, res) => {
    let exists = await DBUsers.CheckUsername(req.body.Username);
    
    if(exists !== null){
        res.json(null);  
    } 
    else{
        let registered = await DBUsers.CreateUser(req.body); 
        let newUser = await DBUsers.ReadById(registered.insertedId);
        res.json(newUser);    
    }
});
