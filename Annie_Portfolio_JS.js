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

// let darkModeIcon = document.querySelector('#darkMode-icon');
// darkModeIcon.onclick = () => {
//    darkModeIcon.classList.toggle('bx-sun');
//    document.body.classList.toggle('dark-mode');
// };

ScrollReveal({
   reset : true,
   distance : '80px',
   duration : 1000,
   delay : 100
});

ScrollReveal().reveal('.home-content .heading', {origin: 'top'});
// ScrollReveal().reveal('.home-img img, .project-list', '.form', {origin: 'bottom'});

const roles = document.querySelectorAll('.role');
let currentRoleIndex = 0;

function rotateRoles() {
    roles[currentRoleIndex].classList.remove('active');
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    roles[currentRoleIndex].classList.add('active');
}

// Start role rotation
setInterval(rotateRoles, 3000);


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

document.addEventListener('DOMContentLoaded', () => {
    const publicationsData = [
        {
            id: 'pub1',
            title: 'MiGa: Multi-Chicken Gait Assessment',
            meta: 'Under Review in Smart Agricultural Technology Journal, 2025',
            abstract: 'Broiler chicken production is a major agricultural industry, yet it faces persistent challenges related to animal welfare most notably, lameness caused by selective breeding for rapid growth. Traditional gait assessment methods, such as Kestin scoring system, obstacle tests, and latency-to-lie, have been valuable but they are typically limited to single-bird evaluations in controlled environments, require trained personnel, and are slow due to their manual nature. In this work, we introduce MiGa, a multi-chicken gait assessment system that leverages computer vision and machine learning to automatically evaluate the gait of multiple birds simultaneously in more naturalistic settings. Our approach integrates four components: a multi-bird detector, a pose estimator, a tracking module, and a gait-score regressor. To support development and benchmarking, we introduce the GAIT dataset suite, which includes dedicated datasets for detection, pose extraction, tracking, and gait-score prediction. This system enables scalable, automated locomotion assessment in realistic multi-bird scenarios, contributing toward improved welfare monitoring in broiler production.',
            link: 'https://uark-aicv.github.io/MiGa/'
        },
        {
            id: 'pub2',
            title: 'DualFit: A Two-Stage Virtual Try-On via Warping and Synthesis',
            meta: 'Accepted in RetailVisionICCV2025',
            abstract: 'Virtual Try-On (VTON) technology has garnered significant attention for its potential to transform the online fashion retail experience by allowing users to visualize how garments would look on them without physical trials. While recent advances in diffusion-based warping-free methods have improved perceptual quality, they often fail to preserve fine-grained garment details such as logos and printed text—elements that are critical for brand integrity and customer trust. In this work, we propose DualFit, a hybrid VTON pipeline that addresses this limitation by two-stage approach. In the first stage, DualFit warps the target garment to align with the person image using a learned flow field, ensuring high-fidelity preservation. In the second stage, a fidelity-preserving try-on module synthesizes the final output by blending the warped garment with preserved human regions. Particularly, to guide this process, we introduce a preserved-region input and an inpainting mask, enabling the model to retain key areas and regenerate only where necessary, particularly around garment seams. Extensive qualitative results show that DualFit achieves visually seamless try-on results while faithfully maintaining high-frequency garment details, striking an effective balance between reconstruction accuracy and perceptual realism.',
            link: ''
        },
        {
            id: 'pub3',
            title: 'Raspberry PI Based Intelligent Car Parking System',
            meta: 'Published in IEEE Xplore, 2021',
            abstract: 'One of the biggest problems in bustling cities is finding vacant parking spaces. Drivers face huge difficulties when trying to find an apt parking spot. India has one of the lowest vehicles to parking spots ratios across the world. For every 25, 00,000 registered vehicles, our country has a scanty number of 1800 of parking spots. Therefore, there is a need for an efficient car parking system. Our paper proposes an intelligent car parking system that helps drivers book parking spots through a Cloud-based IoT system. The parking spot is then allocated through the Open CV recognition method. Once a driver books a parking slot, a unique QR code is generated unique to them. The QR code helps in monitoring and authenticating vehicles without direct contact. The QR code algorithm updates the information regarding the availability of parking spots in a particular area on a website. After booking a parking slot, the drivers unique QR code is scanned through the Open CV recognition system. This way, unauthorized parking and congestion of parking spots can be reduced drastically.',
            link: 'https://ieeexplore.ieee.org/document/9588971' 
        },
        {
            id: 'pub4',
            title: 'Efficient Power Generation to Automated Street Lights based on Traffic Density',
            meta: 'IEEE Xplore, 2021',
            abstract: 'The rise in industrialization and technological developments has led to a simultaneous rise in environmental threats and energy depletion. Therefore, it is high time channelled for the evolution of technology towards developing devices that are energy-efficient and environment-friendly. In any developed or developing country, one of the major areas of power wastage is public lighting. The amount of power consumed by street lights in a year is 1/6 of the global energy produced. Most of this energy is wasted in unnecessary illumination - that is, street lights stay ON even in the absence of people or vehicles. This is a depletion of energy and capital. Therefore, it is inevitable for the government to implement an automated street lighting system that enables efficient power consumption. An energy-efficient power generating system is implemented in this proposed model that automates street lights based on traffic density.Traffic density is a measure of the number of vehicles that pass a particular area over a period of time. Based on this information, this paper proposes a smart upgrade to the street lighting system.',
            link: 'https://ieeexplore.ieee.org/document/9418389' 
        },

        {
            id: 'pub5',
            title: 'Machine Learning in RF Circuit Optimization',
            meta: 'International Journal of RF and Microwave Engineering, 2019',
            abstract: 'Applies machine learning algorithms to optimize the performance parameters of complex radio frequency circuits, demonstrating significant improvements in design efficiency.',
            link: 'https://example.com/pub5-link' // Replace with actual link
        },
        {
            id: 'pub6',
            title: 'Advanced MIMO Systems for Beyond 5G',
            meta: 'Wireless Communications and Mobile Computing, 2018',
            abstract: 'A comprehensive study on advanced Multiple-Input Multiple-Output (MIMO) techniques and their potential to enhance data throughput and spectral efficiency for future wireless communication systems.',
            link: 'https://example.com/pub6-link' // Replace with actual link
        },
    ];

    const pubTags = document.querySelectorAll('.pub-tag');
    const publicationViewer = document.getElementById('publicationViewer');
    const viewerContent = publicationViewer.querySelector('.viewer-content');
    const viewerPlaceholder = publicationViewer.querySelector('.viewer-placeholder');
    const viewerTitle = viewerContent.querySelector('.viewer-title');
    const viewerMeta = viewerContent.querySelector('.viewer-meta');
    const viewerAbstract = viewerContent.querySelector('.viewer-abstract');
    const viewerLink = viewerContent.querySelector('.viewer-link');

    const updateViewer = (publication) => {
        viewerTitle.textContent = publication.title;
        viewerMeta.textContent = publication.meta;
        viewerAbstract.textContent = publication.abstract;
        viewerLink.href = publication.link;
        viewerLink.setAttribute('aria-label', `View publication: ${publication.title}`);

        viewerPlaceholder.style.display = 'none';
        viewerContent.classList.add('active');
    };

    pubTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const pubId = tag.dataset.id;
            const selectedPub = publicationsData.find(pub => pub.id === pubId);

            pubTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            if (selectedPub) {
                updateViewer(selectedPub);
            }
        });
    });

    if (publicationsData.length > 0) {
        pubTags[0].classList.add('active'); 
        updateViewer(publicationsData[0]);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const categoryFolders = document.querySelectorAll('.category-folder'); 
    const projectModal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.close-button');
    const modalCategoryTitle = document.getElementById('modalCategoryTitle');
    const modalProjectList = document.querySelector('.modal-project-list');
    const projectDataContainer = document.getElementById('projectData'); 

    const categoryMap = {
        'ai': 'AI Projects',
        'electronics': 'Electronics Projects',
        'rf': 'RF Projects',
        'others': 'Other Projects'
    };

    const openModal = (category) => {
        modalCategoryTitle.textContent = categoryMap[category] || 'Projects'; 

        modalProjectList.innerHTML = ''; 

        const projectsInCategory = projectDataContainer.querySelectorAll(`.project-item[data-category="${category}"]`);

        projectsInCategory.forEach(projectItem => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            const img = projectItem.querySelector('img') ? projectItem.querySelector('img').cloneNode(true) : null;
            const title = projectItem.querySelector('h3') ? projectItem.querySelector('h3').cloneNode(true) : null;
            const paragraph = projectItem.querySelector('p') ? projectItem.querySelector('p').cloneNode(true) : null;
            const link = projectItem.querySelector('a') ? projectItem.querySelector('a').cloneNode(true) : null;

            const projectInfo = document.createElement('div');
            projectInfo.classList.add('project-info');
            if (title) projectInfo.appendChild(title);
            if (paragraph) projectInfo.appendChild(paragraph);
            if (link) projectInfo.appendChild(link);

            if (img) projectCard.appendChild(img);
            projectCard.appendChild(projectInfo);

            modalProjectList.appendChild(projectCard);
        });

        projectModal.style.display = 'flex'; 
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        projectModal.style.display = 'none';
        document.body.style.overflow = ''; 
        categoryFolders.forEach(folder => folder.classList.remove('active'));
    };

    categoryFolders.forEach(folder => {
        folder.addEventListener('click', () => {
            categoryFolders.forEach(f => f.classList.remove('active'));
            folder.classList.add('active');

            const category = folder.dataset.category;
            openModal(category);
        });
    });

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == projectModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.style.display === 'flex') {
            closeModal();
        }
    });
});