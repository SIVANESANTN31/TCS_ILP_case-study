
function goToLogin() {
    document.body.classList.add("slide-to-right");
    setTimeout(() => {
        window.location.href = "./login.html";
    }, 500);
}

function goToRegister() {
    document.body.classList.add("slide-to-left");
    setTimeout(() => {
        window.location.href = "./registeration.html";
    }, 500);
}

function goToAdmin() {
    document.body.classList.add("slide-to-left");
    setTimeout(() => {
        window.location.href = "./admin-login.html";
    }, 500);
}

window.addEventListener("load", function () {

    if (window.location.pathname.includes("login")) {
        document.body.style.transform = "translateX(-100%)";
    } else {
        document.body.style.transform = "translateX(100%)";
    }

    setTimeout(() => {
        document.body.style.transition = "transform 0.5s ease-in-out";
        document.body.style.transform = "translateX(0)";
    }, 50);

    const user = localStorage.getItem("username");
    if (user && document.getElementById("username")) {
        document.getElementById("username").innerText = user;
    }
});


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{1,30}$/.test(password);
}

function generateUserId() {
    return "CUST" + Math.floor(100000 + Math.random() * 900000);
}

function register() {
    let valid = true;

    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const code = document.getElementById("countryCode").value;
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const customerId = document.getElementById("customerId").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name) {
        document.getElementById("nameError").innerText = "Name is required";
        valid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById("emailError").innerText = "Invalid email";
        valid = false;
    }

    if (code === "" || !/^[0-9]{10}$/.test(mobile)) {
        document.getElementById("mobileError").innerText =
            "Enter valid 10-digit mobile with code";
        valid = false;
    }

    if (!address) {
        document.getElementById("addressError").innerText = "Address required";
        valid = false;
    }

    if (customerId.length < 5 || customerId.length > 20) {
        document.getElementById("customerIdError").innerText =
            "ID must be 5-20 characters";
        valid = false;
    }

    if (!validatePassword(password)) {
        document.getElementById("passwordError").innerText =
            "Password must contain uppercase, lowercase, special character";
        valid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerText =
            "Passwords do not match";
        valid = false;
    }

    if (valid) {
        let userId = generateUserId();
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("successScreen").style.display = "block";
        document.getElementById("userId").innerText = userId;
    }
}

function resetForm() {
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
    document.getElementById("countryCode").value = "";
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

function handleLogin(e) {
  e.preventDefault();
  login();
}

function login() {
    let valid = true;

    document.getElementById("userIdError").innerText = "";
    document.getElementById("passwordError").innerText = "";

    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value;

    if (userId.length < 5 || userId.length > 20) {
        document.getElementById("userIdError").innerText =
            "User ID must be between 5 and 20 characters";
        valid = false;
    }

    if (!validatePassword(password)) {
        document.getElementById("passwordError").innerText =
            "Password must contain uppercase, lowercase and special character";
        valid = false;
    }

    const validUser = "admin123";
    const validPass = "Admin@123";

    if (valid) {
        if (userId === validUser && password === validPass) {
            // ✅ Save user + redirect AFTER validation
            localStorage.setItem("username", userId);
            window.location.href = "./home-page.html";
        } else {
            document.getElementById("passwordError").innerText =
                "Invalid User ID or Password";
        }
    }
}

function adminLogin() {
    let valid = true;

    document.getElementById("userIdError").innerText = "";
    document.getElementById("passwordError").innerText = "";

    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value;

    if (userId.length < 5 || userId.length > 20) {
        document.getElementById("userIdError").innerText =
            "User ID must be between 5 and 20 characters";
        valid = false;
    }

    if (!validatePassword(password)) {
        document.getElementById("passwordError").innerText =
            "Password must contain uppercase, lowercase and special character";
        valid = false;
    }

    const adminUser = "admin123";
    const adminPass = "Admin@123";

    if (valid) {
        if (userId === adminUser && password === adminPass) {
            // ✅ Save + redirect
            localStorage.setItem("username", userId);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("passwordError").innerText =
                "Invalid Admin Username or Password";
        }
    }
}


function goHome() {
    const content = document.getElementById("content");
    if (!content) return;

    content.innerHTML = `
    <h2>Home Page</h2>
    <p>Welcome to the customer dashboard.</p>
  `;
}

// document.addEventListener("DOMContentLoaded", () => {
//   fetch("navbar.html")
//     .then(res => {
//       console.log("Status:", res.status);
//       return res.text();
//     })
//     .then(data => {
//       console.log("Navbar loaded:", data);
//       document.getElementById("navbar").innerHTML = data;
//     })
//     .catch(err => console.error("ERROR:", err));
// });
document.addEventListener("DOMContentLoaded", () => {
    const navbarHTML = `
    <div class="navbar">
        <div class="menu" id="menu">
            <div class="close-btn" onclick="toggleMenu()">✖</div>
<span onclick="navigate('reservation'); closeMenu()">Reservation</span>
<span onclick="navigate('billing'); closeMenu()">Billing</span>
<span onclick="navigate('history'); closeMenu()">History</span>
<span onclick="navigate('bookings'); closeMenu()">Bookings</span>
<span onclick="navigate('support'); closeMenu()">Support</span>
<span onclick="logout(); closeMenu()">Logout</span>
        </div>

        <div class="welcome">
            Welcome <span id="username"></span>
        </div>

        <div class="hamburger" onclick="toggleMenu()">☰</div>
    </div>
  `;

    document.getElementById("navbar").innerHTML = navbarHTML;

    // Set username
    const username = localStorage.getItem("username") || "User";
    document.getElementById("username").innerText = username;
});
document.addEventListener("click", function (event) {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");

    // If clicked outside menu and not hamburger
    if (
        !menu.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {
        menu.classList.remove("active");
    }
});


function navigate(page) {
    const container = document.getElementById("content");

    let content = "";

    switch (page) {
        // case "reservation":
    // fetch("reservation.html")
    //     .then(res => res.text())
    //     .then(data => {
    //         document.getElementById("content").innerHTML = data;

    //         document.getElementById("reservationForm")
    //             .addEventListener("submit", handleReservation);
    //     });
    // break;
    case "home":
    window.location.href = "home-page.html";
    break;
    case "reservation":
    window.location.href = "reservation.html";
    break;
//     case "billing":
//     window.location.href = "billing.html";
//     break;

// case "history":
//     window.location.href = "history.html";
//     break;

// case "bookings":
//     window.location.href = "bookings.html";
//     break;

// case "support":
//     window.location.href = "support.html";
//     break;
        case "billing":
            content = "<h2>Billing</h2><p>View your bills here.</p>";
            break;
        case "history":
            content = "<h2>History</h2><p>Past bookings.</p>";
            break;
        case "bookings":
            content = "<h2>Bookings</h2><p>Your current bookings.</p>";
            break;
        case "support":
            content = "<h2>Support</h2><p>Contact support team.</p>";
            break;
    }

    container.innerHTML = content;
}

function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

function closeMenu() {
    document.getElementById("menu").classList.remove("active");
}

function logout() {
    localStorage.removeItem("username");

    document.body.classList.add("slide-to-right");
    setTimeout(() => {
        window.location.href = "./login.html";
    }, 500);
}


function handleReservation(e) {
    e.preventDefault();

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const room = document.getElementById("room").value;
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!checkin || !checkout || !room || !name || !contact) {
        alert("Please fill all fields");
        return;
    }

    if (isNaN(contact)) {
        alert("Contact must be numeric");
        return;
    }
    if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out must be after Check-in date");
        return;
    }
    const bookingId = "BOOK" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById("successMsg").innerHTML = `
        ✅ Reservation Successful <br>
        Booking ID: <b>${bookingId}</b>
    `;
    document.getElementById("reservationForm").reset();
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservationForm");

    if (form) {
        form.addEventListener("submit", handleReservation);
    }
});