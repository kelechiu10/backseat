
//init firebase
firebase = require("./index.js");

function setInfo(email, token = null, error = null)
{
    var userInfo = {user:{}};
    userInfo['user'].email = email;
    userInfo['user'].error = error;
    userInfo['user'].token = token;
    return userInfo;
}

//TODO:better error handling


//sign up with email and password
async function emailSignup(email,password,signup = false)
{
    var createAuth;
    var userInfo;
    //if registering:
    if(signup)
    {
        createAuth = firebase.auth().createUserWithEmailAndPassword(email,password);
    }
    //other wise user exists and is signing up
    else
    {
        createAuth = firebase.auth().signInWithEmailAndPassword(email,password);
    }

    await createAuth
        .then(cred =>{
            var user = cred.user;
            //grabs and stores the tokens
            userInfo = setInfo(email, user.uid);
        })
        .catch(err=>
            {
                userInfo = setInfo(email,null,err.message);
            })
    return userInfo;
}

//authenticate with google or facebook
async function oauthSignup(service)
{
    var userInfo;
    var prov;
    //sets the proper provider
    switch(service)
    {
        case 'google':
            prov = new firebase.auth.GoogleAuthProvider();
            break;
        case 'github':
            prov = new firebase.auth.GithubAuthProvider();
            break;
    }
 
    //add scope and stuff later
    await firebase.auth().signInWithPopup(prov)
        .then(res =>{
            console.log(res)
            var user = res.user;
            userInfo = setInfo(user.email,user.uid);
        })
        .catch(err =>
            {
                userInfo = setInfo(err.email,null,err.message);
                //console.log(err.message)
            })
    return userInfo;
}

/*
var email = "quail5@quail.com";
var password = "password";
emailSignup(email,password,true).then(resp => console.log(resp));
*/