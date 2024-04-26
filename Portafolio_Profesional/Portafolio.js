// Función para cambiar el idioma
function toggleLanguage() {
    const content = document.getElementById("content");
    const navbar = document.querySelector(".navbar");
    const languageSwitch = document.getElementById("languageSwitch");

    // Verifica el estado del interruptor
    if (languageSwitch.checked) {
        // Traduce el contenido al inglés
        translateContent(content, "en");
        translateNavbar(navbar, "en");
    } else {
        // Traduce el contenido al español
        translateContent(content, "es");
        translateNavbar(navbar, "es");
    }
}

// Función para traducir el contenido
function translateContent(content, targetLanguage) {
    // Obtiene todos los elementos de texto dentro del contenedor
    const textElements = content.querySelectorAll("h1, p, h2, button, span, label, placeholder, small");

    // Itera sobre cada elemento y traduce su contenido
    textElements.forEach(element => {
        const textToTranslate = element.textContent;

        // Realiza la traducción usando la API de Google Translate
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(textToTranslate)}`)
            .then(response => response.json())
            .then(data => {
                // Actualiza el contenido traducido
                const translatedText = data[0][0][0];
                element.textContent = translatedText;
            })
            .catch(error => console.error("Error al traducir:", error));
    });
}

// Función para traducir el navbar
function translateNavbar(navbar, targetLanguage) {
    // Obtiene todos los enlaces dentro del navbar
    const linkElements = navbar.querySelectorAll(".nav-links li a");

    // Itera sobre cada enlace y traduce su texto
    linkElements.forEach(link => {
        const textToTranslate = link.textContent;

        // Realiza la traducción usando la API de Google Translate
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(textToTranslate)}`)
            .then(response => response.json())
            .then(data => {
                // Actualiza el texto traducido del enlace
                const translatedText = data[0][0][0];
                link.textContent = translatedText;
            })
            .catch(error => console.error("Error al traducir:", error));
    });
}

document.getElementById("downloadCVSpanish").addEventListener("click", function() {
    // Descargar el CV en español
    window.open('CV_Español.pdf', '_blank');
});

document.getElementById("downloadCVEnglish").addEventListener("click", function() {
    // Descargar el CV en inglés
    window.open('CV_Ingles.pdf', '_blank');
});

document.addEventListener("DOMContentLoaded", function() {
    const aboutMeSection = document.querySelector(".AboutMe-section");
    aboutMeSection.classList.remove("hidden");
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollButton").style.display = "block"; /* Mostrar el botón al desplazarse hacia abajo */
    } else {
        document.getElementById("scrollButton").style.display = "none"; /* Ocultar el botón al volver arriba */
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; /* Para navegadores Safari */
    document.documentElement.scrollTop = 0; /* Para otros navegadores */
}
  

const form = document.getElementById('form');
form.addEventListener('submit', handleSendEmail);
async function handleSendEmail(event) {
  event.preventDefault();
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const response = await fetch('https://formspree.io/f/myyrlzev', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });
    if (response.ok) {
      form.reset();
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: '¡Gracias por ponerte en contacto con nosotros!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos correctamente.'
    });
  }
}
form.addEventListener('submit', handleSendEmail);


//Carrusel
let currentIndex = 0;

document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1);
});

document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1);
});

function navigate(direction) {
    const galleryContainer = document.querySelector('.gallery-container');
    const totalImages = document.querySelectorAll('.gallery-item').length;

    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    const offset = -currentIndex * 100;

    galleryContainer.style.transform = `translateX(${offset}%)`;
}



// Traducción inicial al español
toggleLanguage();

