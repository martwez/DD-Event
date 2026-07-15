document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mmenu');

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  document.querySelectorAll('.faq-q').forEach((question) => {
    question.addEventListener('click', () => {
      question.parentElement.classList.toggle('open');
    });
  });
});
