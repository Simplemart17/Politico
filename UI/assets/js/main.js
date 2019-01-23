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

const openPartyModal = () => {
    document.getElementById('partyModal').style.display = 'block';
}

const closePartyModal = () => {
    document.getElementById('partyModal').style.display='none'
}

const openOfficeModal = () => {
    document.getElementById('officeModal').style.display = 'block';
}

const closeOfficeModal = () => {
    document.getElementById('officeModal').style.display='none'
}

const openEditModal = () => {
    document.getElementById('editModal').style.display = 'block';
}

const closeEditModal = () => {
    document.getElementById('editModal').style.display='none'
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// let test = document.getElementsByClassName('box');

// console.log(test);

const removeParty = () => {
    let elem = document.getElementById('remove');
    elem.parentNode.removeChild(elem);
}