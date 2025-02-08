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
  const navEl = document.querySelector(".nav");
  const navLogoEl = document.querySelector(".nav__logo");
  const menuTogglerEl = document.querySelector(".toggler-box");
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
    console.log("clicked");
    const pageHeaderEl = document.querySelector(".page-header");
    pageHeaderEl.classList.toggle("nav-open");
    navEl.classList.toggle("unblur");

    navLogoEl.classList.add("bring-forward");
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