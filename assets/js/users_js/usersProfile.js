const url = 'https://mart-politico-app.herokuapp.com';
// const url = 'http://localhost:8000';

const token = localStorage.getItem('token');
const registerInterest = document.getElementById('express_interest');

document.addEventListener('DOMContentLoaded', () => {
  const signOut = document.getElementById('sign-out');
  signOut.addEventListener('click', () => {
    localStorage.clear();
  });
  if (!token) {
    window.location.href = 'citizen-signin.html';
  }

  fetch(`${url}/api/v1/parties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      const partyLists = document.getElementById('party_lists');
      const errorLists = document.getElementById('empty_list');

      if (resp.status === 404) {
        errorLists.innerHTML = resp.message;
      }
      if (resp.status === 200) {
        resp.data.forEach((party) => {
          partyLists.innerHTML += `
            <div class="box">
             <div class="box-inner">
              <div class="logo-center">
                <img src="assets/images/ballot-box.png" class="box-logo">
              </div>
              <div class="box-name"></div>
              <div class="center box-info">
                <h4>${party.name}</h4>
              </div>
            </div>
          </div>
            `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  fetch(`${url}/api/v1/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      // const userPassport = document.getElementById('profile_image');
      const userName = document.getElementById('profile_name');
      const userEmail = document.getElementById('profile_email');
      const userphone = document.getElementById('profile_phone');

      if (resp.status === 404) {
        console.log(resp);
      }
      if (resp.status === 200) {
        const userData = resp.data[0].user;

        userName.innerHTML = `${userData.firstname} ${userData.lastname}`;
        userEmail.innerHTML = userData.email;
        userphone.innerHTML = userData.phonenumber;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Function to get office
  const candidateLists = document.getElementById('candidate_lists');
  fetch(`${url}/api/v1/offices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 200) {
        resp.data.forEach((office) => {
          candidateLists.innerHTML += `
          <tr>
            <td rowspan="2" class="federal"><div><h3>${office.type}</h3></div></td>
            <td rowspan="2" class="federal"><div><h3>${office.name}</h3></div></td>
            <td class="candidate-box">
              <div class="candidate-box-area">
                <div >
                  <img src="assets/images/politician1.jpg" alt="">
                </div>
                <div>
                  <h3>Raji Fashola</h3>
                </div>  
              </div>   
            </td>
            <td class="party-box">
              <div class="party-box-area">
                <div >
                  <img src="assets/images/partylogo1.png" alt="">
                </div>
                <div>
                  <h3>PPA</h3>
                  <h4>Political Party Alliance</h4>
                </div>  
              </div>
            </td>
          </tr>
        `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Select party dropdown
  fetch(`${url}/api/v1/parties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      const partyLists = document.getElementById('pol_party');
      if (resp.status === 200) {
        resp.data.forEach((party) => {
          partyLists.innerHTML += `
          <option value="${party.id}">${party.name}</option>
            `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Select office dropdown
  fetch(`${url}/api/v1/offices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      const officeInfo = document.getElementById('office_name');
      if (resp.status === 200) {
        resp.data.forEach((office) => {
          console.log(office.id);
          officeInfo.innerHTML += `
          <option value="${office.id}">${office.type} / ${office.name}</option>
            `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

registerInterest.onsubmit = () => {
  event.preventDefault();

  const party = document.getElementById('pol_party').value;
  const office = document.getElementById('office_name').value;

  const form = {
    party,
    office,
  };

  fetch(`${url}/api/v1/office/interest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
    body: JSON.stringify(form),
  })
    .then(response => response.json())
    .then((resp) => {
      console.log(resp);
      if (resp.status === 201) {
        registerInterest.innerHTML = `<div class="parties">
        <h4>${resp.message}</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'citizen-profile.html';
        }, 2000);
      } else {
        registerInterest.innerHTML = `<div class="parties">
        <h4>${resp.message}</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'citizen-profile.html';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
