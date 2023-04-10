import { db } from "./firebaseapp";
import { ref, remove, update } from "firebase/database";


//Döljer Div:arna som innehåller all info i DOMen
const bioContainer = document.getElementById('bioContainer');
bioContainer.style.display = "none";
const editDiv = document.getElementById('editDiv');
editDiv.style.display = 'none';
const editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', ()=>{
    editDiv.style.display = 'block';
});

//Tar fram infon från firebase och loggar i BioContainern / DOM, via User.ts
function userBio(userName: string, myBio: string, thisImg: string, id: string): void {

    const myUserBioDiv: HTMLElement = document.getElementById('bioInfo');
    const userNameDiv: HTMLElement = document.getElementById('userNameDiv');
    const imgDiv: HTMLElement = document.getElementById('imgDiv');

    //Create Image 
    let myImg = document.createElement('img');
    myImg.src = thisImg;
    myImg.setAttribute('id', 'myImages');
    imgDiv.appendChild(myImg);

    userNameDiv.innerHTML = `Username: ${userName}`;
    myUserBioDiv.innerHTML = 'About User: ' + myBio;

    //Remove button 
    const removeBtn = document.getElementById('deleteButton');
    removeBtn.addEventListener('click', () => {
        alert('Detta går inte att få ogjort! Vänligen skapa en ny användare om du vill fortsätta göra inlägg');
        const deleteTheUser = ref(db, '/User/' + id);
        remove(deleteTheUser);
        location.reload();
    });
};
// Slut på UserBio()


//funktion för att visa Infosidan
function showYourInfoFunction() {
    const bioContainer = document.getElementById('bioContainer');
    bioContainer.style.display = "flex";
}

//Funktion för att dölja infosidan
function hideYourInfoFunction() {
    const bioContainer = document.getElementById('bioContainer');
    bioContainer.style.display = "none";
}



//Edit button :

function updateUser(userName: string, myBio: string, thisImg: string, id: string, myPassword: string) {
    const removeBtn = document.getElementById('deleteUser');

    const theEditBtn = document.getElementById('editButton');
    const newColorInput: any = document.getElementById('editColor');
    const newPasswordInput: any = document.getElementById('editPassword');
    const newBioInput: any = document.getElementById('bioInformation');
    const newPasswordConfirmInput: any = document.getElementById('confirmChangePassword');
    const newImageInput: any = document.getElementById('changeImg');

    document.getElementById('changeInfo').innerHTML=`Hej ${userName}, här kan du ändra Din info:`;

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
        let newImg:any;
        if (myNewImg =='current'){
            newImg = thisImg
        }
        else {
            newImg = newImageInput.value
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
            }

            const updateAll = {};
            updateAll[id + '/'] = updateAllObject;

            const dbRefUpdate = ref(db, '/User/');

            update(dbRefUpdate, updateAll);
        };
    });
};

export { userBio, showYourInfoFunction, hideYourInfoFunction, updateUser }