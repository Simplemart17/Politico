const reset = () => {
  document.getElementById('form').reset();
};

const modal = document.getElementById('modal');

const openModal = () => {
  document.getElementById('modal').style.display = 'block';
};

const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
};

const openPetitionModal = () => {
  document.getElementById('petitionModal').style.display = 'block';
};

const closePetitionModal = () => {
  document.getElementById('petitionModal').style.display = 'none';
};

const openPartyModal = () => {
  document.getElementById('partyModal').style.display = 'block';
};

const closePartyModal = () => {
  document.getElementById('partyModal').style.display = 'none';
};

const openOfficeModal = () => {
  document.getElementById('officeModal').style.display = 'block';
};

const closeOfficeModal = () => {
  document.getElementById('officeModal').style.display = 'none';
};

const openEditModal = () => {
  document.getElementById('editModal').style.display = 'block';
};

const closeEditModal = () => {
  document.getElementById('editModal').style.display = 'none';
};

const openResultModal = () => {
  document.getElementById('resultModal').style.display = 'block';
};

const closeResultModal = () => {
  document.getElementById('resultModal').style.display = 'none';
};

const removeParty = () => {
  const elem = document.getElementById('remove');
  elem.parentNode.removeChild(elem);
};

const adminLogin = () => {
  if ((document.getElementById('password').value === 'admin') && (document.getElementById('username').value === 'admin')) {
    location.href = 'admin.html';
  }
  return null;
};
