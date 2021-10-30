const inpUtilisateur = document.querySelector('.form-groupe:nth-child(1) input');
const inpMail = document.querySelector('.form-groupe:nth-child(2) input');
const inpMdp = document.querySelector('.form-groupe:nth-child(3) input');
const inpConfirme = document.querySelector('.form-groupe:nth-child(4) input');

const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');

//vérif nom d'utilisateur
inpUtilisateur.addEventListener('input', (e) => {
    if(e.target.value.length >= 3) {
        //sup à 3 caractères, on affiche l'image check en inline et on retire le span
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    } 
    else {
        //ing à 3, on change l'image présente et on met le message d'erreur
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }
})

//vérif email
inpMail.addEventListener('input', (e) => {
    //regex pour vérifier un mail
    const regexEmail = /\S+@\S+\.\S+/;

    if(e.target.value.search(regexEmail) === 0)
    //0 si ça correspond car 0 est égal au début de la valeur rentrée, -1 si c'est inccorect 
    {
    allImg[1].style.display = "inline";
    allImg[1].src = "ressources/check.svg";
    allSpan[1].style.display = "none";  
    } else if(e.target.value.search(regexEmail) === -1){
    allImg[1].style.display = "inline";
    allImg[1].src = "ressources/error.svg";
    allSpan[1].style.display = "inline";
    }
})

//vérif création mot de passe

let valeurInp;
//déclaré ici car sera utilisé dans 2 blocs diff

//regex pour tout ce qui n'est PAS caractère normal = englobe donc les spéciaux
const specialCar = /[^a-zA-Z0-9]/;

const alphabet = /[a-z]/i;
const chiffres = /[0-9]/;

let objValidation = {
    symbole : 0,
    lettre : 0,
    chiffre : 0
}

//calcul pour chaque caractère du mdp
inpMdp.addEventListener('input', (e) => {
    valeurInp = e.target.value;

    if(valeurInp.search(specialCar) !== -1){
        objValidation.symbole = 1;
    }
    if(valeurInp.search(alphabet) !== -1){
        objValidation.lettre = 1;
    }
    if(valeurInp.search(chiffres) !== -1){
        objValidation.chiffre = 1;
    }

    //calcul inversé si suppression d'un caractère
    if(e.inputType = 'deleteContentBackward'){
        if(valeurInp.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if(valeurInp.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if(valeurInp.search(chiffres) === -1){
            objValidation.chiffre = 0;
        }
    }

    //calcul de tous les caractères rentrés avec un minimum de 3, 1 pour chaque propriété
    let testAll = 0;
    for(const property in objValidation){
        if(objValidation[property] > 0){
            testAll++;
        }
    }
    if(testAll < 3){
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.svg";
        allSpan[2].style.display = "inline";
    } else {
        allImg[2].src = "ressources/check.svg";
        allSpan[2].style.display = "none";  
    }

    //vérif de la force du mdp
    if(valeurInp.length <= 6 && valeurInp.length > 0){
        allLigne[0].style.display ='block';
        allLigne[1].style.display ='none';
        allLigne[2].style.display ='none';
    }
    else if(valeurInp.length > 6 && valeurInp.length <= 9){
        allLigne[0].style.display ='block';
        allLigne[1].style.display ='block';
        allLigne[2].style.display ='none';
    }
    else if(valeurInp.length > 9){
        allLigne[0].style.display ='block';
        allLigne[1].style.display ='block';
        allLigne[2].style.display ='block';
    }
    else if(valeurInp.length === 0){
        allLigne[0].style.display ='none';
        allLigne[1].style.display ='none';
        allLigne[2].style.display ='none';
    }
})

// confirmation du mdp
inpConfirme.addEventListener('input', (e) => {
    if(e.target.value.length === 0){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
    else if(e.target.value === valeurInp){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.svg";
    } 
    else {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
})