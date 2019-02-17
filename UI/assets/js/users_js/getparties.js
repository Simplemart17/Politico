const url = 'https://mart-politico-app.herokuapp.com';
// const url = 'http://localhost:8000';

const token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', () => {
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
});

document.addEventListener('DOMContentLoaded', () => {
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
        console.log(resp.data[0].user);
        const userData = resp.data[0].user;

        userName.innerHTML = `${userData.firstname} ${userData.lastname}`;
        userEmail.innerHTML = userData.email;
        userphone.innerHTML = userData.phonenumber;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Function to get office
document.addEventListener('DOMContentLoaded', () => {
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
});
