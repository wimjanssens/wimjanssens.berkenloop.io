addEventListener('load', init)
var richting="normaal";
function init() {

    console.log("init");
    printPagina();


}

class Product{
    constructor(titel,bestand,prijs) {
        this.titel = titel;
        this.bestand = bestand;
        this.prijs= prijs;
    }
    maakHTMLProduct(){
        /*return "<p>test</p>";*/
        return "<section><h4>"+ this.titel+"</h4><img src=\"../media/product_klein/" +this.bestand + "\" alt=\"" + this.titel + "\" /><p>&euro; "+ this.prijs + "</p></section>";
    }

}

class Categorie{
    constructor(categorie){
        this.i = categorie;
        /*this.richting = richting;*/
    }

    maakHTMLCategorie(){
        let htmlStringCat = "";
        let t;
        let einde;
        let stap;

        htmlStringCat += "<section><h3 id=\"" + categorieArray[this.i][1] + "\">" + categorieArray[this.i][2] + "</h3>";


        if (richting==="normaal"){
            t = 0;
            einde = productArray.length;
            stap = +1;
        }
        else{
            t = productArray.length-1;
            einde = -1;
            stap = -1;
        }

        for (; t !== einde;t += stap){

            if ( +productArray[t][0] === +(this.i)+1){
                console.log("if ok Categorie");
                let product = new Product(productArray[t][1],productArray[t][2],productArray[t][3]);
                htmlStringCat += product.maakHTMLProduct();
            }

        }

        htmlStringCat += "</section>"
        return htmlStringCat;
    }
}

function printPagina(){
    let i = +0;
    let einde = categorieArray.length;
    let mainElement = document.querySelector("#mainProduct");

    console.log("printPagina");

    let htmlString = "";
    htmlString = "<a class=\"knop2dynamic\" href=\"product_static.html\">Statische productpagina</a>\n" +
                "<a class=\"knop2dynamic\" id=\"knopSorteer\" >Omgekeerd sorteren</a>\n" +
                "    <article class=\"producten\">" +
                "        <h2>Overzicht producten</h2>";

    if (richting==="normaal"){
        i = 0;
        einde = categorieArray.length;
        stap = +1;
    }
    else{
        i = categorieArray.length-1;
        einde = -1;
        stap = -1;
    }

    for (; i !== einde ; i += stap){
        console.log("for print");
        let categorie = new Categorie(i);
        htmlString += categorie.maakHTMLCategorie();

    }
    mainElement.innerHTML=htmlString;
    document.querySelector("#knopSorteer").addEventListener('click', sorteer);
}

function sorteer(){
    if (richting ==="normaal"){
        richting ="omgekeerd";
    }
    else{
        richting= "normaal";
    }
    printPagina();
}