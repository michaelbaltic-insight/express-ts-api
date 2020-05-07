/******************************************************************************
 *                          Fetch and display claims
 ******************************************************************************/

displayClaims();


function displayClaims() {
    httpGet('/api/claims/all')
        .then(response => response.json())
        .then((response) => {
            var allClaims = response.claims;
            // Empty the anchor
            var allClaimsAnchor = document.getElementById('all-claims-anchor');
            allClaimsAnchor.innerHTML = '';
            // Append claims to anchor
            allClaims.forEach((claim) => {
                allClaimsAnchor.innerHTML += getClaimDisplayEle(claim);
            });
        });
};


function getClaimDisplayEle(claim) {
    return `<div class="claim-display-ele">

        <div class="normal-view">
            <div>Number: ${claim.claimNumber}</div>
            <div>Id: ${claim.id}</div>
            <button class="edit-claim-btn" data-claim-id="${claim.id}">
                Edit
            </button>
            <button class="delete-claim-btn" data-claim-id="${claim.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${claim.claimNumber}">
            </div>
            <div>
                Email: <input class="email-edit-input" value="${claim.id}">
            </div>
            <button class="submit-edit-btn" data-claim-id="${claim.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-claim-id="${claim.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Claims
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-claim-btn')) {
        addClaim();
    } else if (ele.matches('.edit-claim-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-claim-btn')) {
        deleteClaim(ele);
    }
}, false)


function addClaim() {
    var nameInput = document.getElementById('name-input');
    var emailInput = document.getElementById('email-input');
    var data = {
        claim: {
            name: nameInput.value,
            email: emailInput.value
        },
    };
    httpPost('/api/claims/add', data)
        .then(() => {
            displayClaims();
        })
}


function showEditView(claimEle) {
    var normalView = claimEle.getElementsByClassName('normal-view')[0];
    var editView = claimEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(claimEle) {
    var normalView = claimEle.getElementsByClassName('normal-view')[0];
    var editView = claimEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    var claimEle = ele.parentNode.parentNode;
    var nameInput = claimEle.getElementsByClassName('name-edit-input')[0];
    var emailInput = claimEle.getElementsByClassName('email-edit-input')[0];
    var id = ele.getAttribute('data-claim-id');
    var data = {
        claim: {
            name: nameInput.value,
            email: emailInput.value,
            id: id
        }
    };
	httpPut('/api/claims/update', data)
        .then(() => {
            displayClaims();
        })
}


function deleteClaim(ele) {
    var id = ele.getAttribute('data-claim-id');
	httpDelete('/api/claims/delete/' + id)
        .then(() => {
            displayClaims();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

