<?php
// ON RECUPERE LES INFOS DU FORMULAIRE
// ET ENSUITE ON VA LES STOCKER DANS LA TABLE SQL blog
$devoir         = $_REQUEST["devoir"] ?? "";
$dateDevoir     = $_REQUEST["dateDevoir"] ?? "";
$description    = $_REQUEST["description"] ?? "";
$matiere        = $_REQUEST["matiere"] ?? "";
$fait           = $_REQUEST["fait"] ?? "";
// appeler ma fonction pour insérer une ligne dans la table SQL blog
// ON VA CHARGER LE CODE DES FONCTIONS
require "php/mes-fonctions.php";
// ensuite je peux appeler mes fonctions
insererLigneTable("devoirs", [
    "devoir"       => $devoir,
    "dateDevoir"   => $dateDevoir,
    "description"  => $description,
    "matiere"      => $matiere,
    "fait"         => $fait,
]);
// message de confirmation pour l'utilisateur
$confirmation = "devoir ajouté ($devoir)";
// en plus, on va fournir la liste des articles publiés
$tabBlog = lireTable("devoirs");
// je rajoute le tableau dans la réponse à envoyer au navigateur
$tabAssoJson["tabBlog"] = $tabBlog; 