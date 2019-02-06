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
      if (data.error === 'Email already exist!') {
        errMsg.innerHTML = data.error;
      }
      if (response.status === 400) {
        errHeader.innerHTML = 'The request cannot be completed!';
        return response.status;
      }
      if (response.status === 201) {
        document.getElementById('success').style.display = 'block';
        setTimeout(() => {
          document.getElementById('success').style.display = 'none';
        }, 5000);
        window.location.href = 'index.html';
      }
    } catch (err) {
      throw err;
    }
  }
  postSignup(request);
};

const login = () => {
  event.preventDefault();
  const url = 'http://localhost:8000/api/v1/auth/login';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const emailError = document.getElementById('email_error');
  const passwordError = document.getElementById('password_error');

  const data = {
    email,
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
  async function postLogin(payLoad) {
    try {
      const resp = await fetch(payLoad);
      const data = await resp.json();
      if (data.error === 'Incorrect email address') {
        emailError.innerHTML = data.error;
      }
      if (data.error === 'Incorrect password!') {
        console.log(data);
        passwordError.innerHTML = data.error;
      }
      window.location.href = 'UI/index.hmtl';
      return resp.status;
    } catch (err) {
      throw err;
    }
  }
  postLogin(request);
};
