// const url = 'https://mart-politico-app.herokuapp.com';
const url = 'http://localhost:8000';

const signUpForm = document.getElementById('form_register');

// Function to register an account
signUpForm.onsubmit = () => {
  event.preventDefault();

  const firstname = document.getElementById('user_firstname').value;
  const lastname = document.getElementById('user_lastname').value;
  const email = document.getElementById('user_email').value;
  const phoneNumber = document.getElementById('user_phonenumber').value;
  const password = document.getElementById('user_password').value;
  const emailError = document.getElementById('email_error');

  const regForm = {
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
  };
  fetch(`${url}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(regForm),
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        const token = resp.data[0].token;
        const id = resp.data[0].user.id;

        localStorage.setItem('token', token);
        localStorage.setItem('userid', id);

        document.getElementById('signup_success').style.display = 'block';
        setTimeout(() => {
          window.location.href = 'citizen-profile.html';
        }, 3000);
      }
      if (resp.error === 'Email already exist!') {
        emailError.innerHTML = 'Email already exist!';
        setTimeout(() => {
          emailError.innerHTML = '';
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
