/* eslint-disable no-undef */
// Function to create parties
const baseUrl = 'https://mart-politico-app.herokuapp.com';
const url = 'http://localhost:8000/api/v1/parties';
const token = localStorage.getItem('token');
const createParty = document.getElementById('create_party');
const editParty = document.getElementById('edit_party');

createParty.onsubmit = () => {
  event.preventDefault();

  const name = document.getElementById('party_name').value;
  const hqAddress = document.getElementById('party_hq').value;

  const partyForm = {
    name,
    hqAddress,
  };
  fetch(`${baseUrl}/api/v1/parties`, {
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
  fetch(`${baseUrl}/api/v1/parties`, {
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
});

editParty.onsubmit = () => {
  event.preventDefault();
  const url = `${baseUrl}/api/v1/parties/${id}/name`;
  const editMsg = document.getElementById('edit_party');

  const name = document.getElementById('edit_name').value;

  const editForm = {
    name,
  };

  fetch(url, {
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
  const url = `${baseUrl}/api/v1/parties/${id}`;
  const deleteMsg = document.getElementById('delete_message');

  fetch(url, {
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
