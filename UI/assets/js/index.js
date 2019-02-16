let id;

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

const openEditModal = (partyId) => {
  id = partyId;
  document.getElementById('editModal').style.display = 'block';
};

const closeEditModal = () => {
  document.getElementById('editModal').style.display = 'none';
};

const openDeleteModal = (partyId) => {
  id = partyId;
  document.getElementById('deleteModal').style.display = 'block';
};

const closeDeleteModal = () => {
  document.getElementById('deleteModal').style.display = 'none';
};

const openResultModal = () => {
  document.getElementById('resultModal').style.display = 'block';
};

const closeResultModal = () => {
  document.getElementById('resultModal').style.display = 'none';
};

// const removeParty = () => {
//   const elem = document.getElementById('remove');
//   elem.parentNode.removeChild(elem);
//   closeDeleteModal();
// };

const passwordCheck = () => {
  const password1 = document.getElementById('user_password').value;
  const password2 = document.getElementById('user_confirm_password').value;
  if (password1 !== password2) {
    document.getElementById('user_confirm_password').style.borderColor = 'red';
    document.getElementById('password_error_msg').innerHTML = 'Password do not match!';
    document.getElementById('register_btn').disabled = true;
  } else {
    document.getElementById('user_confirm_password').style.borderColor = 'green';
    document.getElementById('password_error_msg').innerHTML = '';
    document.getElementById('register_btn').disabled = false;
  }
};
