


//                     VARIABLES


var contacts = [];

var editIndex = -1;

var contactModal =
    new bootstrap.Modal(
        document.getElementById("contactModal")
    );



//                 GET LOCAL STORAGE


if (localStorage.getItem("contacts") != null) {

    contacts =
        JSON.parse(
            localStorage.getItem("contacts")
        );

}


//                     DISPLAY


displayContacts();



//                 OPEN ADD MODAL


function openAddModal() {

    editIndex = -1;

    document.getElementById("modalTitle").innerText =
        "Add New Contact";

    document.getElementById("saveButtonText").innerText =
        "Save Contact";

    clearForm();

    contactModal.show();

}



//                    CLEAR FORM


function clearForm() {

    document.getElementById("fullName").value = "";

    document.getElementById("phoneNumber").value = "";

    document.getElementById("emailAddress").value = "";

    document.getElementById("address").value = "";

    document.getElementById("group").value = "";

    document.getElementById("notes").value = "";

    document.getElementById("favorite").checked = false;

    document.getElementById("emergency").checked = false;

    document.getElementById("imageInput").value = "";

    document.getElementById("contactPhoto").src =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

}



//                  SAVE TO LOCAL STORAGE


function saveToLocalStorage() {

    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
    );

}


//                    SAVE CONTACT


function saveContact() {


    var name =
        document
            .getElementById("fullName")
            .value
            .trim();


    var phone =
        document
            .getElementById("phoneNumber")
            .value
            .trim();


    var email =
        document
            .getElementById("emailAddress")
            .value
            .trim();


    var address =
        document
            .getElementById("address")
            .value
            .trim();


    var group =
        document
            .getElementById("group")
            .value;


    var notes =
        document
            .getElementById("notes")
            .value
            .trim();


    var favorite =
        document
            .getElementById("favorite")
            .checked;


    var emergency =
        document
            .getElementById("emergency")
            .checked;



    //                    VALIDATION


    if (name == "") {

        Swal.fire({
            icon: "warning",
            title: "Name is required",
            text: "Please enter the contact name.",
            confirmButtonColor: "#3155dc"
        });

        return;
    }


    if (name.length < 2) {

        Swal.fire({
            icon: "warning",
            title: "Invalid name",
            text: "Name must contain at least 2 characters.",
            confirmButtonColor: "#3155dc"
        });

        return;
    }


    if (phone == "") {

        Swal.fire({
            icon: "warning",
            title: "Phone is required",
            text: "Please enter the phone number.",
            confirmButtonColor: "#3155dc"
        });

        return;
    }


    var phoneRegex =
        /^(\+20|0020|0)?1[0125][0-9]{8}$/;


    if (!phoneRegex.test(phone)) {

        Swal.fire({
            icon: "error",
            title: "Invalid phone number",
            text: "Please enter a valid Egyptian phone number.",
            confirmButtonColor: "#3155dc"
        });

        return;
    }


    if (email != "") {

        var emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            Swal.fire({
                icon: "error",
                title: "Invalid email",
                text: "Please enter a valid email address.",
                confirmButtonColor: "#3155dc"
            });

            return;
        }

    }



    //                 CONTACT OBJECT
    

    var image =
        document.getElementById("contactPhoto").src;


    var contact = {

        id:
            editIndex == -1
                ? Date.now()
                : contacts[editIndex].id,

        name: name,

        phone: phone,

        email: email,

        address: address,

        group: group,

        notes: notes,

        favorite: favorite,

        emergency: emergency,

        image: image

    };



    //                       ADD
  

    if (editIndex == -1) {

        contacts.push(contact);

        saveToLocalStorage();

        displayContacts();

        contactModal.hide();


        Swal.fire({
            icon: "success",
            title: "Contact Added!",
            text: "The contact has been added successfully.",
            timer: 1500,
            showConfirmButton: false
        });

    }



    //                      UPDATE

    else {

        contacts[editIndex] = contact;

        saveToLocalStorage();

        displayContacts();

        contactModal.hide();


        Swal.fire({
            icon: "success",
            title: "Contact Updated!",
            text: "The contact has been updated successfully.",
            timer: 1500,
            showConfirmButton: false
        });

    }

}



//                  DISPLAY CONTACTS


function displayContacts(list) {


    var container =
        document.getElementById(
            "contactsContainer"
        );


    var contactsToDisplay =
        list || contacts;


    container.innerHTML = "";



    //                  EMPTY STATE


    if (contactsToDisplay.length == 0) {

        container.innerHTML = `

            <div class="col-12">

                <div
                    class="empty-state
                           d-flex
                           flex-column
                           justify-content-center
                           align-items-center
                           text-center">

                    <div
                        class="empty-icon
                               rounded-3
                               d-flex
                               justify-content-center
                               align-items-center
                               mb-3">

                        <i class="bi bi-person-vcard"></i>

                    </div>

                    <h6 class="fw-bold text-secondary">
                        No contacts found
                    </h6>

                    <p class="text-secondary small">
                        Click "Add Contact" to get started
                    </p>

                </div>

            </div>

        `;


        updateStatistics();

        displayFavorites();

        displayEmergency();

        return;
    }


  
    //                 CREATE CARDS
  

    for (
        var i = 0;
        i < contactsToDisplay.length;
        i++
    ) {


        var contact =
            contactsToDisplay[i];


        var realIndex =
            contacts.findIndex(
                function (item) {

                    return item.id == contact.id;

                }
            );


        container.innerHTML += `

            <div class="col-12 col-xl-6">

                <div
                    class="contact-card
                           bg-white
                           border
                           rounded-4
                           p-3
                           h-100">


                    <div
                        class="d-flex
                               flex-column
                               flex-sm-row
                               justify-content-between
                               gap-3">


                        <!-- CONTACT INFORMATION -->

                        <div
                            class="d-flex
                                   align-items-center
                                   gap-3">


                            <img
                                src="${contact.image}"
                                class="contact-card-photo rounded-circle"
                                alt="${contact.name}">


                            <div>

                                <h6 class="fw-bold mb-1">

                                    ${
                                        contact.favorite
                                            ? `<span class="text-warning">★</span>`
                                            : ""
                                    }

                                    ${
                                        contact.emergency
                                            ? `<span class="text-danger">♥</span>`
                                            : ""
                                    }

                                    ${contact.name}

                                </h6>


                                <p class="small text-secondary mb-1">

                                    <i class="bi bi-telephone me-1"></i>

                                    ${contact.phone}

                                </p>


                                ${
                                    contact.email
                                        ? `
                                        <p class="small text-secondary mb-0">

                                            <i class="bi bi-envelope me-1"></i>

                                            ${contact.email}

                                        </p>
                                        `
                                        : ""
                                }

                            </div>

                        </div>



                        <!-- ACTION BUTTONS -->

                        <div
                            class="contact-actions
                                   d-flex
                                   gap-2
                                   align-items-center">


                            <!-- FAVORITE -->

                            <button
                                class="contact-action
                                       star-btn
                                       btn
                                       rounded-2
                                       p-0"
                                onclick="toggleFavorite(${realIndex})">

                                <i class="bi ${
                                    contact.favorite
                                        ? "bi-star-fill"
                                        : "bi-star"
                                }"></i>

                            </button>


                            <!-- CALL -->

                            <a
                                href="tel:${contact.phone}"
                                class="contact-action
                                       call-btn
                                       btn
                                       rounded-2
                                       p-0">

                                <i class="bi bi-telephone-fill"></i>

                            </a>


                            <!-- EMAIL -->

                            ${
                                contact.email
                                    ? `
                                    <a
                                        href="mailto:${contact.email}"
                                        class="contact-action
                                               email-btn
                                               btn
                                               rounded-2
                                               p-0">

                                        <i class="bi bi-envelope-fill"></i>

                                    </a>
                                    `
                                    : ""
                            }


                            <!-- EDIT -->

                            <button
                                class="contact-action
                                       edit-btn
                                       btn
                                       rounded-2
                                       p-0"
                                onclick="editContact(${realIndex})">

                                <i class="bi bi-pencil-fill"></i>

                            </button>


                            <!-- DELETE -->

                            <button
                                class="contact-action
                                       delete-btn
                                       btn
                                       rounded-2
                                       p-0"
                                onclick="deleteContact(${realIndex})">

                                <i class="bi bi-trash-fill"></i>

                            </button>

                        </div>

                    </div>


                    ${
                        contact.address || contact.notes
                            ? `

                            <div class="border-top mt-3 pt-3">

                                ${
                                    contact.address
                                        ? `
                                        <p class="small text-secondary mb-1">

                                            <i class="bi bi-geo-alt me-1"></i>

                                            ${contact.address}

                                        </p>
                                        `
                                        : ""
                                }


                                ${
                                    contact.notes
                                        ? `
                                        <p class="small text-secondary mb-0">

                                            <i class="bi bi-sticky me-1"></i>

                                            ${contact.notes}

                                        </p>
                                        `
                                        : ""
                                }

                            </div>

                            `
                            : ""
                    }

                </div>

            </div>

        `;

    }


    updateStatistics();

    displayFavorites();

    displayEmergency();

}



//                       SEARCH


function searchContacts() {


    var searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    var searchResult =
        contacts.filter(
            function (contact) {

                return (

                    contact.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    contact.phone
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    contact.email
                        .toLowerCase()
                        .includes(searchValue)

                );

            }
        );


    displayContacts(searchResult);

}


//                       EDIT

function editContact(index) {


    editIndex = index;


    var contact =
        contacts[index];


    document.getElementById("modalTitle").innerText =
        "Edit Contact";


    document.getElementById("saveButtonText").innerText =
        "Update Contact";


    document.getElementById("fullName").value =
        contact.name;


    document.getElementById("phoneNumber").value =
        contact.phone;


    document.getElementById("emailAddress").value =
        contact.email;


    document.getElementById("address").value =
        contact.address;


    document.getElementById("group").value =
        contact.group;


    document.getElementById("notes").value =
        contact.notes;


    document.getElementById("favorite").checked =
        contact.favorite;


    document.getElementById("emergency").checked =
        contact.emergency;


    document.getElementById("contactPhoto").src =
        contact.image;


    contactModal.show();

}



//                       DELETE


function deleteContact(index) {


    Swal.fire({

        title: "Are you sure?",

        text: "You won't be able to revert this!",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Delete",

        cancelButtonText: "Cancel"

    }).then(
        function (result) {

            if (result.isConfirmed) {


                contacts.splice(index, 1);


                saveToLocalStorage();


                displayContacts();


                Swal.fire({

                    icon: "success",

                    title: "Deleted!",

                    text: "The contact has been deleted.",

                    timer: 1500,

                    showConfirmButton: false

                });

            }

        }
    );

}



//                    FAVORITE


function toggleFavorite(index) {


    contacts[index].favorite =
        !contacts[index].favorite;


    saveToLocalStorage();


    displayContacts();

}



//                  DISPLAY FAVORITES


function displayFavorites() {


    var container =
        document.getElementById(
            "favoritesContainer"
        );


    var favorites =
        contacts.filter(
            function (contact) {

                return contact.favorite;

            }
        );


    if (favorites.length == 0) {

        container.innerHTML = `

            <p class="text-secondary text-center small m-0">

                No favorites yet

            </p>

        `;

        return;
    }


    container.innerHTML = "";


    for (
        var i = 0;
        i < favorites.length;
        i++
    ) {


        container.innerHTML += `

            <div
                class="d-flex
                       align-items-center
                       gap-2
                       mb-3">


                <img
                    src="${favorites[i].image}"
                    class="side-contact-photo rounded-circle">


                <div class="overflow-hidden">

                    <p class="fw-bold small mb-0 text-truncate">

                        ${favorites[i].name}

                    </p>


                    <p class="text-secondary small mb-0 text-truncate">

                        ${favorites[i].phone}

                    </p>

                </div>

            </div>

        `;

    }

}



//                 DISPLAY EMERGENCY


function displayEmergency() {


    var container =
        document.getElementById(
            "emergencyContainer"
        );


    var emergencyContacts =
        contacts.filter(
            function (contact) {

                return contact.emergency;

            }
        );


    if (emergencyContacts.length == 0) {

        container.innerHTML = `

            <p class="text-secondary text-center small m-0">

                No emergency contacts

            </p>

        `;

        return;
    }


    container.innerHTML = "";


    for (
        var i = 0;
        i < emergencyContacts.length;
        i++
    ) {


        container.innerHTML += `

            <div
                class="d-flex
                       align-items-center
                       gap-2
                       mb-3">


                <img
                    src="${emergencyContacts[i].image}"
                    class="side-contact-photo rounded-circle">


                <div class="overflow-hidden">

                    <p class="fw-bold small mb-0 text-truncate">

                        ${emergencyContacts[i].name}

                    </p>


                    <p class="text-secondary small mb-0 text-truncate">

                        ${emergencyContacts[i].phone}

                    </p>

                </div>

            </div>

        `;

    }

}



//                    STATISTICS


function updateStatistics() {


    var favoriteNumber =
        contacts.filter(
            function (contact) {

                return contact.favorite;

            }
        ).length;


    var emergencyNumber =
        contacts.filter(
            function (contact) {

                return contact.emergency;

            }
        ).length;


    document.getElementById("totalCount").innerText =
        contacts.length;


    document.getElementById("contactsNumber").innerText =
        contacts.length;


    document.getElementById("favoriteCount").innerText =
        favoriteNumber;


    document.getElementById("emergencyCount").innerText =
        emergencyNumber;

}



//                       IMAGE


document
    .getElementById("imageInput")
    .addEventListener(
        "change",
        function () {


            var file =
                this.files[0];


            if (!file) {
                return;
            }


            var reader =
                new FileReader();


            reader.onload =
                function (event) {

                    document
                        .getElementById("contactPhoto")
                        .src =
                        event.target.result;

                };


            reader.readAsDataURL(file);

        }
    );