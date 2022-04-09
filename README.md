Groupomania- Réseau Social d’entreprise

Périmètres du projet: 

• La présentation des fonctionnalités doit être simple ; 

• La création d’un compte doit être simple et possible depuis un téléphone mobile ;

• Le profil doit contenir très peu d’informations pour que sa complétion soit rapide ; 

• La suppression du compte doit être possible ; 

• L’accès à un forum où les salariés publient des contenus multimédias doit être présent ;

• L’accès à un forum où les salariés publient des textes doit être présent ; 

• Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employé;

• Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés ; 

Langages utilisés sur le Projet: 

• MYSQL2

• Node.js

• VueJs: vue 3 , vue-jwt-decode, vue-router, vuex, vuex-persistedstate

• Packages de sécurités: helmet, ddos.


Configuration du projet: 

1. Cloner le projet
2. Créer un fichier dans le backend “.env” 
2. Inclure les variables suivantes dans le fichier “.env” dans le dossier backend: 
 
    DB_HOST="[Inclure ici le nom du localhost]"

    SECRET_TOKEN_KEY="[Inclure ici la clé de sécurité]"

    SECRET_PORT="[Inclure ici le numéro du port]"

    DB_USER="[Inclure ici le nom de l'utilisateur root]"

    DB_PASSWORD="[Inclure ici le mot de passe de la base de donnée]"

    BASE_URL=[Inclure ici l'URL]
    
4. Démarrer le serveur frontend avec la commande suivante: npm run serve 
5. Démarrer le serveur backend avec la commande suivante: nodemon serve


Informations compte Admin: 

Le compte Administrateur doit être créé dans la base de donnée avec les informations suivantes:

 email: Admin@Admin.com
 Mot de passe: ADMINadmin2022
 Nom: Admin
 Prénom: Admin 
 Admin: 1


API rest plan: 

User: 

    Signup:

    post/signup

    Login: 

    post/login

    Update:

    patch/update/:userId

    Delete: 

    delete/delete/:userId

Post: 

    Create Posts:

    post/post

    Update Post: 

    put/post/:postId

    Delete: 

    delete/post/display

    Get Posts: 

    get/post/display
    
Comment: 

    Create Comment:

    post/comment/

    Get Comments: 

    get/comment/post/:postId
    


