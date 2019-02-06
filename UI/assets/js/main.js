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


const signUp = () => {
  event.preventDefault();
  const url = 'https://mart-politico-app.herokuapp.com/api/v1/auth/signup';
  const firstname = document.getElementById('user_firstname').value;
  const lastname = document.getElementById('user_lastname').value;
  const othername = document.getElementById('user_othername').value;
  const email = document.getElementById('user_email').value;
  const username = document.getElementById('user_username').value;
  const phonenumber = document.getElementById('user_phonenumber').value;
  const password = document.getElementById('user_password').value;

  const data = {
    firstname,
    lastname,
    othername,
    email,
    username,
    phoneNumber: phonenumber,
    password,
  };
  const request = new Request(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  async function postSignup(payLoad) {
    try {
      const resp = await fetch(payLoad);
      const data = await resp.json();
      window.location.href = 'index.html';
    } catch (err) {
      throw err;
    }
  }

  postSignup(request);
};
