const signUp = () => {
  event.preventDefault();
  const url = 'http://localhost:8000/api/v1/auth/signup';
  const firstname = document.getElementById('user_firstname').value;
  const lastname = document.getElementById('user_lastname').value;
  const othername = document.getElementById('user_othername').value;
  const email = document.getElementById('user_email').value;
  const phonenumber = document.getElementById('user_phonenumber').value;
  const password = document.getElementById('user_password').value;
  const errMsg = document.getElementById('err_msg');
  const errHeader = document.getElementById('error_header');

  const data = {
    firstname,
    lastname,
    othername,
    email,
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
      const response = await fetch(payLoad);
      const data = await response.json();
      console.log(data);
      if (data.error === 'Email already exist!') {
        errMsg.innerHTML = data.error;
      }
      if (response.status === 400) {
        errHeader.innerHTML = 'The request cannot be completed!';
        return response.status;
      }
      if (response.status === 201) {
        window.location.href = 'citizen-signin.html';
        console.log(data);
      }
    } catch (err) {
      throw err;
    }
  }
  postSignup(request);
};

const signinForm = document.getElementById('signin-form');
const url = 'http://localhost:8000/api/v1/auth/login';
signinForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('email_error');
  const passwordError = document.getElementById('password_error');
  const errHeader = document.getElementById('error_header');
  const login = {
    email,
    password,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(login),
  })
    .then(response => response.json())
    .then((resp) => {
      const isadmin = resp.data[0].user.isadmin;

      console.log(isadmin);
      if (resp.error === 'Incorrect email address') {
        emailError.innerHTML = resp.error;
      }
      if (resp.error === 'Incorrect password!') {
        passwordError.innerHTML = resp.error;
      }
      if (resp.message === 'You have successfully signed in!') {
        const token = resp.data[0].token;
        localStorage.setItem('token', token);
        if (isadmin === true) {
          setTimeout(() => {
            window.location.href = 'admin.html';
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.href = 'citizen-profile.html';
          }, 2000);
        }
      } else {
        errHeader.innerHTML = 'You cannot be logged in, try again!';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
