// public/js/contacto.js

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("dJW3eHZQ03G2p6uCS");

    const form = document.getElementById("contactoForm");
    const respuesta = document.getElementById("respuesta");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm('service_m6sh6aw', 'template_r4d3r73', this)
            .then(function () {
                respuesta.textContent = "¡Mensaje enviado correctamente!";
                respuesta.style.color = "green";
                form.reset();
            }, function (error) {
                console.error("Error:", error);
                respuesta.textContent = "Error al enviar el mensaje. Intenta de nuevo.";
                respuesta.style.color = "red";
            });
    });
});

