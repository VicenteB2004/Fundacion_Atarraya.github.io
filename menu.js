const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const footer = document.querySelector('.footer');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('shrink');
    
    // Añadir la clase "shrink" al footer cuando el menú está abierto
    footer.classList.toggle('shrink', sidebar.classList.contains('open'));
});
