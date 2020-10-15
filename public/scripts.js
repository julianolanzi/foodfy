


//modalOverlay.classList.add('active')
//modalOverlay.querySelector("iframe").src = `${cardId}`;
//document.querySelector(".close-modal").addEventListener("click" , function() {
//    modalOverlay.classList.remove("active")
//    modalOverlay.querySelector("iframe").src = ""
//})


function mostra(id) {
    if (document.getElementById(id).style.display == 'none') {

        document.getElementById(id).style.display = 'block';
        document.getElementById("b"+id).value="Esconder";

    } else  { document.getElementById(id).style.display = 'none'; 
        document.getElementById("b"+id).value="Mostrar"; }  
}

function addInput(event) {
    const buttonName = event.target.name;
    const ingredients = document.querySelector("#ingredients");
    const preparation = document.querySelector('#preparation');
    const fieldContainer = document.querySelectorAll(`.${buttonName}`);

    // Realiza um clone do último input adicionado
    const newField = fieldContainer[ fieldContainer.length - 1 ].cloneNode(true);
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[ 0 ].value == "") return alert(`Preencha o campo para continuar`);

    // Deixa o valor do input vazio
    newField.children[ 0 ].value = "";
    if (buttonName === 'ingredient') {
        ingredients.appendChild(newField);
    } else {
        preparation.appendChild(newField);
    }
}

document
    .querySelectorAll(".add-input")
    .forEach(button => button.addEventListener("click", addInput))
