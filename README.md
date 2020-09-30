# Foodfy

Dependencias do sistema : 



---------------------------------------------------

Passo a passo : Criar arquivo server.js

Inicia a instalação de depedencendias ->  npm init -y // Cria um projeto cria apenas o pack.json

Adicionando Node Modulos -> npm install express  // cria o node modules e package-lock.json

Reiniciando servidor auto --> npm install -D nodemon // reiniciar servidor automatico
Na função em server.js incluir 

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon  server.js"
  },

  Instalação do nunjucks --> npm install nunjucks

npm install browser-sync npm-run-all -D // instalar reload auto do navegador e -D significa desenvolvimento

parte do script : 
 "scripts": {
    "start": "npm-run-all -p nodemon browsersync ",
    "nodemon": "nodemon server.js ",
    "browsersync": "browser-sync start --proxy http://localhost:5000 --files 'public,views'"
  },



