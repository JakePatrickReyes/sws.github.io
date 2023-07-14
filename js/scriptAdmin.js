/* Declaration of variables to conect on the HTML properties/attribute */
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    /* Function to change the ACTIVE menu bar links upon scrolling sections or clicking each links */
    section.forEach(sec => {
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        /* Change ACTIVE status depends on the ID for section */
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
            });
        };

    });

    /* Changing Header background color when scrolled up or down */
    if (window.scrollY > 0) {
        /* Change to brown background */
        document.querySelector('.header').classList.add('active');
    } else {
        /* Change o transparent background */
        document.querySelector('.header').classList.remove('active');
    }
}

/* This will show when the screen size is reduced. When the MENU icon is clicked - Show the listed navigation bar in list view */
menu.onclick = () => {
    menu.classList.toggle('fa-times'); // Change the icon to X
    navbar.classList.toggle('active'); // Show listed links
}

/* Distinguish which Elements the have a classname btnComplete is clicked */
var completedButton = document.getElementsByClassName('btnComplete');
for (var i = 0; i < completedButton.length; i++) {
    var button = completedButton[i];
    button.addEventListener('click', completedBtnItem);
}

/* Change the class and innerText to Processing */
function completedBtnItem(event) {
    var buttonClicked = event.target;
    buttonClicked.addEventListener('click', () => buttonClicked.classList.remove('btnComplete')); /* classlist.remove is for removing the active/shown html property */
    buttonClicked.addEventListener('click', () => buttonClicked.classList.add('btnProcessing')); /* classlist.add is for activating an html property */
    buttonClicked.addEventListener('click', () => buttonClicked.innerHTML = 'Processing'); /* chage the innerText of this HTML to thsi text */
}

/* Distinguish which Elements the have a classname btnProcessing is clicked */
var processedButton = document.getElementsByClassName('btnProcessing');
for (var i = 0; i < processedButton.length; i++) {
    var button = processedButton[i];
    button.addEventListener('click', processedBtnItem);
}

/* Change the class and innerText to Completed */
function processedBtnItem(event) {
    var buttonClicked = event.target;
    buttonClicked.addEventListener('click', () => buttonClicked.classList.remove('btnProcessing'));
    buttonClicked.addEventListener('click', () => buttonClicked.classList.add('btnComplete'));
    buttonClicked.addEventListener('click', () => buttonClicked.innerHTML = 'Completed');
}

/* -----------------------------------------FILLING UP FORMS STARTS HERE------------------------------------------- */

/* Pop up Donation Fill Up Form */
function popFormFill() {
    document.querySelector('#user-fill-up-form').classList.toggle('active');
}

/* Close Donation Fill Up Form */
document.querySelector('#closeBtn').onclick = () => {
    document.querySelector('#donation-fill-form').classList.remove('active');
}

/* For Optional Donation Method Toggle and Remove Selected Method*/
/* Accessing html elements by getting its IDs */
let bdo = document.querySelector('#bdo');
let gcash = document.querySelector('#gcash');
let cbank = document.querySelector('#cbank');
let ubank = document.querySelector('#ubank');

bdo.onclick = () => {
    bdo.classList.toggle('active');
    gcash.classList.remove('active');
    cbank.classList.remove('active');
    ubank.classList.remove('active');
}

gcash.onclick = () => {
    bdo.classList.remove('active');
    gcash.classList.toggle('active');
    cbank.classList.remove('active');
    ubank.classList.remove('active');
}

cbank.onclick = () => {
    bdo.classList.remove('active');
    gcash.classList.remove('active');
    cbank.classList.toggle('active');
    ubank.classList.remove('active');
}

ubank.onclick = () => {
    bdo.classList.remove('active');
    gcash.classList.remove('active');
    cbank.classList.remove('active');
    ubank.classList.toggle('active');
}

/* Pop up Adoption Fill Up Form */
function popAdoptForm() {
    document.querySelector('#adoption-fill-up-form').classList.toggle('active'); /* classlist.toggle activates/shows the adoption fill up form */
}

/* Close Adoption Fill Up Form */
document.querySelector('#closeBtn').onclick = () => {
    document.querySelector('#adoption-fill-up-form').classList.remove('active');
}

/* Pop up Volunteer Fill Up Form */
function popVolunteerForm() {
    document.querySelector('#sign-up-form').classList.toggle('active');
}

/* Close Volunteer Fill Up Form */
document.querySelector('#closeVolBtn').onclick = () => {
    document.querySelector('#sign-up-form').classList.remove('active');
}

/* Pop up Reports Fill Up Form */
function popReportsForm() {
    document.querySelector('#reports-fill-up-form').classList.toggle('active');
}

/* Close Volunteer Fill Up Form */
document.querySelector('#closeRepBtn').onclick = () => {
    document.querySelector('#reports-fill-up-form').classList.remove('active');
}

/* -----------------------------------------FILLING UP FORMS ENDS HERE------------------------------------------- */

/* -----------------------------------------ADDING RECORDS TO TABLE STARTS HERE------------------------------------------- */
let addToRecordButtons = document.querySelector('#donateBtn');
addToRecordButtons.onclick = () => {
    var email = document.getElementById('email').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var amnt = document.getElementById('amnt').value;

    var recordItems = document.getElementsByClassName('donation-content')[0]; /* Accessing the Content of the Table */

    var recordRows = recordItems.getElementsByClassName('donation-row'); /* Accessing how many rows are present in the table */
    var total = 0;
    for (var i = 0; i < recordRows.length; i++) {
        /* Increment to 1 to count the ID for each record */
        total += 1;
    }

    var recordRow = document.createElement('tr'); /* Create a new table row inside the adoption bag */
    recordRow.classList.add('donation-row'); /* Applying the css to the created new tr inside the table records */
    /* Adding thefilled up information to table row with this structure */
    var recordRowContents = `<td class="donation-deets" data-label="No.">${total}</td>
                            <td class="donation-deets" data-label="Name">${fname + " " + lname}</td>
                            <td class="donation-deets" data-label="Email">${email}</td>
                            <td class="donation-deets" data-label="Method">${"Online"}</td>
                            <td class="donation-deets" data-label="Amount">${amnt}</td>
                            <td class="donation-deets" data-label="Status">
                                <button class="btnProcessing" name="processing" type="button">Processing</button>
                            </td>`;
    recordRow.innerHTML = recordRowContents; /* The created new tr will display the filled up info to the table records */
    recordItems.append(recordRow); /* Info will be attached below the available records in the table */
    recordRow.getElementsByClassName('btnProcessing')[0].addEventListener('click', processedBtnItem); /* Add function to the processing button function to change its status */
    document.getElementById("email").value = ''; /* Clear email field fter submitting */
    document.getElementById("fname").value = ''; /* Clear fname field fter submitting */
    document.getElementById("lname").value = ''; /* Clear lname field fter submitting */
    document.getElementById("amnt").value = ''; /* Clear amount field fter submitting */
    bdo.classList.remove('active'); /* Remove active classlist */
    gcash.classList.remove('active'); /* Remove active classlist */
    cbank.classList.remove('active'); /* Remove active classlist */
    ubank.classList.remove('active'); /* Remove active classlist */
    document.querySelector('#donation-fill-form').classList.remove('active'); /* Close the fill up form */
}

/* This is just the same as the above adding records to our table */
/* Only this will just display the matched info based on these tables */
/* But the event/function is just the same */
/* So comments will be just the same for each line */
let addToAdoptButtons = document.querySelector('#adoptBtn');
addToAdoptButtons.onclick = () => {
    var adoptEmail = document.getElementById('adoptEmail').value;
    var adoptFname = document.getElementById('adoptFname').value;
    var adoptLname = document.getElementById('adoptLname').value;
    var adoptAddress = document.getElementById('adoptAddress').value;
    var adoptDate = document.getElementById('adoptDate').value;
    var adoptQty = document.getElementById('adoptQty').value;
    var adoptAnimals = document.getElementById('adoptAnimals').value;

    var adoptItems = document.getElementsByClassName('adoption-content')[0];

    var adoptRows = adoptItems.getElementsByClassName('adoption-row');
    var total = 0;
    for (var i = 0; i < adoptRows.length; i++) {
        total += 1;
    }

    var adoptRow = document.createElement('tr');
    adoptRow.classList.add('adoption-row');
    var adoptRowContents = `<td class="adoption-deets" data-label="No.">${total}</td>
                    <td class="adoption-deets" data-label="Name">${adoptFname + " " + adoptLname}</td>
                    <td class="adoption-deets" data-label="Address">${adoptAddress}</td>
                    <td class="adoption-deets" data-label="Date">${adoptDate}</td>
                    <td class="adoption-deets" data-label="Animals">${adoptAnimals}</td>
                    <td class="adoption-deets" data-label="Status">
                    <button class="btnProcessing" name="processing" type="button">Processing</button>
                    </td>`;
    adoptRow.innerHTML = adoptRowContents;
    adoptItems.append(adoptRow);
    adoptRow.getElementsByClassName('btnProcessing')[0].addEventListener('click', processedBtnItem);
    document.getElementById('adoptEmail').value = '';
    document.getElementById('adoptFname').value = '';
    document.getElementById('adoptLname').value = '';
    document.getElementById('adoptAddress').value = '';
    document.getElementById('adoptQty').value = '';
    document.getElementById('adoptAnimals').value = '';
    document.querySelector('#adoption-fill-up-form').classList.remove('active');
}

let addToVolunteerButtons = document.querySelector('#volunteerBtn');
addToVolunteerButtons.onclick = () => {
    var volEmail = document.getElementById('volEmail').value;
    var volFName = document.getElementById('volFName').value;
    var volLName = document.getElementById('volLName').value;
    var volBDay = document.getElementById('volBDay').value;
    var volAdd = document.getElementById('volAdd').value;

    var volunteerItems = document.getElementsByClassName('volunteer-content')[0];

    var volunteerRows = volunteerItems.getElementsByClassName('volunteer-row');
    var total = 0;
    for (var i = 0; i < volunteerRows.length; i++) {
        total += 1;
    }

    var volunteerRow = document.createElement('tr');
    volunteerRow.classList.add('volunteer-row');
    var volunteerRowContents = `<td class="volunteer-deets" data-label="No.">${total}</td>
                                <td class="volunteer-deets" data-label="Name">${volFName + " " + volLName}</td>
                                <td class="volunteer-deets" data-label="Email">${volEmail}</td>
                                <td class="volunteer-deets" data-label="Birthdate">${volBDay}</td>
                                <td class="volunteer-deets" data-label="Address">${volAdd}</td>
                                <td class="volunteer-deets" data-label="Status">
                                <button class="btnProcessing" name="processing" type="button">Processing</button>
                                </td>`;
    volunteerRow.innerHTML = volunteerRowContents;
    volunteerItems.append(volunteerRow);
    volunteerRow.getElementsByClassName('btnProcessing')[0].addEventListener('click', processedBtnItem);
    document.getElementById('volEmail').value = '';
    document.getElementById('volFName').value = '';
    document.getElementById('volLName').value = '';
    document.getElementById('volAdd').value = '';
    document.querySelector('#sign-up-form').classList.remove('active');
}

let addToReportsButtons = document.querySelector('#reportBtn');
addToReportsButtons.onclick = () => {
    var askEmail = document.getElementById('askEmail').value;
    var askName = document.getElementById('askName').value;
    var askDate = document.getElementById('askDate').value;
    var askNumber = document.getElementById('askNumber').value;
    var askMessage = document.getElementById('askMessage').value;

    var reportItems = document.getElementsByClassName('reports-content')[0];

    var reportRows = reportItems.getElementsByClassName('reports-row');
    var total = 0;
    for (var i = 0; i < reportRows.length; i++) {
        total += 1;
    }

    var reportRow = document.createElement('tr');
    reportRow.classList.add('reports-row');
    var reportRowContents = `<td class="reports-deets" data-label="No.">${total}</td>
                            <td class="reports-deets" data-label="Name">${askName}</td>
                            <td class="reports-deets" data-label="Email">${askEmail}</td>
                            <td class="reports-deets" data-label="Date">${askDate}</td>
                            <td class="reports-deets" data-label="Contact Number">${askNumber}</td>
                            <td class="reports-deets" data-label="Message">${askMessage}</td>
                            <td class="reports-deets" data-label="Status">
                                <button class="btnProcessing" name="processing" type="button">Processing</button>
                            </td>`;
    reportRow.innerHTML = reportRowContents;
    reportItems.append(reportRow);
    reportRow.getElementsByClassName('btnProcessing')[0].addEventListener('click', processedBtnItem);
    document.getElementById('askEmail').value = '';
    document.getElementById('askName').value = '';
    document.getElementById('askNumber').value = '';
    document.getElementById('askMessage').value = '';
    document.querySelector('#reports-fill-up-form').classList.remove('active');
}

/* -----------------------------------------ADDING RECORDS TO TABLE ENDS HERE------------------------------------------- */