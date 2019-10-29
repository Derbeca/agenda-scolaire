console.log('code JS chargé');

// CREER DES FONCTIONS POUR SE SIMPLIFIER LA VIE
// utilisation
// ajouterAction('button.delete', 'click', function(){ });
function ajouterAction (selecteurCSS, evenement, fonctionCallback)
{
    // recuperer la liste des balises à sélectionner
    // ajouter pour chaque balise un event listener
    var listeBalise = document.querySelectorAll(selecteurCSS);
    listeBalise.forEach(function(balise, indice){
        balise.addEventListener(evenement, fonctionCallback);
    });
}

// on peut créer une fonction qui va prendre en paramètre un objet formData
// et qui va envoyer une requête ajax
// et qui va appeler une fonction de callback pour gérer un objet JSON
function envoyerRequeteAjax (formData, fonctionCallback)
{
    fetch('api-json.php', {
        method: 'POST',
        body: formData
    })
    .then(function(reponseServeur) { 
        return reponseServeur.json();
    })
    .then(fonctionCallback);
}


function envoyerFormulaireAjax (event)
{
    // this
    // => une variable spéciale de JS
    // => elle a comme valeur this = element

    // bloque le formulaire
    event.preventDefault();
    // console.log('formulaire bloqué');

    // cool: je ne change plus de page
    // pas cool: je n'envoie plus les informations
    // => on va ajouter un appel à fetch
    // => permet d'envoyer un requête AJAX sans changer de page

    // avant d'envoyer la requête ajax
    // on va récuperer les infos remplies dans le formulaire
    console.log(this);
    // aspire les infos du formulaire
    var formData = new FormData(this);  // Programmation Orientée Objet
    // on va envoyer ces infos avec le fetch

    envoyerRequeteAjax(formData, (objetJS) => {
        // en utilisant une fonction fléchée
        // => avantage: je garde le this d'avant
        // cool: je peux manipuler un objet JS
        console.log(objetJS);
        if (objetJS.confirmation)
        {
            // je vais copier la valeur dans la balise div.confirmation
            console.log(this); // balise form     
            // dans ma balise form je vais chercher la balise div.confirmation
            this.querySelector(".confirmation").innerHTML = objetJS.confirmation;
        }

        if (objetJS.tabBlog)
        {
            // la fonction va créer le HTML pour afficher les articles
            creerHtmlBlog(objetJS.tabBlog);
        }
    });

}

ajouterAction('form.ajax', 'submit', envoyerFormulaireAjax);


var tabBlogUpdate = [];
function creerHtmlBlog (tabBlog)
{
    
    // mémoriser le tableau pour le update
    tabBlogUpdate = tabBlog;

    // vider la liste avant de la mettre à jour
    // insérer le code HTML dans la balise div.listeDevoir
    var listeDevEleve = document.querySelector("div.listeDevoir");
    
    // si il n'y a pas cette balise, alors on ne fait rien
    if (listeDevEleve == null) return;

    listeDevEleve.innerHTML = '';


    // parcourir le tableau
    tabBlog.forEach(function(article, indice){
        // je vais construire le HTML

        if(article.fait == 0){
            faitImg = 'assets/images/pasFait.png';
        } else {
            faitImg = 'assets/images/fait.png';
        }

        var codeHtmlArticle = `
            <div class="devoir liste">
                <h3>${article.devoir}</h3>
                <h4>${article.dateDevoir}</h4>
                <p>${article.description}</p>
                <h4>${article.matiere}</h4>
                <img src="${faitImg}">
                <div class="boutons">
                    <button class="delete" data-id="${article.id}" id="delete-${article.id}">SUPPRIMER</button>
                    <button class="update" data-indice="${indice}" data-id="${article.id}" id="update-${article.id}">MODIFIER</button>
                </div
                <div class="confirmation"></div>
            </div>
        `;

        listeDevEleve.insertAdjacentHTML('beforeend', codeHtmlArticle);

    });
    console.log('toto');
    ajouterAction('.listeDevoir .delete', 'click', supprimerArticle);
    ajouterAction('.listeDevoir .update', 'click', modifierArticle);
}


function modifierArticle (event)
{
    console.log('tu as cliqué');
    console.log(this);  // this donne le bouton sur lequel on a cliqué


    // on va afficher la section.section-update
    var sectionUpdate = document.querySelector(".section-update");
    var sectionCreate = document.querySelector(".section-create");
    // on va ajouter la classe .afficher
    sectionUpdate.classList.add("afficher");
    sectionCreate.classList.remove("afficher");

    // je vais pré-remplir le formulaire de update 
    // avec les infos de l'article dans le tableau
    // je vais récupérer data-indice
    var indice = this.getAttribute("data-indice");
    console.log(indice);
    
    // je vais utiliser l'indice pour retrouver l'élément dans le tableau
    var article = tabBlogUpdate[indice];
    // debug
    console.log(article);

    // je vais pré-remplir les champs du formulaire d'update
    // id
    var inputId = document.querySelector('.section-update input[name=id]');
    inputId.value = article.id;
    // titre
    var inputDevoir = document.querySelector('.section-update input[name=devoir]');
    inputDevoir.value = article.devoir;
    // contenu
    var inputDateDevoir = document.querySelector('.section-update input[name=dateDevoir]');
    inputDateDevoir.value = article.dateDevoir;
    // photo
    var inputDescription = document.querySelector('.section-update textarea[name=description]');
    inputDescription.value = article.description;
    // datePublication
    var inputMatiere = document.querySelector('.section-update input[name=matiere]');
    inputMatiere.value = article.matiere;
    // photo
    var inputFait = document.querySelector('.section-update input.fait');
    var inputPasFait = document.querySelector('.section-update input.pasFait');
    if (article.fait == 1)
    {
        inputFait.checked = true;
        inputPasFait.checked = false;
    }
    else
    {
        inputFait.checked = false;
        inputPasFait.checked = true;
    }


}
ajouterAction('.listeDevEleve button.update', 'click', modifierArticle);

function supprimerArticle (event)
{
    // debug 
    console.log('tu as cliqué');
    console.log(this);  // this donne le bouton sur lequel on a cliqué

    // il faudrait pour pouvoir lancer la requête ajax
    // que je puisse retrouver id de la ligne à supprimer
    // on a préparé le HTML pour retrouver id dans l'attribut data-id
    var idLigne = this.getAttribute("data-id");
    console.log(idLigne);
    
    // on va envoyer une requête ajax vers api-json.php
    // et on va demander à supprimer cette ligne
    var formData = new FormData();
    // en JS, je remplis les infos nécessaires pour traiter le formulaire
    // https://developer.mozilla.org/fr/docs/Web/API/FormData/append#Syntaxe
    formData.append("idForm", "supprimer");
    formData.append("nomTable", "devoirs");
    formData.append("id", idLigne);

    envoyerRequeteAjax(formData, (objetJS) => {
        // en utilisant une fonction fléchée
        // => avantage: je garde le this d'avant
        // cool: je peux manipuler un objet JS
        console.log(objetJS);

        if (objetJS.tabBlog)
        {
            // la fonction va créer le HTML pour afficher les articles
            creerHtmlBlog(objetJS.tabBlog);
        }
    });

}
ajouterAction('.listeDevEleve .delete', 'click', supprimerArticle);




// je veux récupérer la liste des articles
// dès le chargement de la page
// on va envoyer une requête ajax
// et récupérer la liste des articles
function chargerListeArticle ()
{
    console.log("chargerListeArticle");

    var filtre = document.querySelector('div.listeDevEleve input[name=filtre]').value;
    // on va envoyer une requête ajax vers api-json.php
    // et on va demander à supprimer cette ligne
    var formData = new FormData();
    // en JS, je remplis les infos nécessaires pour traiter le formulaire
    // https://developer.mozilla.org/fr/docs/Web/API/FormData/append#Syntaxe
    formData.append("idForm", "supprimer");
    formData.append("nomTable", "devoirs");
    formData.append("id", 0);   // on triche car id n'est jamais égal à 0
    formData.append("filtre", filtre);

    


    envoyerRequeteAjax(formData, (objetJS) => {
        // en utilisant une fonction fléchée
        // => avantage: je garde le this d'avant
        // cool: je peux manipuler un objet JS
        console.log(objetJS);

        if (objetJS.tabBlog)
        {
            // la fonction va créer le HTML pour afficher les articles
            creerHtmlBlog(objetJS.tabBlog);
        }
    });

}

// appeler la fonction pour activer le code
chargerListeArticle();



function afficherFormAjouter () {
    var sectionCreate = document.querySelector('.section-create');
    var sectionUpdate = document.querySelector('.section-update');
    var sectionListe = document.querySelector('.section-liste');
    sectionCreate.classList.add('afficher');
    sectionUpdate.classList.remove('afficher');
    sectionListe.classList.remove('afficher');
}
ajouterAction('#plus', 'click', afficherFormAjouter);

function afficherListe () {
    var sectionCreate = document.querySelector('.section-create');
    var sectionUpdate = document.querySelector('.section-update');
    var sectionListe = document.querySelector('.section-liste');
    sectionCreate.classList.remove('afficher');
    sectionUpdate.classList.remove('afficher');
    sectionListe.classList.add('afficher');
}
ajouterAction('#devoirs', 'click', afficherListe);

