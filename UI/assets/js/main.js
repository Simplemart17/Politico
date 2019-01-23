const myFunction = () => {
    document.getElementById("myForm").reset();
}

const modal = document.getElementById('modal');

const openModal = () => {
    document.getElementById('modal').style.display = 'block';
}

const closeModal = () => {
    document.getElementById('modal').style.display='none'
}

const openPetitionModal = () => {
    document.getElementById('petitionModal').style.display = 'block';
}

const closePetitionModal = () => {
    document.getElementById('petitionModal').style.display='none'
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}