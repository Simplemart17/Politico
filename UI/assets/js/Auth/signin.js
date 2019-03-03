const url = 'https://mart-politico-app.herokuapp.com';
// const url = 'http://localhost:8000';

const signinForm = document.getElementById('signin-form');

signinForm.onsubmit = () => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('email_error');
  const passwordError = document.getElementById('password_error');
  const login = {
    email,
    password,
  };
  fetch(`${url}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(login),
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 401) {
        document.getElementById('error_header').style.display = 'block';
        setTimeout(() => {
          document.getElementById('error_header').style.display = 'none';
        }, 3000);
      }
      if (resp.status === 400) {
        document.getElementById('error-header').style.display = 'block';
        setTimeout(() => {
          document.getElementById('error-header').style.display = 'none';
        }, 3000);
      }
      if (resp.error === 'Incorrect email address') {
        emailError.innerHTML = 'Incorrect email address';
        setTimeout(() => {
          emailError.innerHTML = '';
        }, 3000);
      }
      if (resp.error === 'Incorrect password!') {
        passwordError.innerHTML = 'Incorrect password';
        setTimeout(() => {
          passwordError.innerHTML = '';
        }, 3000);
      }
      if (resp.message === 'You have successfully signed in!') {
        const isadmin = resp.data[0].user.isadmin;
        const token = resp.data[0].token;
        const id = resp.data[0].user.id;

        localStorage.setItem('token', token);
        localStorage.setItem('isadmin', isadmin);
        localStorage.setItem('userid', id);

        document.getElementById('success').style.display = 'block';
        setTimeout(() => {
          (isadmin === true) ? window.location.href = 'admin.html' : window.location.href = 'citizen-profile.html';
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
