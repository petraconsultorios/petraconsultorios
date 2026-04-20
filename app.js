// =====================================================
// ESPERAR A QUE CARGUE TODO EL DOM
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Página Petra Consultorios cargada completamente');
    inicializarMenu();
    inicializarFormulario();
    inicializarNavegacion();
    inicializarAnimaciones();

    // Año dinámico en el footer
    var footerYear = document.getElementById('footerYear');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
});

// =====================================================
// MENÚ HAMBURGUESA MÓVIL
// =====================================================
function inicializarMenu() {
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    var navOverlay = document.getElementById('navOverlay');
    var enlaces = navLinks.querySelectorAll('a');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// =====================================================
// FORMULARIO DE CONTACTO - WHATSAPP
// =====================================================
function inicializarFormulario() {
    var form = document.getElementById('contactForm');
    var submitBtn = document.getElementById('submitBtn');
    var formMessage = document.getElementById('formMessage');

    if (!form) {
        console.error('No se encontro el formulario');
        return;
    }

    function mostrarMensaje(texto, tipo) {
        formMessage.textContent = texto;
        formMessage.className = 'form-message show ' + tipo;
        setTimeout(function() {
            formMessage.classList.remove('show');
        }, 5000);
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    var inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() { validarCampo(this); });
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) validarCampo(this);
        });
    });

    function validarCampo(campo) {
        var valor = campo.value.trim();
        campo.classList.remove('error', 'success');
        if (campo.hasAttribute('required') && !valor) {
            campo.classList.add('error');
            return false;
        }
        if (valor) campo.classList.add('success');
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var nombre = document.getElementById('nombreCompleto').value.trim();
        var telefono = document.getElementById('telefono').value.trim();
        var edad = document.getElementById('edad').value.trim();
        var especialidad = document.getElementById('especialidad').value;
        var mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || nombre.length < 2) {
            mostrarMensaje('Por favor ingresa tu nombre completo', 'error');
            document.getElementById('nombreCompleto').classList.add('error');
            document.getElementById('nombreCompleto').focus();
            return false;
        }

        if (!telefono) {
            mostrarMensaje('Por favor ingresa tu numero de telefono', 'error');
            document.getElementById('telefono').classList.add('error');
            document.getElementById('telefono').focus();
            return false;
        }

        if (!edad || isNaN(edad) || Number(edad) < 1 || Number(edad) > 120) {
            mostrarMensaje('Por favor ingresa una edad valida', 'error');
            document.getElementById('edad').classList.add('error');
            document.getElementById('edad').focus();
            return false;
        }

        if (!especialidad) {
            mostrarMensaje('Por favor selecciona una especialidad', 'error');
            document.getElementById('especialidad').classList.add('error');
            document.getElementById('especialidad').focus();
            return false;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        var btnText = submitBtn.querySelector('.btn-text');
        var btnLoader = submitBtn.querySelector('.btn-loader');
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';

        var textoWhatsApp = '*SOLICITUD DE TURNO*\n';
        textoWhatsApp += '*Petra Consultorios Boutique*\n\n';
        textoWhatsApp += '*Nombre:* ' + nombre + '\n';
        textoWhatsApp += '*Edad:* ' + edad + ' años\n';
        textoWhatsApp += '*Telefono:* ' + telefono + '\n';
        textoWhatsApp += '*Especialidad:* ' + especialidad;
        if (mensaje) textoWhatsApp += '\n\n*Motivo de consulta:*\n' + mensaje;

        var mensajeCodificado = encodeURIComponent(textoWhatsApp);
        var urlWhatsApp = 'https://wa.me/5492216712102?text=' + mensajeCodificado;

        mostrarMensaje('Abriendo WhatsApp...', 'success');

        setTimeout(function() {
            var ventana = window.open(urlWhatsApp, '_blank');
            if (!ventana) window.location.href = urlWhatsApp;

            setTimeout(function() {
                form.reset();
                inputs.forEach(function(input) {
                    input.classList.remove('error', 'success');
                });
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                if (btnText) btnText.style.display = 'inline-block';
                if (btnLoader) btnLoader.style.display = 'none';
                mostrarMensaje('Formulario listo. Podes solicitar otro turno cuando quieras.', 'success');
            }, 2000);
        }, 500);

        return false;
    });
}

// =====================================================
// NAVEGACION SUAVE
// =====================================================
function inicializarNavegacion() {
    var enlacesInternos = document.querySelectorAll('a[href^="#"]');

    enlacesInternos.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var objetivo = document.querySelector(href);
            if (objetivo) {
                var headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: objetivo.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    var header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.style.boxShadow = window.pageYOffset > 50
            ? '0 4px 20px rgba(0, 0, 0, 0.15)'
            : '0 2px 10px rgba(71, 112, 167, 0.2)';
    });
}

// =====================================================
// ANIMACIONES AL HACER SCROLL
// =====================================================
function inicializarAnimaciones() {
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.service-card, .profesional-card').forEach(function(tarjeta) {
            tarjeta.style.opacity = '0';
            tarjeta.style.transform = 'translateY(30px)';
            tarjeta.style.transition = 'all 0.6s ease';
            observer.observe(tarjeta);
        });
    } else {
        document.querySelectorAll('.service-card, .profesional-card').forEach(function(tarjeta) {
            tarjeta.style.opacity = '1';
        });
    }
}

// =====================================================
// PREVENIR ZOOM EN INPUTS EN iOS
// =====================================================
(function() {
    document.querySelectorAll('input, select, textarea').forEach(function(input) {
        input.addEventListener('focus', function() {
            if (parseFloat(window.getComputedStyle(this).fontSize) < 16) {
                this.style.fontSize = '16px';
            }
        });
    });
})();

// =====================================================
// VALIDACION DE CARACTERES EN TIEMPO REAL
// =====================================================
(function() {
    var nombreInput = document.getElementById('nombreCompleto');
    var telefonoInput = document.getElementById('telefono');

    if (nombreInput) {
        nombreInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        });
    }

    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d\s\-\(\)\+]/g, '');
        });
    }
})();
// Submenu toggle mobile
document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth < 1024) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.style.display =
                submenu.style.display === 'flex' ? 'none' : 'flex';
        }
    });
});
