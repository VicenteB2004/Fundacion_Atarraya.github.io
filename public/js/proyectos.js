document.addEventListener('DOMContentLoaded', function() {
    // Datos de los proyectos
    const projectsData = {
        ingles: [
            {
                title: "Inglés para Niños",
                description: "Programa interactivo diseñado para que los niños aprendan inglés de forma natural mediante juegos, canciones y actividades prácticas.",
                images: ["public/img/ingles.jpg", "#"],
                details: [
                    "Edades: 4-12 años",
                    "Horarios: Viernes 15:00pm-16:00pm",
                    "Nivel: Principiante",
                    "Materiales incluidos"
                ]
            },
            {
                title: "Inglés para Adolescentes",
                description: "Clases dinámicas enfocadas en conversación y preparación para exámenes internacionales.",
                images: ["public/img/ingles3.jpg", "https://source.unsplash.com/random/300x200/?english-class,students"],
                details: [
                    "Edades: 13-18 años",
                    "Horarios: Martes y Jueves 17:00-18:30",
                    "Nivel: Intermedio",
                    "Preparación para exámenes"
                ]
            }
        ],
        pintura: [
            {
                title: "Taller de Acuarela",
                description: "Explora tu creatividad con nuestras clases de pintura donde aprenderás diversas técnicas con materiales profesionales.",
                images: ["public/img/arte1.jpg", "public/img/arte2.jpg"],
                details: [
                    "Edades: 8 años en adelante",
                    "Horarios: Viernes 15:00-17:00",
                    "Materiales básicos incluidos",
                    "Técnicas: Acuarela, acrílico"
                ]
            }
        ],
        lectura: [
            {
                title: "Club de Lectura Infantil",
                description: "Un espacio para compartir el amor por los libros, analizar obras literarias y participar en debates enriquecedores.",
                images: ["public/img/lectura1.jpg", "public/img/lectura2.jpg"],
                details: [
                    "Edades: 6-12 años",
                    "Horarios: Jueves 15:00pm-16:00pm",
                    "Libros proporcionados",
                    "Actividades lúdicas"
                ]
            },
            {
                title: "Club de Lectura para Adultos",
                description: "Espacio para discutir literatura contemporánea y clásicos con otros amantes de la lectura.",
                images: ["public/img/lectura3.jpg", "https://source.unsplash.com/random/300x200/?reading,adults"],
                details: [
                    "Edades: 18 años en adelante",
                    "Horarios: Miércoles 19:00-20:30",
                    "Temas mensuales",
                    "Discusiones guiadas"
                ]
            }
        ]
    };

    // Función para renderizar los proyectos
    function renderProjects() {
        Object.keys(projectsData).forEach(category => {
            const tabContent = document.getElementById(category);
            if (!tabContent) return;

            // Limpiar el contenido existente
            tabContent.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
            
            // Crear tarjetas para cada proyecto
            projectsData[category].forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.images[0]}" alt="${project.title}">
                    <div class="card-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <button class="btn more-info-btn" data-project="${category}" data-index="${index}">Más información</button>
                    </div>
                `;
                tabContent.appendChild(projectCard);
            });
        });

        // Asignar eventos a los botones "Más información"
        document.querySelectorAll('.more-info-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const projectId = this.getAttribute('data-project');
                const projectIndex = this.getAttribute('data-index');
                showModal(projectId, projectIndex);
            });
        });
    }

    // Función para mostrar el modal
    function showModal(projectId, projectIndex) {
        const project = projectsData[projectId][projectIndex];
        const modal = document.getElementById('infoModal');
        
        if (!project || !modal) return;

        // Llenar el modal con la información del proyecto
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // Llenar la galería de imágenes
        const gallery = document.getElementById('modalGallery');
        gallery.innerHTML = '';
        project.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = project.title;
            gallery.appendChild(img);
        });

        // Llenar los detalles
        const detailsList = document.getElementById('modalDetails');
        detailsList.innerHTML = '';
        project.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });

        // Mostrar el modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar el modal
    function closeModal() {
        const modal = document.getElementById('infoModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Función para cambiar entre pestañas
    function switchTab(event) {
        // Remover clase active de todos los botones
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Añadir clase active al botón clickeado
        event.target.classList.add('active');
        
        // Ocultar todos los contenidos
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Mostrar el contenido correspondiente
        const tabId = event.target.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'block';
    }

    // Asignar eventos a los botones de pestañas
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    // Cerrar modal al hacer clic en la X
    document.querySelector('.close').addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('infoModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Botón de inscripción
    document.getElementById('inscribirseBtn').addEventListener('click', function() {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfcV22NOSsZjAYPhz4haOjhE9fL80fANnLdoT_xNabq3iJArQ/viewform?usp=header', '_blank');
        // Aquí podrías redirigir a un formulario real
    });

    // Renderizar los proyectos al cargar la página
    renderProjects();

    // Mostrar la pestaña activa por defecto
    document.querySelector('.tab-button.active').click();
});
