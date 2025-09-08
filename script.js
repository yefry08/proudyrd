'use strict';


const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}
// Event listener moved to the bottom of the file
// to avoid duplicate event listeners

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);

 const modal = document.getElementById("authModal");
  const btn = document.getElementById("openModal");
  const span = document.getElementById("closeModal");

  if (btn && modal && span) {
    btn.onclick = function(e) {
      e.preventDefault();
      modal.style.display = "block";
    }
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  // JavaScript adicional para mejorar la responsividad

// Función para ajustar el modal según el tamaño de pantalla
function adjustModalForScreen() {
    const modal = document.getElementById('authModal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (window.innerWidth <= 768) {
        modalContent.style.margin = '10% auto';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflowY = 'auto';
    } else {
        modalContent.style.margin = '5% auto';
        modalContent.style.maxHeight = 'none';
        modalContent.style.overflowY = 'visible';
    }
}

// Función para cerrar modal con tecla Escape
function closeModalOnEscape(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('authModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

// Función para prevenir scroll del body cuando modal está abierto
function toggleBodyScroll(show) {
    if (show) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Mejorar la funcionalidad del modal existente
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('authModal');

    if (openModalBtn && modal && closeModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            toggleBodyScroll(true);
            adjustModalForScreen();
        });

        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            toggleBodyScroll(false);
        });

        // Cerrar modal haciendo clic fuera de él
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                toggleBodyScroll(false);
            }
        });
    }

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', adjustModalForScreen);
    
    // Escuchar tecla Escape
    document.addEventListener('keydown', closeModalOnEscape);
});

// Función para mejorar la navegación en móvil
function improveNavigation() {
    const navToggler = document.querySelector('[data-nav-toggler]');
    const navbar = document.querySelector('[data-navbar]');
    const navLinks = document.querySelectorAll('.navbar-link');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Cerrar navegación móvil al hacer clic en un enlace
                if (window.innerWidth <= 1199) {
                    navbar.classList.remove('active');
                    document.querySelector('[data-overlay]').classList.remove('active');
                }
            });
        });
    }
}

// Función para mejorar la experiencia táctil en móviles
function improveTouchExperience() {
    const cards = document.querySelectorAll('.category-card, .course-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Función para lazy loading de imágenes (opcional)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Función para ajustar elementos según orientación
function handleOrientationChange() {
    const isLandscape = window.innerHeight < window.innerWidth;
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && isLandscape) {
        // Ajustar padding para landscape móvil
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.paddingBlock = '40px';
        }
    } else if (isMobile) {
        // Restaurar padding para portrait móvil
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.paddingBlock = '';
        }
    }
}

// Función para detectar iOS y agregar clases específicas
function detectMobile() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const Android = /Android/.test(navigator.userAgent);
    
    if (iOS) {
        document.body.classList.add('ios-device');
    }
    if (Android) {
        document.body.classList.add('android-device');
    }
    
    // Agregar clase para dispositivos táctiles
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// Inicializar funciones
document.addEventListener('DOMContentLoaded', function() {
    improveNavigation();
    improveTouchExperience();
    detectMobile();
    
    // Solo cargar lazy loading si es compatible
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
});

// Escuchar cambios de orientación
window.addEventListener('orientationchange', function() {
    setTimeout(handleOrientationChange, 500);
});

// Optimización para scroll suave
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Aplicar smooth scroll a enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            smoothScrollToSection(targetId);
        }
    });
});

const botonAbrir = document.getElementById('abrirInterfaz');
const botonAbrir2 = document.getElementById('abrirInterfaz2');
const botonAbrir3 = document.getElementById('abrirInterfaz3');
const cerrarInterfaz = document.getElementById('cerrarInterfaz');
const cerrarInterfaz3 = document.getElementById('cerrarInterfaz3');
const interfaces = document.querySelectorAll('.interfaz-fullscreen');
const body = document.body;

// Abrir interfaz (pantalla completa)
if (botonAbrir) {
  botonAbrir.addEventListener('click', () => {
    // Mostrar la primera interfaz (índice 0)
    if (interfaces[0]) {
      interfaces[0].hidden = false;
      body.classList.add('interfaz-abierta'); // Desactiva scroll del body
    }
  });
}

// Manejar el botón abrirInterfaz2 para abrir la primera interfaz
if (botonAbrir2) {
  botonAbrir2.addEventListener('click', () => {
    const interfaz2 = document.getElementById('interfaz2');
    if (interfaz2) {
      interfaz2.hidden = false;
      body.classList.add('interfaz-abierta');
    }
  });
}

// Manejar el botón abrirInterfaz3 para abrir la segunda interfaz
if (botonAbrir3) {
  botonAbrir3.addEventListener('click', () => {
    const interfaz3 = document.getElementById('interfaz3');
    if (interfaz3) {
      interfaz3.hidden = false;
      body.classList.add('interfaz-abierta');
    }
  });
}

// Cerrar interfaz - agregar event listeners a los botones de cerrar
if (cerrarInterfaz) {
  cerrarInterfaz.addEventListener('click', () => {
    const interfaz2 = document.getElementById('interfaz2');
    if (interfaz2) {
      interfaz2.hidden = true;
    }
    body.classList.remove('interfaz-abierta');
  });
}

if (cerrarInterfaz3) {
  cerrarInterfaz3.addEventListener('click', () => {
    const interfaz3 = document.getElementById('interfaz3');
    if (interfaz3) {
      interfaz3.hidden = true;
    }
    body.classList.remove('interfaz-abierta');
  });
}