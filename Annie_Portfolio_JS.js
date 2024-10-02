let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navBar');

menuIcon.onclick = () => {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
   sections.forEach(sec =>{
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if(top >= offset && top <offset + height){
         navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
         });
      };
   });
};

let darkModeIcon = document.querySelector('#darkMode-icon');
darkModeIcon.onclick = () => {
   darkModeIcon.classList.toggle('bx-sun');
   document.body.classList.toggle('dark-mode');
};

ScrollReveal({
   reset : true,
   distance : '80px',
   duration : 1000,
   delay : 100
});

ScrollReveal().reveal('.home-content .heading', {origin: 'top'});
// ScrollReveal().reveal('.home-img img, .project-list', '.form', {origin: 'bottom'});

//About Me Page
document.addEventListener("DOMContentLoaded", function() {
   const button = document.querySelector("#read-more-button");
   const content = document.querySelector(".read-more-content");

   button.addEventListener("click", function() {
       content.classList.toggle("open");
       if (content.classList.contains("open")) {
           button.textContent = "Read Less";
       } else {
           button.textContent = "Read More";
       }
   });
});


//Contact Page submit button

const form = document.getElementById('form');
const username = document.getElementById('inputName');
const email = document.getElementById('email');
const message = document.getElementById('message');
const popup = document.getElementById('pop-up');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  state = checkInputs();
  if(state)
  {
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  popup.innerHTML = `
                    <div class="popup-content">
                      <div class="icon-container">
                        <div class="loader"></div>
                      </div>
                      <h2>Please Wait.....</h2>
                    </div>`;
  popup.style.visibility = "visible";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
               popup.innerHTML = `
                    <div class="popup-content">
                      <div class="icon-container">
                        <div class="checkmark-circle">
                          <div class="checkmark"></div>
                        </div>
                      </div>
                      <h2> Thank You! </h2>
                      <p>${json.message}</p>
                    </div>`;
            } else {
                console.log(response);
                popup.innerHTML = `
                    <div class="popup-content">
                      <div class="icon-container">
                        <div class="warning-icon">
                           <span class="exclamation">!</span>
                        </div>
                      </div>
                      <h2> Something went wrong! Try Again.</h2>
                      <p>${json.message}</p>
                    </div>`;
            }
        })
        .catch(error => {
            console.log(error);
            popup.innerHTML = `
                    <div class="popup-content">
                      <div class="icon-container">
                        <div class="error-icon">
                           <span class="cross">✖</span>
                        </div>
                      </div>
                      <h2> Error </h2>
                      <p>Kindly reach out through the email provided in the website.</p>
                    </div>`;
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
               popup.style.visibility = "hidden";
            }, 3000);
        });
   }
});


function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const messageValue = message.value.trim();

	flag =1;

	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
      flag =0;
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
      flag=0;
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
      flag=0;
	} else {
		setSuccessFor(email);
	}
	
	if(messageValue === '') {
		setErrorFor(message, 'Message cannot be blank');
      flag=0;
	} else {
		setSuccessFor(message);
	}

   return flag==1 ? true: false;

}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-group error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-group';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}