export function crearContenidoFooter() {
    const contenedorFooter = document.getElementById('footer');
    // Creo los elementos:
    const footerTopContainer = document.createElement('div');
    const footerBottomContainer = document.createElement('div');
    contenedorFooter.innerHTML = '';
    footerTopContainer.classList.add('ftTop');
    footerBottomContainer.classList.add('ftBottom');
    // Contenido en el Footer Top:
    footerTopContainer.innerHTML = `
    <!-- Sección con Nombre de empresa y teléfono de Contacto -->
    <section class="ftTopSection">
        <h1 class="ftTopSectH1">Chevrolet</h1>
        <p class="ftTopSectP">Teléfono de Contacto: +5942804303327</p>
    </section>
    <!-- Redes Sociales -->
    <section class="ftTopSection">
        <a href="https://www.facebook.com/ChevroletArgentina/?locale=es_LA" target="_blank" class="ftTopSectLink"><i class="fa-brands fa-facebook fa-xl"></i></a>
        <a href="https://www.instagram.com/chevroletarg/?hl=es" target="_blank" class="ftTopSectLink" id="ftTopSectLinkInstagram"><i class="fa-brands fa-instagram fa-xl"></i></a>
    </section>
    `;
    //Contenido en el Footer Bottom:
    footerBottomContainer.innerHTML = `
    <section class="ftBottomSection">
        <!-- Contacto mío -->
        <p class="ftBottomSectP">Sitio desarrollado por Mendieta, Emiliano Manuel</p>
        <p class="ftBottomSectP">Email: emmendieta12@gmail.com</p>
    </section>
    <!-- LinkedIn -->
    <section class="ftBottomSection">
        <a href="https://www.linkedin.com/in/emiliano-manuel-mendieta-739630221/" target="_blank" class="ftBottomSectLink"><i class="fa-brands fa-linkedin-in fa-xl"></i></a>
    </section>
    `;
    contenedorFooter.appendChild(footerTopContainer);
    contenedorFooter.appendChild(footerBottomContainer);
}