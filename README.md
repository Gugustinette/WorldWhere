# World Where 3

## Introduction

Ce projet vise à informer de la situation courante entre l'Ukraine et la Russie.
Toutes les 30 secondes, le serveur récupère les 20 tweets récents en lien avec le sujet, et en extrait les entités pour tenter de quantifier les actualités.

## Ressources
- API de Twitter : https://developer.twitter.com/en/docs
- Stanford NER (pour reconnaître les entités) : https://nlp.stanford.edu/software/CRF-NER.html

## Pré-requis
- <a href="https://www.java.com">Java</a>
- <a href="https://nodejs.org">NodeJS</a> et <a href="https://www.npmjs.com">npm</a>
- La librairie <a href="https://www.npmjs.com/package/pm2">pm2</a> installée globalement via NPM : `npm install -g pm2`
- La librairie <a href="https://www.npmjs.com/package/serve">serve</a>, installée globalement vua NPM : `npm install -g serve`

## Installation
- Télécharger le projet
- Créer un fichier `TWITTER_KEY.json` dans le dossier `/access` contenant le champ suivant avec le token de l'API Twitter
```
{
    "bearer_token": "token"
}
```
- Ouvrir un terminal de commande puis :
- Installer les dépendances
```
npm install
```
- Donner les droits d'éxécution aux scripts
```
chmod 777 scripts/*
```
- Installer la bibliothèque Stanford NER
```
npm run ner-install
```
Cela devrait avoir crée un dossier lib contenant la bibliothèque Java Stanford NER.
- Lancer le projet avec :
```
npm start
```
Cela devrait avoir servi localement les 3 services via pm2.

## Services
Le projet est composé de 3 services :
- Le client, correspondant au projet Vue en front, qui peut être lancé via `npm run client` pour le développement, ou déployé via `npm run build:client` (Port 8080)
- Le serveur, correspondant à l'API Rest exposé par le serveur, qui peut être lancé via `npm run server` (Port 3100)
- L'updater, correspondant au processus mettant à jour les données à intervalle régulié, qui peut être lancé via `npm run schedule`
