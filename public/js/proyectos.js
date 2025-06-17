document.addEventListener('DOMContentLoaded', function() {
    // Datos para los modales
    const projectsData = {
        ingles: {
            title: "Inglés para Niños",
            description: "Programa interactivo para aprender inglés mediante juegos y actividades...",
            images: ["img/ingles1.jpg", "img/ingles2.jpg"],
            details: ["Edades: 4-12 años", "Horarios: Lunes y Miércoles"]
        },
        pintura: {
            title: "Taller de Acuarela",
            description: "Explora técnicas profesionales de pintura...",
            images: ["img/pintura1.jpg", "img/pintura2.jpg"],
            details: ["Niveles: Principiante/Intermedio", "Materiales incluidos"]
        },
        lectura: {
            title: "Club de Lectura",
            description: "Espacio para amantes de los libros...",
            images: ["img/lectura1.jpg", "img/lectura2.jpg"],
            details: ["Reuniones semanales", "Libro del mes incluido"]
        }
    };

    // Gestión del Modal
    class ModalManager {
        constructor() {
            this.modal = document.getElementById('infoModal');
            this.scrollPosition = 0;
            this.initModal();
        }
        
        initModal() {
            // Configurar botones "Más información"
            document.querySelectorAll('.more-info-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const projectId = e.currentTarget.dataset.project;
                    this.showModal(projectId);
                });
            });
            
            // Configurar botón de cerrar
            document.querySelector('.close').addEventListener('click', () => this.closeModal());
            
            // Cerrar al hacer clic fuera
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }
        
        showModal(projectId) {
            const project = projectsData[projectId];
            if (!project) return;
            
            // Actualizar contenido
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            
            // Configurar galería
            const gallery = document.getElementById('modalGallery');
            gallery.innerHTML = '';
            project.images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = project.title;
                gallery.appendChild(img);
            });
            
            // Configurar detalles
            const detailsList = document.getElementById('modalDetails');
            detailsList.innerHTML = '';
            project.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                detailsList.appendChild(li);
            });
            
            this.openModal();
        }
        
        openModal() {
            this.scrollPosition = window.pageYOffset;
            this.modal.style.display = 'block';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollPosition}px`;
            document.body.style.width = '100%';
        }
        
        closeModal() {
            this.modal.style.display = 'none';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, this.scrollPosition);
        }
    }

    // Inicializar modal
    const modalManager = new ModalManager();

    // Funcionalidad de pestañas
    function openTab(evt, tabName) {
        // Obtener todos los elementos de contenido y botones
        const tabContents = document.querySelectorAll('.tab-content');
        const tabButtons = document.querySelectorAll('.tab-button');
        
        // Ocultar todos los contenidos
        tabContents.forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Desactivar todos los botones
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mostrar el contenido seleccionado
        document.getElementById(tabName).style.display = 'block';
        
        // Activar el botón clickeado
        evt.currentTarget.classList.add('active');
    }

    // Asignar eventos a las pestañas
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Extraer el nombre de la pestaña del atributo onclick
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openTab(e, tabName);
        });
    });

    // Activar la primera pestaña por defecto
    const defaultTab = document.querySelector('.tab-button.active');
    if (defaultTab) {
        const tabName = defaultTab.getAttribute('onclick').match(/'([^']+)'/)[1];
        document.getElementById(tabName).style.display = 'block';
    }
});
