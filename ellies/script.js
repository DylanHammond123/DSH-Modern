// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

// CLOSE MOBILE MENU WHEN A LINK IS CLICKED
const mobileLinks = mobileNav.querySelectorAll("a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("show");
  });
});

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// FAQ TOGGLE
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = answer.style.maxHeight;

    // close all
    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.style.maxHeight = null;
    });

    // open clicked one
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});