# World Where 3

## Introduction

Ce projet vise à informer de la situation courante entre l'Ukraine et la Russie.
Toutes les heures, le serveur récupère les 10 000 derniers tweets en lien avec le sujet, et en extrait les entités pour tenter de quantifier les actualités.

## Dépendances
- API de Twitter : https://developer.twitter.com/en/docs
- Stanford NER (pour reconnaître les entités) : https://nlp.stanford.edu/software/CRF-NER.html

## Installation
- Télécharger le projet
- Créer un fichier `TWITTER_KEY.json` dans le dossier `/access` contenant le champ suivant avec le token de l'API Twitter
```
{
    "bearer_token": "token"
}
```
- Ouvrir un terminal et lancer les commandes suivantes
```
chmod 777 scripts/*
npm run ner-install
```
Cela devrait lancer l'installation du NER
- Lancer le projet avec :
```
npm start
```
