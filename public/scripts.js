const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for ( let card of cards ) {
    card.addEventListener("click", function(){
        const cardId = card.getAttribute(".card");
        modalOverlay.classList.add('active')
        modalOverlay.querySelector("iframe").src = `${cardId}`;
    })
}

document.querySelector(".close-modal").addEventListener("click" , function() {
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = ""
})

