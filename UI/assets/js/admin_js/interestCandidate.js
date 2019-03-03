// const url = 'https://mart-politico-app.herokuapp.com';
const url = 'http://localhost:8000';

const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const interestList = document.getElementById('interest_table');

  fetch(`${url}/api/v1/candidates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 200) {
        resp.data.forEach((candidate) => {
          interestList.innerHTML += `
            <table>
              <tbody>
                <tr>
                  <td data-label="Candidate Names:">${candidate.firstname} ${candidate.lastname}</td>
                  <td data-label="Office Name:">${candidate.officename}</td>
                  <td data-label="Party Name:"">${candidate.partyname}</td>
                  <td data-label="Action:"><input id="interest" class="admin-reg-btn bg-white" 
                  onclick="registerCandidate(${candidate.userid}, ${candidate.partyid}, ${candidate.officeid})" 
                  type="button" value=${candidate.status === 'pending' ? 'Register' : 'Registered'} ${candidate.status === 'pending' ? '' : 'disabled'}></td>
                </tr>
              </tbody>
            </table>
          `;
        });
      }
    })
    .catch(error => console.log(error));
});

// Function to register candidate for office
const registerCandidate = (userid, partyid, officeid) => {
  const btnValue = document.getElementById('interest');
  const id = userid;
  const party = partyid;
  const office = officeid;

  const candidateForm = {
    party,
    office,
  };

  fetch(`${url}/api/v1/office/${id}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token,
    },
    body: JSON.stringify(candidateForm),
  })
    .then(response => response.json())
    .then((resp) => {
      if (resp.status === 201) {
        btnValue.value = 'Registered';
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
