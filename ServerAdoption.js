const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Site'));
app.use(session({
    secret: '40296816',
    resave: false,
    saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'Site')));

app.get('/', (req, res) => {
    res.render('Home');
});

app.get('/Home', (req, res) =>{
    res.render('Home');
});

app.get('/Browse', (req, res) => {
    res.render('Browse');
});

app.get('/FindAnimal', (req, res) => {
    res.render('FindAnimal');
});

app.get('/DogCare', (req, res) => {
    res.render('DogCare');
});

app.get('/CatCare', (req, res) => {
    res.render('CatCare');
});

app.get('/GiveAway', (req, res) => {
    if(req.session.isLoggedIn){
        res.render('GiveAway', {mesage: " "});
    } else {
        res.redirect('loginPage');
    }
});

app.get('/CreateAccount', (req, res) => {
    res.render('CreateAccount', {message : " "});
});

app.get('/Contact', (req, res) => {
    res.render('Contact');
});

app.get('/Privacy', (req, res) => {
    res.render('Privacy');
});

app.get('/loginPage', (req, res) => {
    res.render('loginPage', { loginError: " " });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.render('logoutPage');
    });
});


app.post('/createAcc', (req, res) => {
    fs.readFile('login.txt', 'utf8', (err, data) => {
        if(err){
           console.error('Error reading file: ', err);
        } else {
            checkUsers(req, res, data);
        }
    })
})


app.post('/login', (req, res) => {
    fs.readFile('login.txt', 'utf8', (err, data) => {
        if(err){
            console.error('Error reading file: ', err);
        } else {
            checkLogin(req, res, data);
        }
    });
});


app.post('/updatePets', (req, res) => {
    writeGiveAway(req, res);
});




function writeGiveAway(req, res) {
    const animal = req.body.animal;
    const breed = req.body.breed;
    const age = req.body.age;
    const gender = req.body.gender;
    const getAlong = req.body.getalong;
    const children = req.body.children;
    const description = req.body.description.trim();
    const prsnName = req.body.name.trim();
    const prsnEmail = req.body.email.trim();
    const usrName = req.session.user;

    fs.readFile('petInfo.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file: ', err);
        } 

        let pos;
        if (data.trim().length === 0) {
            pos = "1";
        } else {
            let lines = data.trim().split("\n");
            let lastLine = lines[lines.length - 1];
            let posString = lastLine.split(":")[0];
            let posNum = parseInt(posString) + 1;
            pos = posNum.toString();
        }

        let petLine = `${pos}:${usrName}:${animal}:${breed}:${age}:${gender}:${getAlong}:${children}:${description}:${prsnName}:${prsnEmail}`;

        fs.appendFile('petInfo.txt', petLine + "\n", 'utf8', (err) => {
            if (err) {
                console.error('Error writing file: ', err);
            } else {
                res.render('GiveAway', { message: "Your animal has been added to our pet bank!" });
            }
        });
    });
}



function checkLogin(req, res, data){
    let userExists = false;
    let people = data.split("\n");
    let thisUser = req.body.username;
    let thisPass = req.body.password;
    for(let i = 0; i < people.length; i++){
        let person = people[i];
        let personSplit = person.split(":");
        let toCompareUser = personSplit[0];
        let toComparePass = personSplit[1];

        if(thisUser === toCompareUser && thisPass === toComparePass){
            userExists = true;
            break;
        }
    }
    if(userExists){
        req.session.isLoggedIn = true;
        req.session.user = thisUser;
        res.redirect('GiveAway');
        return true;
    } else {
        res.render('loginPage', { loginError: "Your username or password is invalid."});
        return false;
    }
}




function checkUsers(req, res, data){
    let userDouble = false;
            let people = data.split("\n");
            let thisUser = req.body.username;
            let thisPass = req.body.password;
            for(let i = 0; i < people.length; i++){
                let person = people[i];
                let personSplit = person.split(":");
                let toCompare = personSplit[0];

                if(thisUser === toCompare){
                    userDouble = true;
                    break;
                }
            }
            if(userDouble){
                res.render('CreateAccount', {message: "Sorry, this username already exists, please enter a new one."});
            } else {
                let toWrite = `${thisUser}:${thisPass}\n`;
                fs.appendFile('login.txt', toWrite, 'utf8', (err) => {
                    if(err){
                        res.status(500).send("Error writing to file");
                    } else{
                        res.render('CreateAccount', {goodMessage: "Your account has been set up!"});
                    }
                });
            }
}




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});