<?php
// ON RECUPERE LES INFOS DU FORMULAIRE
// ET ENSUITE ON VA LES STOCKER DANS LA TABLE SQL blog
$id              = $_REQUEST["id"] ?? "";
$nomTable        = $_REQUEST["nomTable"] ?? "";
$filtre            =$_REQUEST['filtre'] ?? "";
// appeler ma fonction pour insérer une ligne dans la table SQL blog
// ON VA CHARGER LE CODE DES FONCTIONS
require "php/mes-fonctions.php";
// ensuite je peux appeler mes fonctions
supprimerLigne($nomTable, $id);
// message de confirmation pour l'utilisateur
$confirmation = "devoir supprimé ($id)";

if($filtre == 'pasFait') {
    $tabBlog = lireTable("devoirs", "fait", "0");
} elseif($filtre == 'dejaFait') {
    $tabBlog = lireTable("devoirs", "fait", "1");
} else {
    $tabBlog = lireTable("devoirs");
}
// en plus, on va fournir la liste des articles publiés
// je rajoute le tableau dans la réponse à envoyer au navigateur
$tabAssoJson["tabBlog"] = $tabBlog; 