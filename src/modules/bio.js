"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.hideYourInfoFunction = exports.showYourInfoFunction = exports.userBio = void 0;
const firebaseapp_1 = require("./firebaseapp");
const database_1 = require("firebase/database");
//Döljer Div:arna som innehåller all info i DOMen
const bioContainer = document.getElementById('bioContainer');
bioContainer.style.display = "none";
const editDiv = document.getElementById('editDiv');
editDiv.style.display = 'none';
const editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', () => {
    editDiv.style.display = 'block';
});
//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName, myBio, thisImg, id) {
    const myUserBioDiv = document.getElementById('bioInfo');
    const userNameDiv = document.getElementById('userNameDiv');
    const imgDiv = document.getElementById('imgDiv');
    //Create Image 
    let myImg = document.createElement('img');
    myImg.src = thisImg;
    myImg.setAttribute('id', 'myImages');
    imgDiv.appendChild(myImg);
    userNameDiv.innerHTML = `Användarnamn: ${userName}`;
    myUserBioDiv.innerHTML = 'Information om användare: ' + myBio;
    //Remove button 
    const removeBtn = document.getElementById('deleteButton');
    removeBtn.addEventListener('click', () => {
        alert('Detta går inte att få ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg');
        const deleteTheUser = (0, database_1.ref)(firebaseapp_1.db, '/User/' + id);
        (0, database_1.remove)(deleteTheUser);
        location.reload();
    });
}
exports.userBio = userBio;
;
// Slut på UserBio()
//funktion för att visa Infosidan
function showYourInfoFunction() {
    const bioContainer = document.getElementById('bioContainer');
    bioContainer.style.display = "flex";
}
exports.showYourInfoFunction = showYourInfoFunction;
//Funktion för att dölja infosidan
function hideYourInfoFunction() {
    const bioContainer = document.getElementById('bioContainer');
    bioContainer.style.display = "none";
}
exports.hideYourInfoFunction = hideYourInfoFunction;
//Edit button :
function updateUser(userName, myBio, thisImg, id, myPassword) {
    const removeBtn = document.getElementById('deleteUser');
    const theEditBtn = document.getElementById('editButton');
    const newColorInput = document.getElementById('editColor');
    const newPasswordInput = document.getElementById('editPassword');
    const newBioInput = document.getElementById('bioInformation');
    const newPasswordConfirmInput = document.getElementById('confirmChangePassword');
    const newImageInput = document.getElementById('changeImg');
    document.getElementById('changeInfo').innerHTML = `Hej ${userName}, här kan du ändra Din info:`;
    newPasswordInput.setAttribute('value', myPassword);
    newPasswordInput.setAttribute('placeholder', myPassword);
    newBioInput.setAttribute('value', myBio);
    newBioInput.setAttribute('placeholder', myBio);
    newPasswordConfirmInput.setAttribute('value', myPassword);
    newPasswordConfirmInput.setAttribute('placeholder', myPassword);
    newImageInput.setAttribute('value', thisImg);
    newImageInput.setAttribute('placeholder', thisImg);
    //Editbutton på ändra information sidan
    theEditBtn.addEventListener('click', e => {
        e.preventDefault;
        const newColor = newColorInput.value;
        const newPassword = newPasswordInput.value;
        const newPasswordConfirm = newPasswordConfirmInput.value;
        const newBio = newBioInput.value;
        let myNewImg = newImageInput.value;
        let newImg;
        if (myNewImg == 'current') {
            newImg = thisImg;
        }
        else {
            newImg = newImageInput.value;
        }
        if (newPassword != newPasswordConfirm) {
            alert('vafan gör du, skriv samma på båda!!! Nu blir du utloggad!!');
            location.reload;
        }
        else {
            const updateAllObject = {
                name: userName,
                color: newColor,
                bio: newBio,
                password: newPassword,
                img: newImg
            };
            const updateAll = {};
            updateAll[id + '/'] = updateAllObject;
            const dbRefUpdate = (0, database_1.ref)(firebaseapp_1.db, '/User/');
            (0, database_1.update)(dbRefUpdate, updateAll);
        }
        ;
    });
}
exports.updateUser = updateUser;
;
