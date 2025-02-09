/* eslint-disable */

function intersectionObserver(animatedEls) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animatedEls.forEach(el => el.classList.add('slide-up'));
        observer.unobserve(entry.target); // Stop observing after in view
      }
    });
  });

  observer.observe(animatedEls[animatedEls.length - 1]);
}

function scrollTo(clickedEl, viewEl) {
  clickedEl.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: viewEl.offsetTop - 89.59, // Adjust based on your fixed nav height
      behavior: "smooth"
    });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  /******************************** ELEMENTS ********************************/
  const pageHeaderEl = document.querySelector('.page-header');
  const navMenuEl = document.querySelector('.nav__menu');
  const menuTogglerEl = document.querySelector('.toggler-box');
  const menuSVGEl = document.querySelector('.toggler-box .menu__open svg');
  const btnArrowDown = document.querySelector('.btn.btn--arrow.arrow-down svg');
  const videoEl = document.getElementById('myVideo');
  const meshEl = document.querySelector('.hero__mesh');
  const awardSectionEl = document.querySelector('.award-section');
  const scrollUpAnimatedAwardsEls = document.querySelectorAll('.scroll-up-animated--awards');
  const scrollToServicesBtnEl = document.getElementById('scrollToServicesBtn');
  const homeLinkEl = document.getElementById('homeLink');
  const servicesLinkEl = document.getElementById('servicesLink');
  const aboutLinkEl = document.getElementById('aboutLink');
  const projectsLinkEl = document.getElementById('projectsLink');
  const contactLinkEl = document.getElementById('contactLink');
  const servicesSectionEl = document.getElementById('servicesSection');
  const aboutSectionEl = document.getElementById('aboutSection');
  const projectsSectionEl = document.getElementById('projectsSection');
  const contactSectionEl = document.getElementById('contactSection');
  const projectsSet1Els = document.querySelectorAll('.projects-set--1');
  const projectsSet2Els = document.querySelectorAll('.projects-set--2');

  /*****************************************************************************************/
  /******************************** NAVIGATION TOGGLE ********************************/
  // Menu toggle implementation
  menuTogglerEl.addEventListener("click", () => {
    pageHeaderEl.classList.toggle("nav-open");

  });

  // Creating animations to certain objects if those objects are not interacted with.
  document.addEventListener('click', function (e) {
    // create a beating effect after 1 seconds if hamburger menu is not clicked.
    if (e.target && !e.target.matches('.toggler-box .menu__open svg')) {
      setTimeout(() => {
        menuSVGEl.classList.add("beat");
      }, 1000);
    }

    if (e.target && !e.target.matches('.btn.btn--arrow.arrow-down svg')) {
      setTimeout(() => {
        btnArrowDown.classList.add("slide-down");
      }, 1000);
    }
  });

  // Menu closed when menu box is opened.
  navMenuEl.addEventListener("click", () => {
    if (pageHeaderEl.classList.contains("nav-open"))
      pageHeaderEl.classList.remove("nav-open");
  });

  meshEl.style.display = 'none';

  // Remove blur and show mesh when the video is ready to play
  videoEl.addEventListener('canplaythrough', function () {
    videoEl.style.filter = 'blur(0)'; // Remove blur
    meshEl.style.display = 'block'; // Show mesh
  });

  // Scroll to services with arrow
  if (scrollToServicesBtnEl) {
    scrollTo(scrollToServicesBtnEl, servicesSectionEl);
  }

  // Scroll to home
  if (homeLinkEl) {
    homeLinkEl.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.page-header').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Scroll to services with link
  if (servicesLinkEl) {
    scrollTo(servicesLinkEl, servicesSectionEl);
  }

  // Scroll to about sections
  if (aboutLinkEl) {
    scrollTo(aboutLinkEl, aboutSectionEl);
  }

  // Scroll to about sections
  if (projectsLinkEl) {
    scrollTo(projectsLinkEl, projectsSectionEl);
  }

  // Scroll to about sections
  if (contactLinkEl) {
    scrollTo(contactLinkEl, contactSectionEl);
  }

  // Awards animation
  if (awardSectionEl) {
    const awardsArray = [...scrollUpAnimatedAwardsEls];
    awardsArray.push(awardSectionEl);
    intersectionObserver(awardsArray);
  }

  // Projects animation
  if (projectsSectionEl) {
    intersectionObserver(projectsSet1Els);
    intersectionObserver(projectsSet2Els);
  }
});