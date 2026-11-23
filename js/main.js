document.addEventListener('DOMContentLoaded', function () {
    // Cerrar el menú móvil al pulsar un enlace
    const menu = document.getElementById('mainNav');
    document.querySelectorAll('#mainNav a').forEach(function (a) {
        a.addEventListener('click', function () {
            if (menu.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    // Envío del formulario (Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            const errorAlert = document.getElementById('formError');
            errorAlert.style.display = 'none';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    const nextPage = this.querySelector('input[name="_next"]').value;
                    contactForm.reset();
                    if (nextPage) {
                        window.location.href = nextPage;
                    }
                } else {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error ||
                        `El servidor respondió con error ${response.status}: ${response.statusText}`
                    );
                }
            } catch (error) {
                errorAlert.textContent = '';
                const title = document.createElement('strong');
                title.textContent = 'No se ha podido enviar el formulario: ';
                errorAlert.appendChild(title);
                errorAlert.appendChild(document.createTextNode(error.message + '. Por favor, inténtelo de nuevo o escríbanos a '));
                const mail = document.createElement('a');
                mail.href = 'mailto:lolavalle@icam.es';
                mail.textContent = 'lolavalle@icam.es';
                errorAlert.appendChild(mail);
                errorAlert.appendChild(document.createTextNode(' o llámenos al 656 42 61 46.'));
                errorAlert.style.display = 'block';
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});
