// Datos para los modales
const projectsData = {
    ingles: {
        title: "Inglés para Niños",
        description: "Nuestro programa de inglés infantil utiliza el método 'Learning by Doing' donde los niños aprenden mediante actividades prácticas. Cada semana exploramos un tema nuevo a través de juegos de rol, manualidades temáticas y canciones interactivas. Los grupos son reducidos (máximo 8 alumnos) para garantizar atención personalizada.",
        images: [
            "https://source.unsplash.com/random/600x400/?kids-learning",
            "https://source.unsplash.com/random/600x400/?english-game",
            "https://source.unsplash.com/random/600x400/?children-class",
            "https://source.unsplash.com/random/600x400/?english-teacher"
        ],
        details: [
            "Edades: 4 a 12 años (grupos por niveles)",
            "Horarios: Lunes y Miércoles 4:00pm - 5:30pm",
            "Duración: 6 meses (48 sesiones)",
            "Incluye: Material didáctico y certificado",
            "Profesores: Nativos certificados"
        ]
    },
    pintura: {
        title: "Taller de Acuarela",
        description: "En nuestro taller de acuarela explorarás técnicas profesionales mientras desarrollas tu estilo personal. Cada sesión incluye demostraciones en vivo, ejercicios guiados y tiempo para creación libre. Trabajamos con materiales de alta calidad y al final del curso organizamos una exposición con las mejores obras de los alumnos.",
        images: [
            "https://source.unsplash.com/random/600x400/?watercolor-painting",
            "https://source.unsplash.com/random/600x400/?art-class",
            "https://source.unsplash.com/random/600x400/?painting-workshop",
            "https://source.unsplash.com/random/600x400/?artist-working"
        ],
        details: [
            "Niveles: Principiante e Intermedio",
            "Horarios: Martes y Jueves 6:00pm - 8:00pm",
            "Duración: 3 meses (24 sesiones)",
            "Incluye: Materiales básicos (pinceles, acuarelas, papel)",
            "Requisitos: Ninguno, solo ganas de aprender"
        ]
    },
    lectura: {
        title: "Club de Lectura",
        description: "Nuestro club de lectura es un espacio para amantes de los libros donde analizamos obras seleccionadas mensualmente. Cada sesión incluye: contextualización histórica, análisis literario y debate guiado. También organizamos encuentros con autores y visitas a ferias del libro. Los miembros reciben el libro del mes con anotaciones especiales de nuestro equipo.",
        images: [
            "https://source.unsplash.com/random/600x400/?book-discussion",
            "https://source.unsplash.com/random/600x400/?library",
            "https://source.unsplash.com/random/600x400/?reading-group",
            "https://source.unsplash.com/random/600x400/?bookshelf"
        ],
        details: [
            "Frecuencia: Reuniones semanales los viernes",
            "Horario: 6:00pm - 8:00pm",
            "Membresía: $50/mes (incluye libro físico)",
            "Géneros: Rotamos entre clásicos, contemporáneo y no-ficción",
            "Facilitador: Profesor de literatura con 10 años de experiencia"
        ]
    }
};

// Funcionalidad de pestañas
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Gestión del modal mejorada
class ModalManager {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.scrollPosition = 0;
        this.isOpen = false;
        
        this.boundHandleEscape = this.handleEscape.bind(this);
        this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
    open() {
        if (this.isOpen) return;
        
        this.scrollPosition = window.pageYOffset;
        this.isOpen = true;
        this.modal.style.display = 'block';
        
        // Bloquear scroll del body
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.classList.add('modal-open');
        
        // Agregar event listeners
        document.addEventListener('keydown', this.boundHandleEscape);
        this.modal.addEventListener('click', this.boundHandleOutsideClick);
    }
    
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.modal.style.display = 'none';
        
        // Restaurar scroll del body
        document.body.classList.remove('modal-open');
        window.scrollTo(0, this.scrollPosition);
        document.body.style.top = '';
        
        // Remover event listeners
        document.removeEventListener('keydown', this.boundHandleEscape);
        this.modal.removeEventListener('click', this.boundHandleOutsideClick);
    }
    
    handleEscape(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
    
    handleOutsideClick(e) {
        if (e.target === this.modal) {
            this.close();
        }
    }
}

// Inicialización del modal
const modal = new ModalManager('infoModal');
const closeBtn = document.querySelector('.close');
const moreInfoBtns = document.querySelectorAll('.more-info-btn');

// Configurar botones "Más información"
moreInfoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectsData[projectId];

        // Actualizar contenido del modal
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Configurar galería de imágenes
        const gallery = document.getElementById('modalGallery');
        gallery.innerHTML = '';
        project.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = project.title;
            gallery.appendChild(img);
        });

        // Configurar lista de detalles
        const detailsList = document.getElementById('modalDetails');
        detailsList.innerHTML = '';
        project.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });

        // Abrir modal
        modal.open();
    });
});

// Configurar botón de cerrar
closeBtn.addEventListener('click', () => modal.close());

// Funcionalidad del menú (igual que en tu original)
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        mainContent.classList.toggle('shrink');
        
        // Cambiar ícono de hamburguesa a X cuando está abierto
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic fuera de él (solo en móviles)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            mainContent.classList.remove('shrink');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});
