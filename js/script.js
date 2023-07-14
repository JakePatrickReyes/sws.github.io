/* Declaration of variables to conect on the HTML properties/attribute */
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

let loginForm = document.querySelector('.header .login-form');
let signupForm = document.querySelector('.header .sign-up-form');
let adoptBag = document.querySelector('.header .adopt-bag');
let likes = document.querySelector('.header .likes');
let icons = document.querySelector('.header .adopt-bag .icons a');

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
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    adoptBag.classList.remove('active');
    likes.classList.remove('active');
}

/* This will show when the BAG icon is clicked - Show the listed added to bag adoptees */
document.querySelector('#bag-btn').onclick = () => {
    menu.classList.remove('fa-times');
    adoptBag.classList.toggle('active'); /* Show adoption bag box */
    likes.classList.remove('active');
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    navbar.classList.remove('active');
}

/* This will show when the HEART icon is clicked - Show the listed likes */
document.querySelector('#heart-btn').onclick = () => {
    menu.classList.remove('fa-times');
    adoptBag.classList.remove('active');
    likes.classList.toggle('active'); /* Show likes bag box */
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    navbar.classList.remove('active');
}

/* This will show when the LOGIN icon is clicked - Show the Sign Up Form */
document.querySelector('#login-btn').onclick = () => {
    menu.classList.remove('fa-times');
    adoptBag.classList.remove('active');
    likes.classList.remove('active');
    signupForm.classList.toggle('active'); /* Show sign up form box */
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

/* This will show when the SIGN UP icon is clicked - Show the Log-in Form */
document.querySelector('#signupVolunteer').onclick = () => {
    menu.classList.remove('fa-times');
    adoptBag.classList.remove('active');
    likes.classList.remove('active');
    signupForm.classList.toggle('active'); /* Show sign up form box */
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

/* This will show when the LOGIN as Admin icon is clicked - Show the Log-in Form */
document.querySelector('#loginAdmin').onclick = () => {
    menu.classList.remove('fa-times');
    adoptBag.classList.remove('active');
    likes.classList.remove('active');
    loginForm.classList.toggle('active'); /* Show login form box */
    navbar.classList.remove('active');
    signupForm.classList.remove('active');
}

/* Function for the FAQ Section - Dropdown content when clicked each item */
const toggles = document.querySelectorAll('.faqItem');

toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
    })
});

/* To determine whether the html document is now ready for functions after loading each content */
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready() /* Do this function */
}

function ready() {
    /* Prepare the Remove Content/Items of Adoption Bag */
    var removeBagItemButtons = document.getElementsByClassName('fas fa-trash');
    for (var i = 0; i < removeBagItemButtons.length; i++) {
        var button = removeBagItemButtons[i];
        button.addEventListener('click', removeBagItem);
    }

    /* Prepare the Remove Content/Items of Likes Bag */
    var removeLikeItemButtons = document.getElementsByClassName('fas fa-trash');
    for (var i = 0; i < removeLikeItemButtons.length; i++) {
        var button = removeLikeItemButtons[i];
        button.addEventListener('click', removeLikeItem);
    }

    /* Prepare the Add Content/Items to Adoption Bag */
    var addToCartButtons = document.getElementsByClassName('fas fa-shopping-bag');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    /* Prepare the Add Content/Items to Likes Bag */
    var addToLikesButtons = document.getElementsByClassName('fas fa-heart');
    for (var i = 0; i < addToLikesButtons.length; i++) {
        var button = addToLikesButtons[i];
        button.addEventListener('click', addToLikesClicked);
    }
}

/* Removing from Bag */
function removeBagItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

/* Removing POP UP ALERT Message by clicking dismiss button */
document.getElementById("dismiss-popup-btn").addEventListener("click", function() {
    document.getElementsByClassName("popup")[0].classList.remove("active"); /* classlist.remove is for removing the active/shown html property */
    document.getElementsByClassName("popup-invalid")[0].classList.remove("active");
});

/* Removing POP UP ALERT INVALID Message by clicking dismiss button */
document.getElementById("dismiss-popup-invalid-btn").addEventListener("click", function() {
    document.getElementsByClassName("popup-invalid")[0].classList.remove("active");
    document.getElementsByClassName("popup")[0].classList.remove("active");
});

/* Adding to Bag - Getting the Name, Gender and Img Src of Selected Animal */
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var name = shopItem.getElementsByClassName('adopt-name')[0].innerText; /* Getting the inner text displayed at the selected item/animal */
    var gender = shopItem.getElementsByClassName('gender')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('adopt-image-src')[0].src; /* Getting the source image link inside at the selected item/animal */
    addItemToCart(name, gender, imgSrc); /* Arguments to Pass */
    let cartEmpty = document.querySelector('.cart-empty');
    cartEmpty.classList.toggle('active'); /* classlist.toggle is for activating a html property/design */
    updateCartTotal(); /* Call this method to update the number of total inside the bag */
}

/* Adding Animal to Bag - Displaying to Bag */
function addItemToCart(name, gender, imgSrc) {
    var adoptRow = document.createElement('div'); /* Create a new div inside the adoption bag */
    adoptRow.classList.add('adopt-row'); /* Applying the css to the created new div inside the adoption bag */
    var adoptItems = document.getElementsByClassName('bag-items')[0]; /* Getting the item contents inside the adoption bag */
    var adoptItemNames = adoptItems.getElementsByClassName('cart-item-name'); /* Accessing the Added Animals in the Adoption Bag */
    /* Looping and condition to check whether a furbaby is already in the cart or not */
    for (var i = 0; i < adoptItemNames.length; i++) {
        if (adoptItemNames[i].innerText == name) {
            document.getElementsByClassName("popup-invalid")[0].classList.add("active"); /* Toggle to show the popup invalid message box */
            return;
        } else {
            document.getElementsByClassName("popup")[0].classList.add("active"); /* Toggle to show the popup success message box */
        }
    }
    /* Adding the selected animal to bag with this structure */
    var adoptRowContents = `<i class="fas fa-trash"></i>
                                <img src="${imgSrc}" alt="">
                                <div class="content">
                                    <h3 class="cart-item-name">${name}</h3>
                                    <span class="gender">${gender}</span>
                                `;
    adoptRow.innerHTML = adoptRowContents; /* The created new div will display the selected animal to the adoption bag */
    adoptItems.append(adoptRow); /* Items inside the bag will add this new item */
    adoptRow.getElementsByClassName('fas fa-trash')[0].addEventListener('click', removeBagItem); /* Add function to the remove button function (trash bin) to delete furbaby in bag */
}

/* Updating the Total Number of Bag */
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('adopt-bag')[0]; /* Accessing the section of Adoption Bag */
    var cartRows = cartItemContainer.getElementsByClassName('adopt-row'); /* Get the number of rows inside the bag */
    var total = 0;
    /* Loop to count the total numbers of row inside the bag */
    for (var i = 0; i < cartRows.length; i++) {
        total += 1;
    }
    document.getElementsByClassName('bag-total-number')[0].innerText = total; /* Display to the total number of items inside bag */
}

/* Removing from Likes */
function removeLikeItem(event) {
    var buttonClicked = event.target; /* Add an event to the remove button(trash clicked) */
    buttonClicked.parentElement.remove(); /* Removing the parent element of a row */
    updateLikesTotal(); /* Update the total to subtract from total number */
}

/* This is just the same as adding items in our adoption bag */
/* Only this will just display the liked furbaby */
/* But the event/function is just the same */
/* Adding to Likes - Getting the Name, Gender and Img Src of Selected Animal */
function addToLikesClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var likeName = shopItem.getElementsByClassName('adopt-name')[0].innerText;
    var likeGender = shopItem.getElementsByClassName('gender')[0].innerText;
    var likeImgSrc = shopItem.getElementsByClassName('adopt-image-src')[0].src;
    addItemToLikes(likeName, likeGender, likeImgSrc);
    updateLikesTotal();
}

/* Adding Animal to Likes - Displaying to Likes */
function addItemToLikes(likeName, likeGender, likeImgSrc) {
    var likesRow = document.createElement('div');
    likesRow.classList.add('likes-row');
    var likesItems = document.getElementsByClassName('likes-items')[0];
    var likesItemNames = likesItems.getElementsByClassName('likes-item-name');
    for (var i = 0; i < likesItemNames.length; i++) {
        if (likesItemNames[i].innerText == likeName) {
            document.getElementsByClassName("popup-invalid")[0].classList.add("active");
            return;
        } else {
            document.getElementsByClassName("popup")[0].classList.add("active");
        }
    }
    var cartRowContents = `<i class="fas fa-trash"></i>
                                <img src="${likeImgSrc}" alt="">
                                <div class="content">
                                    <h3 class="likes-item-name">${likeName}</h3>
                                    <span class="gender">${likeGender}</span>
                                </div>`;
    likesRow.innerHTML = cartRowContents;
    likesItems.append(likesRow);
    likesRow.getElementsByClassName('fas fa-trash')[0].addEventListener('click', removeLikeItem);
}

/* Updating the Total Number of Likes */
function updateLikesTotal() {
    var likesItemContainer = document.getElementsByClassName('likes')[0];
    var likesRows = likesItemContainer.getElementsByClassName('likes-row');
    var total = 0;
    for (var i = 0; i < likesRows.length; i++) {
        total += 1;
    }
    document.getElementsByClassName('likes-total-price')[0].innerText = total;
}

/* ----------------------------- THIS IS FOR POPPING OUR DIFFERENT FORMS ----------------------------- */

/* Pop up Donation Fill Up Form */
function popFormFill() {
    document.querySelector('#fill-up-form').classList.toggle('active');
}

/* Close Donation Fill Up Form */
document.querySelector('#close').onclick = () => {
    document.querySelector('#fill-up-form').classList.remove('active');
    document.querySelector('#adoption-fill-up-form').classList.remove('active');
}

/* For Optional Donation Method Toggle and Remove Selected Method*/
/* Accessing html elements by getting its IDs */
let bdo = document.querySelector('#bdo');
let gcash = document.querySelector('#gcash');
let cbank = document.querySelector('#cbank');
let ubank = document.querySelector('#ubank');

/* If BDO option is click, do these */
bdo.onclick = () => {
    bdo.classList.toggle('active');
    gcash.classList.remove('active');
    cbank.classList.remove('active');
    ubank.classList.remove('active');
}

/* If GCASH option is click, do these */
gcash.onclick = () => {
    bdo.classList.remove('active');
    gcash.classList.toggle('active');
    cbank.classList.remove('active');
    ubank.classList.remove('active');
}

/* If CBANK option is click, do these */
cbank.onclick = () => {
    bdo.classList.remove('active');
    gcash.classList.remove('active');
    cbank.classList.toggle('active');
    ubank.classList.remove('active');
}

/* If UBANK option is click, do these */
ubank.onclick = () => {
    bdo.classList.remove('active');
    gcash.classList.remove('active');
    cbank.classList.remove('active');
    ubank.classList.toggle('active');
}

/* Function for submitting a donation */
function submitDonate() {
    if (document.getElementById("email").value.length == 0 && document.getElementById("fname").value.length == 0 && document.getElementById("lname").value.length == 0 && document.getElementById("address").value.length == 0 && document.getElementById("amnt").value.length == 0) {
        alert("Please fill out our form. Thank you!");
    } else {
        alert('Thank you for yur BIG heart! This means a lot. Godbless you always.');
        document.getElementById("email").value = '';
        document.getElementById("fname").value = '';
        document.getElementById("lname").value = '';
        document.getElementById("address").value = '';
        document.getElementById("amnt").value = '';
        bdo.classList.remove('active');
        gcash.classList.remove('active');
        cbank.classList.remove('active');
        ubank.classList.remove('active');
        document.querySelector('#fill-up-form').classList.remove('active');
    }
}

/* Pop up Adoption Fill Up Form */
function popAdoptForm() {
    var cartItemContainer = document.getElementsByClassName('adopt-bag')[0];
    var cartRows = cartItemContainer.getElementsByClassName('adopt-row');
    if (cartRows.length == 0) {
        document.querySelector('#adoption-fill-up-form').classList.remove('active');
        alert("Your Bag is currently empty. Please Add a Furbaby from our Adoption Catalog!"); /* Pop up as a JavaScript alert MESSAGE */
    } else {
        document.querySelector('#adoption-fill-up-form').classList.toggle('active');
    }
}

/* Same process as for adopting - filling up form after CHECKING OUT the adoption bag*/
/* Close Adoption Fill Up Form */
document.querySelector('#closeBtn').onclick = () => {
    document.querySelector('#adoption-fill-up-form').classList.remove('active');
}

/* For Donation Method Toggle and Remove Selected Method*/
let BDO = document.querySelector('#BDO');
let GCASH = document.querySelector('#GCASH');
let CBANK = document.querySelector('#CBANK');
let UBANK = document.querySelector('#UBANK');

BDO.onclick = () => {
    BDO.classList.toggle('active');
    GCASH.classList.remove('active');
    CBANK.classList.remove('active');
    UBANK.classList.remove('active');
}

GCASH.onclick = () => {
    BDO.classList.remove('active');
    GCASH.classList.toggle('active');
    CBANK.classList.remove('active');
    UBANK.classList.remove('active');
}

CBANK.onclick = () => {
    BDO.classList.remove('active');
    GCASH.classList.remove('active');
    CBANK.classList.toggle('active');
    UBANK.classList.remove('active');
}

UBANK.onclick = () => {
    BDO.classList.remove('active');
    GCASH.classList.remove('active');
    CBANK.classList.remove('active');
    UBANK.classList.toggle('active');
}

/* Function for submitting an adoption form */
function submitAdopt() {
    if (document.getElementById("adoptEmail").value.length == 0 && document.getElementById("adoptFname").value.length == 0 && document.getElementById("adoptLname").value.length == 0 && document.getElementById("adoptAddress").value.length == 0 && document.getElementById("adoptAmnt").value.length == 0) {
        alert("Please fill out our form. Thank you!");
    } else {
        if (confirm("Do you realy wanna submit your Adoption Application?") == true) {
            alert('Thank you for yur BIG heart! This means a lot. \n\nYour adoption request has been recorded. Kindly wait patiently for our response. \n\nGodbless you always.');
            document.getElementById("adoptEmail").value = '';
            document.getElementById("adoptFname").value = '';
            document.getElementById("adoptLname").value = '';
            document.getElementById("adoptAddress").value = '';
            document.getElementById("adoptAmnt").value = '';
            BDO.classList.remove('active');
            GCASH.classList.remove('active');
            CBANK.classList.remove('active');
            UBANK.classList.remove('active');
            document.querySelector('#adoption-fill-up-form').classList.remove('active');
            var bagItems = document.getElementsByClassName('bag-items')[0]; /* Accessing items are in the adoption bag */
            /* After submitting an adoption form, remove items inside the adoption bag */
            while (bagItems.hasChildNodes()) {
                bagItems.removeChild(bagItems.firstChild);
            }
            updateCartTotal(); /* Update again the total number */
            return;
        }

    }
}