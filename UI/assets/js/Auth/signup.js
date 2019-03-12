// const url = 'https://mart-politico-app.herokuapp.com';
const url = 'http://localhost:8000';

const signUpForm = document.getElementById('form_register');
const passport = document.querySelector('#passportUrl');

// Function to register an account
signUpForm.onsubmit = () => {
  event.preventDefault();

  const firstname = document.getElementById('user_firstname').value.trim();
  const lastname = document.getElementById('user_lastname').value.trim();
  const email = document.getElementById('user_email').value.trim();
  const phoneNumber = document.getElementById('user_phonenumber').value.trim();
  const password = document.getElementById('user_password').value.trim();
  const emailError = document.getElementById('email_error');

  const formData = new FormData();
  formData.append('firstname', firstname);
  formData.append('lastname', lastname);
  formData.append('email', email);
  formData.append('phoneNumber', phoneNumber);
  formData.append('password', password);
  formData.append('passportUrl', passport.files[0]);

  fetch(`${url}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
    body: formData,
  })
    .then(response => response.json())
    .then((resp) => {
      console.log(resp);
      if (resp.status === 201) {
        const token = resp.data[0].token;
        const id = resp.data[0].user.id;

        localStorage.setItem('token', token);
        localStorage.setItem('userid', id);

        window.location.href = 'citizen-profile.html';
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
