const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for ( let card of cards ) {
    card.addEventListener("click", function(){
        const cardId = card.getAttribute("id");
        window.location.href = `/show?id=${cardId}`
        
    })
}


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
