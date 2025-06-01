document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactoForm");
  const respuesta = document.getElementById("respuesta");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    try {
      const res = await fetch("https://formsubmit.co/fundacionatarraya2024@yahoo.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        respuesta.textContent = "✅ ¡Tu mensaje ha sido enviado con éxito!";
        respuesta.style.color = "green";
        form.reset();
      } else {
        respuesta.textContent = "❌ Ocurrió un error al enviar el mensaje.";
        respuesta.style.color = "red";
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      respuesta.textContent = "❌ Error de conexión al enviar el mensaje.";
      respuesta.style.color = "red";
    }
  });
});
