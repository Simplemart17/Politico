const baseUrl = 'https://mart-politico-app.herokuapp.com';
const url = 'http://localhost:8000';

const token = localStorage.getItem('token');
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
