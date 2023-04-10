"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.User = void 0;
const firebaseApp_1 = require("./firebaseApp");
const bio_1 = require("./bio");
const database_1 = require("firebase/database");
class User {
    id;
    bio;
    img;
    name;
    password;
    constructor(id, bio, img, name, password) {
        this.id = id;
        this.bio = bio;
        this.img = img;
        this.name = name;
        this.password = password;
        this.checkUser();
    }
    //Kollar om användaren finns i databasen och om lösenordet stämmer
    checkUser() {
        document.querySelector('#loginButton').addEventListener('click', e => {
            e.preventDefault();
            const name = document.querySelector('#userName');
            const password = document.querySelector('#userPassword');
            const loginMessage = document.querySelector('#loginMessage');
            console.log(name.value, password.value);
            if (this.name === name.value && this.password === password.value) {
                const forms = document.querySelector('#forms');
                forms.style.display = 'none';
                (0, bio_1.userBio)(this.name, this.bio, this.img, this.id);
                (0, bio_1.updateUser)(this.name, this.bio, this.img, this.id, this.password);
            }
            else if (this.name != name.value && this.password == password.value) {
                loginMessage.innerText = 'Fel användarnamn';
            }
            else if (this.name === name.value && this.password != password.value) {
                loginMessage.innerText = 'Fel lösenord';
            }
            else if (this.name != name.value && this.password != password.value) {
                loginMessage.innerText = 'Användaren finns inte';
            }
        });
    }
}
exports.User = User;
//Koden för att skapa en ny User
function createUser(userData) {
    //Hämtar inputElement
    const name = document.querySelector('#newUserName');
    const bio = document.querySelector('#newBio');
    const password = document.querySelector('#newUserPassword');
    const confirmPassword = document.querySelector('#confirmNewUserPassword');
    const image = document.querySelector('#NewIMG');
    //Felmeddelande
    const regMessage = document.querySelector('#regMessage');
    //Variabler som ska jämföras med varandra
    const newUsername = name.value;
    const userNames = Object.values(userData);
    let addUser = true;
    const dbRef = (0, database_1.ref)(firebaseApp_1.db, '/User');
    for (const userName of userNames) {
        //Kollar om newUsername finns i databasen databasen som userName.name. 
        //Om namnet redan finns kan vi inte skapa användare då addUser = false.
        if (newUsername === userName.name) {
            addUser = false;
            regMessage.innerText = 'The dog already excists';
            break;
        }
    }
    //Om newUsername och userName.name inte är samma skapas en ny användare.
    //Här kollas även om lösenordet matchar varandra.
    if (addUser && password.value == confirmPassword.value) {
        const UserToAdd = {
            bio: bio.value,
            img: image.value,
            name: name.value,
            password: password.value,
        };
        const newKey = (0, database_1.push)(dbRef).key;
        const newUser = {};
        newUser[newKey] = UserToAdd;
        (0, database_1.update)(dbRef, newUser);
        regMessage.innerText = 'New Dog is created!';
        //Felmeddelande ifall lösenorden inte är samma.
    }
    else if (addUser && password.value != confirmPassword.value) {
        regMessage.innerText = 'Password not matching';
    }
}
exports.createUser = createUser;
