addEventListener('load', printOverzicht)


function haalParameterWaarde(name){
    let queryString = decodeURIComponent(window.location.search.slice(1));
    let parameters = queryString.split("&");
    let value ="";

    for (let i=0; i < parameters.length;i++ ){
        let parts = parameters[i].split("=");
        if (parts[0] === name){
            value = parts[1];
            break;
        }
    }
    return value.replace(/\+/g," ");
}

function printOverzicht(){
    let parameterNamen =[["artikel","Artikel"],
                        ["maat","Maat"],
                        ["lijn","Tekstlijn (&euro;10)"],
                        ["lijngrootte","Lettergrootte"],
                        ["tekstkleur","Tekstkleur"],
                        ["logoupload","Eigen Logo (&euro;10)"],
                        ["aantal","Aantal"],
                        ["voornaam","Voornaam"],
                        ["achternaam","Achternaam"],
                        ["adres","Adres"],
                        ["email","Emailadres"]];
    let artikelArray =[ ["shirt1","Castelli Pro mannen (&euro;100)",100],
                        ["shirt2","Sportful Mono mannen (&euro;70)",70],
                        ["shirt3","Sportful Diva vrouwen (&euro;59)",59],
                        ["shirt4","NW Kids (&euro;40)",40],
                        ["muts","Muts (&euro;28)",28]];
    let htmlString ="";
    let tabel = document.querySelector("#overzichtBestelling");
    let parameterWaarde ="";
    let bedrag =0;

    for (let i=0 ; i < parameterNamen.length; i++){
        //Artikel opzoeken in tabel
        if (parameterNamen[i][0] === "artikel"){
            for (let j=0 ; j<artikelArray.length;j++){
                if (haalParameterWaarde(parameterNamen[i][0]) === artikelArray[j][0]){
                    parameterWaarde = artikelArray[j][1];
                    bedrag+=artikelArray[j][2];
                    laatFotoZien2(artikelArray[j][0]);
                }
            }
        }
        //Is er een tekstlijn?
        else if (parameterNamen[i][0] === "lijn"){
            if (haalParameterWaarde(parameterNamen[i][0]) ===""){
                for (let t=0 ; t<3;t++) {
                    htmlString += "<tr><td>" + parameterNamen[i][1] + ":</td><td></td>";
                    i++;
                }
                continue;
            }
            else{
                parameterWaarde = haalParameterWaarde(parameterNamen[i][0]);
                bedrag+=10;
            }

        }
        else if (parameterNamen[i][0] === "tekstkleur"){
            parameterWaarde = "<div id=\"vierkantje\" style=\"background-color:"+haalParameterWaarde(parameterNamen[i][0]) + " \"></div>";
        }
        else{
            parameterWaarde = haalParameterWaarde(parameterNamen[i][0]);
        }
        if (parameterNamen[i][0] ==="logoupload" && haalParameterWaarde(parameterNamen[i][0]) !==""){
            bedrag +=10;
        }
        if (parameterNamen[i][0] ==="aantal"){
            bedrag = bedrag * haalParameterWaarde(parameterNamen[i][0]);
        }

        htmlString += "<tr><td>"+ parameterNamen[i][1] + ":</td><td>" + parameterWaarde +"</td>";

    }
    htmlString += "<tr><td>Totaal bedrag:</td><td>"+ bedrag +"</td>";
    tabel.innerHTML= htmlString;
    console.log("test");

}
function laatFotoZien2(artikel){
    let fotoArray = [   ["shirt1","pr_s_m_cas_1_kl.jpg","Castelli pro korte mouwen heren"],
        ["shirt2","pr_s_m_sf_2_kl.jpg","Sportful Monocrom Fietsshirt Korte Mouwen Zwart Heren"],
        ["shirt3","pr_s_w_sf_1_kl.jpg","Sportful Diva Fietsshirt Korte Mouwen Blauw Dames"],
        ["shirt4","pr_s_k_nw_1_kl.jpg","Northwave Origin Jersey Korte Mouwen Junior - Blauw Oranje"],
        ["muts","pr_pr_acc4.jpg","Muts"]]

    let image = document.querySelector("#fotobev");
    console.log("artikel = " + artikel)

    for (let i=0 ; i<fotoArray.length;i++){
        if (fotoArray[i][0] === artikel){
            image.src = "../media/product_klein/" + fotoArray[i][1];
            image.alt = "../media/product_klein/" + fotoArray[i][2];
        }
    }
}
