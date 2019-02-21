/* eslint-disable no-undef */
// Function to create parties
const url = 'https://mart-politico-app.herokuapp.com';
// const url = 'http://localhost:8000';

const token = localStorage.getItem('token');
const createParty = document.getElementById('create_party');
const editParty = document.getElementById('edit_party');

document.addEventListener('DOMContentLoaded', () => {
  const signOut = document.getElementById('sign-out');
  signOut.addEventListener('click', () => {
    localStorage.clear();
  });
  if (!token) {
    window.location = 'citizen-signin.html';
  }
});

createParty.onsubmit = () => {
  event.preventDefault();

  const name = document.getElementById('party_name').value;
  const hqAddress = document.getElementById('party_hq').value;

  const partyForm = {
    name,
    hqAddress,
  };
  fetch(`${url}/api/v1/parties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
    body: JSON.stringify(partyForm),
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        createParty.innerHTML = `<div class="parties">
        <h3>Political Party was successfully created!<h3/>
        <p>Party Name:<span> ${resp.data[0].name}</span><p/>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 3000);
      }
      if (resp.status === 400) {
        createParty.innerHTML = `<div class="parties">
        <h3>${resp.message}<h3/>
        <h4>The political party already exist!</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

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
          <div class="box" id="remove">
              <div class="box-inner center">
                <img src="assets/images/ballot-box.png" alt="logo" class="box-logo"><span class="mt"><div><i class="fas fa-trash-alt" onclick="openDeleteModal(${party.id}); "></i></div></span> <span class="mt"><div><i class="far fa-edit" onclick="openEditModal(${party.id})"></i></div></span><span><br><div class="admin-box-name"></div></span>
                <div class="box-info"><h4>${party.name}</h4></div>
                <div class="box-info"><h5>${party.hqaddress}</h5></div>
              </div>
            </div>
          `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  fetch(`${url}/api/v1/candidates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      const interestList = document.getElementById('interest_table');
      console.log(resp);
      if (resp.status === 200) {
        resp.data.forEach((candidate) => {
          interestList.innerHTML += `
          <table>  
            <tr>
              <td>${candidate.firstname} ${candidate.lastname}</td>
              <td>${candidate.name}</td>
              <td>New Nigeria party</td>
              <td><button key=${candidate.userid}>Register</button></td>
            </tr>
          </table>
        `;
          console.log(candidate.userid);
        });
      }
    })
    .catch(error => console.log(error));
});

editParty.onsubmit = () => {
  event.preventDefault();
  const editUrl = `${url}/api/v1/parties/${id}/name`;
  const editMsg = document.getElementById('edit_party');

  const name = document.getElementById('edit_name').value;

  const editForm = {
    name,
  };

  fetch(editUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify(editForm),
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 200) {
        editMsg.innerHTML = `<div class="parties">
        <h4>${resp.message}</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      } else {
        editMsg.innerHTML = `<div class="parties">
        <h4>${resp.error}</h4>
        </div>
        `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteParty = () => {
  const deleteUrl = `${url}/api/v1/parties/${id}`;
  const deleteMsg = document.getElementById('delete_message');

  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 200) {
        deleteMsg.innerHTML = `<div class="parties">
        <h4>The political party was successfully deleted!</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      } else {
        deleteMsg.innerHTML = `<div class="parties">
        <h4>${resp.error}</h4>
        </div>
        `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Funtion to create offices
const createOffice = document.getElementById('create_office');

createOffice.onsubmit = () => {
  event.preventDefault();

  const type = document.getElementById('office_type').value;
  const name = document.getElementById('office_name').value;

  const officeForm = {
    type,
    name,
  };
  fetch(`${url}/api/v1/offices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
    body: JSON.stringify(officeForm),
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        createOffice.innerHTML = `<div class="parties">
        <h3>Government office was successfully created!<h3/>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      }
      if (resp.status === 400) {
        createOffice.innerHTML = `<div class="parties">
        <h3>${resp.message}<h3/>
        <h4>The political party already exist!</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Function to get office lists
const officeLists = () => {
  const officeLists = document.getElementById('office_lists');

  fetch(`${url}/api/v1/offices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 200) {
        openOfficeListModal();
        officeLists.innerHTML = '';
        resp.data.forEach((office) => {
          officeLists.innerHTML += `
          <div class="box">
            <div class="box-office">
              <div class="box-info"><h4>TYPE:
              <p>${office.type}</p></h4></div>
              <div class="box-info"><h4>NAME: ${office.name}</h4></div>
            </div>
          </div>
          `;
        });
      } else {
        officeLists.innerHTML = `<div class="parties">
        <h4>${office.message}</h4>
        </div>
        `;
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
