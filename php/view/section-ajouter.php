    <div class="flex"> <!-- FORMULAIRE AJOUTER DEVOIR-->
        <section class="section-create">
        <h3>AJOUTER DEVOIR</h3>
            <form method="POST" action="api-json.php" class="ajax">
                <label>
                    DEVOIR
                    <input type="text" name="devoir" placeholder="entre ton devoir"> 
                </label>
                <label>
                    DATE DE REMISE DU DEVOIR
                    <input type="date" name="dateDevoir"> 
                </label>
                <label>
                    DESCRIPTION
                    <textarea name="description" placeholder="entre la description"></textarea>
                </label>
                <label>
                    MATIÈRE
                    <input type="text" name="matiere" placeholder="entre la matière"> 
                </label>
                <div id="btn-radio">
                    <p>FAIT</p><input type="radio" name="fait" value="1">
                    <p>PAS FAIT</p><input type="radio" name="fait" value="0">
                </div>
                <button type="submit">AJOUTER DEVOIR</button>
                <div class="confirmation">
                    <!-- ICI ON AFFICHERA LE MESSAGE DE CONFIRMATION -->
                </div>
                <input type="hidden" name="idForm" value="ajouter">
            </form>
        </section>

        
        <!-- FORMULAIRE MODIFIER DEVOIR-->
        <section class="section-update">
        <h3>MODIFIER DEVOIR</h3>
            <form method="POST" action="api-json.php" class="ajax">
                <label>
                    <p>id</p>
                    <input type="text"  name="id" required placeholder="entrez id">
                </label>
                <label>
                    DEVOIR
                    <input type="text" name="devoir" placeholder="entre ton devoir"> 
                </label>
                <label>
                    DATE DE REMISE DU DEVOIR
                    <input type="date" name="dateDevoir"> 
                </label>
                <label>
                    DESCRIPTION
                    <textarea name="description" placeholder="entre la description"></textarea>
                </label>
                <label>
                    MATIÈRE
                    <input type="text" name="matiere" placeholder="entre la matière"> 
                </label>
                <div id="btn-radio">
                    <p>FAIT</p><input class="fait" type="radio" name="fait" value="1">
                    <p>PAS FAIT</p><input class="pasFait" type="radio" name="fait" value="0">
                </div>
                <button type="submit">MODIFIER DEVOIR</button>
                <div class="confirmation">
                    <!-- ICI ON AFFICHERA LE MESSAGE DE CONFIRMATION -->
                </div>
                <input type="hidden" name="idForm" value="modifier">
            </form>
        </section>

        <section class="section-liste afficher">
            <h3>LISTE DEVOIRS</h3>
            <div class="listeDevoir"><!--container pour Flexbox -->
<?php
// ON VA AFFICHER LA LISTE DES ARTICLES
// etape1: il faut charger mes fonctions
require_once "php/mes-fonctions.php";
// etape2: on appelle la fonction
// je ne veux que les lignes dans la catégorie blog
// parametre1: "blog" est le nom de la table SQL
// parametre2: "categorie" est le nom de la colonne SQL dans la table blog
// parametre3: "blog" est la valeur de sélection de la colonne "catégorie"
$tabArticle = lireTable("devoirs");
// SSR Server Side Rendering
// On crée le code HTML avec PHP
// => le navbigateur reçoit directement le code HTML
// => google référence mieux ce contenu
// on fait une boucle pour parcourir la liste des articles
foreach($tabArticle as $ligneAsso)
{
    $devoir      = $ligneAsso["devoir"];
    $dateDevoir  = $ligneAsso["dateDevoir"];
    $description = $ligneAsso["description"];
    $matiere     = $ligneAsso["matiere"];
    $fait        = $ligneAsso["fait"];
    $id          = $ligneAsso["id"];

    if($fait == 0){
        $faitImg = 'assets/images/pasFait.png';
    } else {
        $faitImg = 'assets/images/fait.png';
    }
    echo
<<<CODEHTML
    <div class="devoir listeDevEleve">
        <h3>$devoir</h3>
        <h4>$dateDevoir</h4>
        <p>$description</p>
        <p>$matiere</p>
        <img src="$faitImg">
        <div class="boutons">
            <button class="delete" data-id="$id" id="delete-$id">SUPPRIMER</button>
            <button class="update" data-id="$id" id="update-$id">MODIFIER</button>
            <input type="hidden" name="filtre" value="toto">
        </div>
        <div class="confirmation"></div>
    </div>
CODEHTML;
}
?>
            </div>
        </section>
</div>

