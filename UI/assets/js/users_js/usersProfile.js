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
      const userProfile = document.getElementById('user_profile');
      if (resp.status === 200) {
        const userData = resp.data[0].user;
        console.log(userData);
        userProfile.innerHTML = `
          <img src="/uploads/${userData.passporturl}" alt="profile-pic">
          <div class="profile-info">
            <h2>${userData.firstname} ${userData.lastname}</h2>
            <h4>${userData.email}</h4>
            <h4>${userData.phonenumber}</h4>
          </div>
          `;
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
            <tbody>
              <tr>
                <td data-label="Candidate:">${candidates.firstname} ${candidates.lastname}</td>
                <td data-label="Office Type:">${candidates.officetype}</td>
                <td data-label="Office Name:">${candidates.officename}</td>
                <td data-label="Political Party:">${candidates.partyname}</td>
              </tr>
            </tbody>
          </table>
          `;
          });
        }
        if (voteLists) {
          resp.data.forEach((candidates) => {
            voteLists.innerHTML += `
          <table>
            <tbody>
              <tr>
                <td data-label="Office Type:">${candidates.officetype}</td>
                <td data-label="Office Name:">${candidates.officename}</td>
                <td data-label="Candidate:">${candidates.firstname} ${candidates.lastname}</td>
                <td data-label="Political Party:">${candidates.partyname}</td>
                <td data-label="Action:"><input id="vote_btn" class="vote-btn bg-white" onclick="voteCandidate(${candidates.userid}, ${candidates.officeid}, ${candidates.partyid})" type="button" value=${candidates.status === 'vote' ? 'VOTE' : 'VOTED'}></td>
              </tr>
            </tbody>
          </table>
          `;
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Election Results for Federal Office
  const federalResult = document.getElementById('federal_results');
  const legislativeResult = document.getElementById('legislative_results');
  const stateResult = document.getElementById('state_results');
  const localResult = document.getElementById('local_results');

  fetch(`${url}/api/v1/office/1/result`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        resp.data.forEach((result) => {
          federalResult.innerHTML += `
          <table>
            <tbody>
              <tr>
                <td data-label="Candidate Names:">${result.firstname} ${result.lastname}</td>
                <td data-label="Office Name:">${result.officename}</td>
                <td data-label="Party Logo:">${result.logourl}</td>
                <td data-label="Result:">${result.result}</td>
              </tr>
            </tbody>
          </table>
          `;
        });
      }
      if (resp.status === 404) {
        document.getElementById('federal_error').innerHTML = 'Result for Federal Government Office not found!';
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Election results for Legislative offices
  fetch(`${url}/api/v1/office/2/result`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        resp.data.forEach((result) => {
          legislativeResult.innerHTML += `
          <table>
            <tbody>
              <tr>
                <td data-label="Candidate Names:">${result.firstname} ${result.lastname}</td>
                <td data-label="Office Name:">${result.officename}</td>
                <td data-label="Party Logo:">${result.logourl}</td>
                <td data-label="Result:">${result.result}</td>
              </tr>
            </tbody>
          </table>
          `;
        });
      }
      if (resp.status === 404) {
        document.getElementById('legislative_error').innerHTML = 'Result for Legislative Government Office not found!';
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Election result for State Government Office
  fetch(`${url}/api/v1/office/3/result`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        resp.data.forEach((result) => {
          stateResult.innerHTML += `
          <table>
            <tbody>
              <tr>
                <td data-label="Candidate Names:">${result.firstname} ${result.lastname}</td>
                <td data-label="Office Name:">${result.officename}</td>
                <td data-label="Party Logo:">${result.logourl}</td>
                <td data-label="Result:">${result.result}</td>
              </tr>
            </tbody>
          </table>
          `;
        });
      }
      if (resp.status === 404) {
        document.getElementById('state_error').innerHTML = 'Result for State Government Office not found!';
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Election result for Local Government Office
  fetch(`${url}/api/v1/office/4/result`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        resp.data.forEach((result) => {
          localResult.innerHTML += `
          <table>
            <tbody>
              <tr>
                <td data-label="Candidate Names:">${result.firstname} ${result.lastname}</td>
                <td data-label="Office Name:">${result.officename}</td>
                <td data-label="Party Logo:">${result.logourl}</td>
                <td data-label="Result:">${result.result}</td>
              </tr>
            </tbody>
          </table>
          `;
        });
      }
      if (resp.status === 404) {
        document.getElementById('local_error').innerHTML = 'Result for State Government Office not found!';
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
const voteCandidate = (userid, officeid, partyid) => {
  const voteBtn = document.getElementById('vote_btn');
  const candidate = userid;
  const office = officeid;
  const party = partyid;

  const voteForm = {
    office,
    party,
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
      if (resp.status === 201) {
        voteBtn.value = 'VOTED';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
