document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const miniaturas = document.querySelectorAll('.imagen-miniatura');
    const modal = document.querySelector('.modal-carrusel');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const slidesContainer = document.querySelector('.carrusel-slides');
    const slides = document.querySelectorAll('.carrusel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Función para abrir el modal y mostrar la imagen seleccionada
    function abrirModal(index) {
        currentIndex = index;
        actualizarCarrusel();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evita el scroll en el fondo
    }
    
    // Función para cerrar el modal
    function cerrarModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura el scroll
    }
    
    // Función para actualizar el carrusel
    function actualizarCarrusel() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualiza los indicadores
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[currentIndex].classList.add('active');
    }
    
    // Eventos para las miniaturas
    miniaturas.forEach((miniatura, index) => {
        miniatura.addEventListener('click', () => {
            abrirModal(index);
        });
    });
    
    // Evento para cerrar el modal
    cerrarModal.addEventListener('click', cerrarModalFunc);
    
    // Cerrar modal al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModalFunc();
        }
    });
    
    // Navegación del carrusel
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        actualizarCarrusel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        actualizarCarrusel();
    });
    
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
                actualizarCarrusel();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
                actualizarCarrusel();
            } else if (e.key === 'Escape') {
                cerrarModalFunc();
            }
        }
    });
    
    // Navegación por indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'));
            actualizarCarrusel();
        });
    });
});