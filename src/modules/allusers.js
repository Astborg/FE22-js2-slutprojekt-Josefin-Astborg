"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAllUsersFunction = void 0;
const database_1 = require("firebase/database");
const firebaseApp_1 = require("../modules/firebaseApp");
//Funktion för att visa alla användare och deras Bio
function showAllUsersFunction() {
    const dbRef = (0, database_1.ref)(firebaseApp_1.db, '/User');
    let user = [];
    let userData;
    (0, database_1.onValue)(dbRef, snapshot => {
        userData = snapshot.val();
        const userNames = Object.values(userData);
        const userContainer = document.getElementById('anyUserContainer');
        userContainer.innerText = "";
        for (let i = 0; i < userNames.length; i++) {
            let alluserBtn = document.createElement('button');
            alluserBtn.setAttribute('id', 'btn' + [i]);
            alluserBtn.innerText = userNames[i].name;
            userContainer.appendChild(alluserBtn);
            const specificUersBtn = document.getElementById('btn' + [i]);
            specificUersBtn.addEventListener('click', () => {
                const showNameP = document.getElementById('showNameP');
                const showImgP = document.querySelector('#showImgP');
                const showBioP = document.getElementById('showBioP');
                showNameP.innerHTML = userNames[i].name;
                showImgP.src = userNames[i].img;
                showBioP.innerHTML = userNames[i].bio;
            });
        }
        ;
    });
}
exports.showAllUsersFunction = showAllUsersFunction;
;
