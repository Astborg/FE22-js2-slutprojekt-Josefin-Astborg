"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("firebase/database");
const firebaseApp_1 = require("./modules/firebaseApp");
const User_1 = require("./modules/User");
const forums_1 = require("./modules/forums");
const bio_1 = require("./modules/bio");
const allusers_1 = require("./modules/allusers");
//Länkar forum.ts till main.ts
(0, forums_1.init)();
//Kallar på funktionen för att ta ta fram alla användares profiler
(0, allusers_1.showAllUsersFunction)();
const dbRef = (0, database_1.ref)(firebaseApp_1.db, '/User');
let user = [];
let userData;
(0, database_1.onValue)(dbRef, snapshot => {
    userData = snapshot.val();
    console.log(userData);
    user = [];
    for (const key in userData) {
        user.push(new User_1.User(key, userData[key].bio, userData[key].img, userData[key].name, userData[key].password));
    }
    //Knapp som kallar på createUser() från ./modules/User;
    document.querySelector('#signupButton').addEventListener('click', e => {
        e.preventDefault();
        (0, User_1.createUser)(userData);
    });
});
//Knapp för att visa profilsidan
const yourInfoBtn = document.getElementById('yourInfo');
yourInfoBtn.addEventListener('click', bio_1.showYourInfoFunction);
