// const url = 'https://mart-politico-app.herokuapp.com';
const url = 'http://localhost:8000';

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
            <div class="box" onclick="openDetailsModal(${party.id}); getDetails();">
             <div class="box-inner center">
              <div class="logo-center">
                <img src="assets/images/ballot-box.png" class="box-logo">
              </div>
              <div class="box-info">
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

  const candidateLists = document.getElementById('candidate_lists');
  const voteLists = document.getElementById('vote_lists');
  fetch(`${url}/api/v1/registered`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 200) {
        if (candidateLists) {
          resp.data.forEach((candidates) => {
            candidateLists.innerHTML += `
          <table>
            <tr>
              <td>${candidates.firstname} ${candidates.lastname}</td>
              <td>${candidates.officetype}</td>
              <td>${candidates.officename}</td>
              <td>${candidates.partyname}</td>
            </tr>
          </table>
          `;
          });
        }
        if (voteLists) {
          resp.data.forEach((candidates) => {
            voteLists.innerHTML += `
          <table>
            <tr>
              <td>${candidates.officetype}</td>
              <td>${candidates.officename}</td>
              <td>${candidates.firstname} ${candidates.lastname}</td>
              <td>${candidates.partyname}</td>
              <td><input id="vote_btn" class="bg-white" onclick="voteCandidate(${candidates.userid}, ${candidates.officeid})"
              type="button" value="VOTE"></td>
            </tr>
          </table>
          `;
          });
        }
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

const getDetails = () => {
  fetch(`${url}/api/v1/parties/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      const partyDetails = resp.data[0];

      const partyLogo = document.getElementById('party-logo');
      const partyName = document.getElementById('party-name');
      const partyAddress = document.getElementById('party-address');

      partyLogo.innerHTML = partyDetails.logourl;
      partyName.innerHTML = partyDetails.name;
      partyAddress.innerHTML = partyDetails.hqaddress;
    })
    .catch((error) => {
      console.log(error);
    });
};

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

// Function to vote candidate
const voteCandidate = (userid, officeid) => {
  const voteBtn = document.getElementById('vote_btn');
  const candidate = userid;
  const office = officeid;

  const voteForm = {
    office,
    candidate,
  };

  fetch(`${url}/api/v1/votes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
    body: JSON.stringify(voteForm),
  })
    .then(response => response.json())
    .then((resp) => {
      console.log(resp);
      if (resp.status === 201) {
        voteBtn.value = 'VOTED';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
