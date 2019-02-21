const url = 'https://mart-politico-app.herokuapp.com';
// const url = 'http://localhost:8000';

const signinForm = document.getElementById('signin-form');

signinForm.onsubmit = () => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('email_error');
  const passwordError = document.getElementById('password_error');
  const errHeader = document.getElementById('error_header');
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
      const isadmin = resp.data[0].user.isadmin;

      if (resp.error === 'Incorrect email address') {
        emailError.innerHTML = 'Incorrect email address';
      }
      if (resp.error === 'Incorrect password!') {
        passwordError.innerHTML = 'Incorrect password';
      }
      if (resp.message === 'You have successfully signed in!') {
        const token = resp.data[0].token;
        const userid = resp.data[0].user.userid;

        localStorage.setItem('token', token);
        localStorage.setItem('isadmin', isadmin);
        localStorage.setItem('userid', userid);

        document.getElementById('success').style.display = 'block';
        setTimeout(() => {
          (isadmin === true) ? window.location.href = 'admin.html' : window.location.href = 'citizen-profile.html';
        }, 3000);
      } else {
        errHeader.innerHTML = 'You cannot be logged in, try again!';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
