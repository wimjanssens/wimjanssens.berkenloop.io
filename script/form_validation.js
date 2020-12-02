addEventListener('load', init)

function init() {
    let achternaamveld = document.querySelector("#achternaam");
    let emailveld = document.querySelector("#email");
    let formulier = document.querySelector("#form_pers");
    let artikel = document.querySelector("#artikel");

    laatFotoZien();

    achternaamveld.style.backgroundColor = "yellow";
    emailveld.style.backgroundColor = "orange";
    achternaamveld.addEventListener('keyup', valideerAchternaam);
    emailveld.addEventListener('blur', valideerEmail);
    formulier.addEventListener('submit', valideer);
    artikel.addEventListener('change', laatFotoZien);
}

function valideerAchternaam(){
    let naam = document.querySelector("#achternaam").value;
    let naamFeedback = document.querySelector("#foutachternaam");
    if (naam.length >=5){
        naamFeedback.innerHTML="";
        return true;
    }
    else{
        naamFeedback.innerHTML="Je ingevoerde waarde is kleiner is dan 5 tekens.";
        naamFeedback.style.color="red";
        return false;
    }
    /*document.querySelector("#achternaam").style.backgroundColor = "yellow";*/
}

function valideerEmail(){
    let email = document.querySelector("#email").value;
    let emailFeedback = document.querySelector("#foutemail");
    const patroonEmail = /^[\w-]+\.[\w-.]+@(student\.)?(kdg\.be)$/i

    if (patroonEmail.test(email)){
        emailFeedback.innerHTML="";
        return true;
    }
    else{
        emailFeedback.innerHTML="Je ingevoerde e-mail behoort niet tot het KdG domein.";
        emailFeedback.style.color="red";
        return false;
    }

}
function valideer(event){
    let naamOk = valideerAchternaam();
    let emailOk = valideerEmail();
    let foutKnop = document.querySelector("#foutVerzendKnop");

    if (!naamOk || !emailOk){
        foutKnop.style.color="red";
        foutKnop.innerHTML="Niet alle velden zijn correct ingevuld.";
        event.preventDefault();
    }

}

function laatFotoZien(){
    let fotoArray = [   ["shirt1","pr_s_m_cas_1_kl.jpg","Castelli pro korte mouwen heren"],
                        ["shirt2","pr_s_m_sf_2_kl.jpg","Sportful Monocrom Fietsshirt Korte Mouwen Zwart Heren"],
                        ["shirt3","pr_s_w_sf_1_kl.jpg","Sportful Diva Fietsshirt Korte Mouwen Blauw Dames"],
                        ["shirt4","pr_s_k_nw_1_kl.jpg","Northwave Origin Jersey Korte Mouwen Junior - Blauw Oranje"],
                        ["muts","pr_pr_acc4.jpg","Muts"]]

    let artikel = document.querySelector("#artikel").value;
    let image = document.querySelector("#fotoform");
    console.log("artikel = " + artikel)

    for (let i=0 ; i<fotoArray.length;i++){
        if (fotoArray[i][0] === artikel){
            image.src = "../media/product_klein/" + fotoArray[i][1];
            image.alt = "../media/product_klein/" + fotoArray[i][2];
        }
    }
}
