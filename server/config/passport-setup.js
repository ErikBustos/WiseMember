const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');


//if(process.env.NODE_ENV !== 'production')
    require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID:  process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENTSECRET,
    callbackURL: "http://localhost:3000/signUp"
},
   async function(accessToken, refreshToken, profile, done) {

    if(profile == null) {
        done(null, false, {error: 'no fue posible autenticarse'})
        return;
    }

    let newUser = {
        name : profile._json.name,
        email: profile._json.email,
        picture: profile._json.picture,
        given_name: profile._json.given_name
    }

    let users = await userModel.getUsers();

    let findUser = users.find( u => u.email == newUser.email)

        if(findUser) { //user found
            done(null, findUser)
            return;
        } else { //user not found
            await userModel.addUser(newUser);
            done(null, newUser);
        }

    }
));

passport.serializeUser((user,done) => {
    console.log('serialize')
    done(null, user._id)
})

passport.deserializeUser((user,done) =>{
    console.log('deserialize')
    let users = userModel.getUsers();
    let findUser = users.find( u => u.email == user.email)
    done(null, findUser);
})

function googleLogin(req, res) {
    console.log('Entrando a google login');

    passport.authenticate('google', (err, user, info) => {
        console.log('Entrando a google strategy');
        console.log(user);
         if(user) {
            let token = jwt.sign({nombre: user.name, email: user.email}, 'secret', {expiresIn: '1h'} )
            res.send({token})
        } else {
            res.status(401).send(info)
        } 
        //res.send("ok");
    }) (req,res)
}



module.exports = {googleLogin}



/* passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/redirect"
},
    function(accessToken, refreshToken, profile, done){
        console.log("working");
        let user = {
            id: new Date(),
            googleId: profile.id,
            email: profile._json.email,
            imageUrl: profile._json.picture
        }
        //console.log('profile : \n', user)
        let pathofJson = path.join(__dirname, '../db/users.json');
        let jsonfile= fs.readFileSync(pathofJson);
        let userList= JSON.parse(jsonfile);
        //console.log('userList: \n', userList.users);
        if(userList.users.find(u => u.googleId === user.googleId) === undefined)
            userList.users.push(user);

        fs.writeFileSync(pathofJson, JSON.stringify(userList));
    }
));

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((user,done) =>{
    let findUser = users.find(usr => usr.id == id);
    done(null, findUser);
}) */