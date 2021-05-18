var openButton = document.getElementById('openButton');
openButton.addEventListener('click', function() {
    document.getElementsByClassName('modal__overlay')[0].style.display = "block";
    document.getElementById('updateButton').style.display = 'none';
    document.getElementById('addButton').style.display = '';
})

var cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', function() {
    document.getElementsByClassName('modal__overlay')[0].style.display = "none";
    formUrl.value = '';
    formAuthor.value = '';
    formTitle.value = '';
})

const main = document.getElementById('main');
const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

// fetch the places list
function getPlaces() {
    fetch('http://localhost:3000/places')
        .then(function (response) {
            // Trasform server response to get the places
            response.json().then(function (places) {
                appendPlacesToDOM(places);
            });
        });
};

// post places
function postPlace() {
    // creat post object
    const postObject = {
        title: formTitle.value,
        author: formAuthor.value,
        img: formUrl.value
    }
    // post place
    fetch('http://localhost:3000/places', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new places list
        getPlaces();
        // Reset Form
        resetForm();
    });
}

// delete place
function deletePlace(id) {
    // delete place
    fetch(`http://localhost:3000/places/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new places list
        getPlaces();
    });
}

// update place
function updatePlace(id) {
    // creat put object
    const putObject = {
        title: formTitle.value,
        author: formAuthor.value,
        img: formUrl.value
    }
    // update place
    fetch(`http://localhost:3000/places/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new places list
        getPlaces();

        // remove all event from update button
        clearUpdateButtonEvents();

        // Reset Form
        resetForm();
    });
}

// copy edited place information to form and add event listener on update button
function editPlace(place) {
    // copy place information to form
    formTitle.value = place.title;
    formAuthor.value = place.author
    formUrl.value = place.img;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.addEventListener('click', function () {
        document.getElementsByClassName('modal__overlay')[0].style.display = "none";
        updatePlace(place.id)
    });

}

// Create and append img title and author DOM tags
function appendPlacesToDOM(places) {
    // remove place list if exist
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    // create and append tags
    for (let i = 0; i < places.length; i++) {
        // create image obj
        let img = document.createElement('img');
        img.classList.toggle('picture');
        img.src = places[i].img;
        // create author obj
        let author = document.createElement('h5');
        author.classList.toggle('author');
        author.innerText = places[i].author;
        // create title obj
        let title = document.createElement('h4');
        title.classList.toggle('title');
        title.innerText = places[i].title;

        // create button and event for edit and delete
        let editButton = document.createElement('button')
        editButton.classList.toggle('actions_btn');
        // add event on btn and pass place id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        editButton.addEventListener('click', function () {   
            document.getElementById('updateButton').style.display = '';
            document.getElementById('addButton').style.display = 'none';
            document.getElementsByClassName('modal__overlay')[0].style.display = "block";
            editPlace(places[i])
        });
        editButton.innerText = 'Edit';
        let deleteButton = document.createElement('button')
        deleteButton.classList.toggle('actions_btn');
        // add event on btn and pass place object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        deleteButton.addEventListener('click', function () {
            deletePlace(places[i].id)
        });
        deleteButton.innerText = 'Delete';
        // create a container for img title and author
        let container = document.createElement('article');
        // append elements to container
        container.appendChild(img);
        let containerA = document.createElement('div');
        containerA.classList.toggle('info_container');
        containerA.appendChild(title);
        containerA.appendChild(author);
        container.appendChild(containerA);
        let containerB = document.createElement('div');
        containerB.classList.toggle('actions_container');
        containerB.appendChild(editButton);
        containerB.appendChild(deleteButton);
        container.appendChild(containerB);

        // append container to DOM (list div)
        main.appendChild(container);
    }
}

// reset form
function resetForm() {
    formTitle.value = '';
    formAuthor.value = '';
    formUrl.value = '';
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
// add event listener on add button
addButton.addEventListener('click', postPlace);

addButton.addEventListener('click', function() {
    document.getElementsByClassName('modal__overlay')[0].style.display = "none";
})

// get places
getPlaces();

//Dark theme
var content0 = document.getElementsByTagName('body')[0];
var content1 = document.getElementsByClassName('title0')[0];
var content2 = document.getElementById('main');
var content3 = document.getElementsByTagName('footer')[0];
var content4 = document.getElementsByClassName('link')[0];
var content5 = document.getElementsByClassName('subtitle')[0];
var content6 = document.getElementsByClassName('button');
var content7 = document.getElementsByClassName('modal')[0];
var content8 = document.getElementsByClassName('title2')[0];
var darkMode = document.getElementById('dark-change');
darkMode.addEventListener('click', function() {
    darkMode.classList.toggle('active');
    content0.classList.toggle('night');
    content1.classList.toggle('night');
    content2.classList.toggle('night');
    content3.classList.toggle('night');
    content4.classList.toggle('night');
    content5.classList.toggle('night');
    content6[0].classList.toggle('night');
    content6[1].classList.toggle('night');
    content6[2].classList.toggle('night');
    content7.classList.toggle('night');
    content8.classList.toggle('night');
})
