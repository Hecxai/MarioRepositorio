// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Obtener el club seleccionado
const selectedClub = localStorage.getItem('selectedClub');
const clubTitle = document.getElementById('clubTitle');
const clubDescription = document.getElementById('clubDescription');
const clubIcon = document.getElementById('clubIcon');
const clubNameInput = document.getElementById('clubName');


// Configurar la información del club según la selección
function setupClubInfo() {
    let title, description, iconClass;
    
    switch(selectedClub) {
        case 'ritmos-latinos':
            title = 'Ritmos Latinos';
            description = 'Registro al club de baile y ritmos latinos';
            iconClass = 'bi-music-note-beamed';
            break;
        case 'gimnasio':
            title = 'Gimnasio Universitario';
            description = 'Registro al gimnasio de la universidad';
            iconClass = 'bi-activity';
            break;
        case 'danza-folclorica':
            title = 'Danza Folclórica';
            description = 'Registro al club de danza tradicional';
            iconClass = 'bi-people-fill';
            break;
        default:
            title = 'Club Universitario';
            description = 'Registro al club';
            iconClass = 'bi-star-fill';
    }
    
    clubTitle.textContent = title;
    clubDescription.textContent = description;
    clubNameInput.value = selectedClub;
    
    // Agregar icono de Bootstrap Icons (necesitarías agregar el CDN en el head)
    clubIcon.innerHTML = `<i class="bi ${iconClass}"></i>`;
}

// Cargar información del club al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    if (!selectedClub) {
        window.location.href = 'index.html';
        return;
    }
    
    setupClubInfo();
    
    // Agregar Bootstrap Icons CDN dinámicamente
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css';
    document.head.appendChild(link);
});

// Manejar el envío del formulario
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    
    const studentData = {
        studentId: studentId,
        fullName: fullName,
        email: email,
        registrationDate: new Date()
    };
    
    // Guardar en Firestore en la colección del club correspondiente
    db.collection(selectedClub).add(studentData)
        .then(() => {
            // Mostrar mensaje de éxito
            document.getElementById('registrationForm').style.display = 'none';
            document.getElementById('successAlert').style.display = 'block';
            
            // Opcional: Limpiar el formulario después de 3 segundos
            setTimeout(() => {
                document.getElementById('registrationForm').reset();
                document.getElementById('registrationForm').style.display = 'block';
                document.getElementById('successAlert').style.display = 'none';
            }, 5000);
        })
        .catch((error) => {
            console.error("Error al registrar: ", error);
            alert("Ocurrió un error al registrar. Por favor intenta nuevamente.");
        });
});


// Velocidad de transición del carrusel
document.addEventListener('DOMContentLoaded', function () {
    var myCarousel = document.getElementById('miCarrusel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000,
        pause: 'hover',
        wrap: true
    });
});

function redirectToForm(club) {
    // Guardar el club seleccionado
    localStorage.setItem('selectedClub', club);

    // Redireccionar al formulario de registro
    window.location.href = 'registro.html';
}



