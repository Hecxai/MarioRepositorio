// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cargar todos los inscritos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    loadInscritos('ritmos-latinos', 'table-ritmos', 'count-ritmos');
    loadInscritos('gimnasio', 'table-gimnasio', 'count-gimnasio');
    loadInscritos('danza-folclorica', 'table-danza', 'count-danza');
});

// Función para cargar inscritos de un club específico
function loadInscritos(club, tableId, countId) {
    db.collection(club).orderBy('registrationDate', 'desc').get()
        .then((querySnapshot) => {
            const tableBody = document.getElementById(tableId);
            tableBody.innerHTML = '';
            let count = 0;

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                count++;

                // Formatear fecha
                const fechaRegistro = data.registrationDate?.toDate
                    ? formatDate(data.registrationDate.toDate())
                    : 'Fecha no disponible';

                // Crear fila según el club
                const row = document.createElement('tr');

                if (club === 'ritmos-latinos') {
                    row.innerHTML = `
                        <td>${data.studentId || 'N/A'}</td>
                        <td>${data.fullName || 'N/A'}</td>
                        <td>${data.email || 'N/A'}</td>
                        <td>${fechaRegistro}</td>
                        <td>
                            <button onclick="deleteInscrito('${club}', '${doc.id}')" class="btn btn-sm btn-danger">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    `;
                } else if (club === 'gimnasio') {
                    row.innerHTML = `
                        <td>${data.studentId || 'N/A'}</td>
                        <td>${data.fullName || 'N/A'}</td>
                        <td>${data.email || 'N/A'}</td>
                        <td>${fechaRegistro}</td>
                        <td>
                            <button onclick="deleteInscrito('${club}', '${doc.id}')" class="btn btn-sm btn-danger">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    `;
                } else if (club === 'danza-folclorica') {
                    row.innerHTML = `
                        <td>${data.studentId || 'N/A'}</td>
                        <td>${data.fullName || 'N/A'}</td>
                        <td>${data.email || 'N/A'}</td>
                        <td>${fechaRegistro}</td>
                        <td>
                            <button onclick="deleteInscrito('${club}', '${doc.id}')" class="btn btn-sm btn-danger">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    `;
                }

                tableBody.appendChild(row);
            });

            // Actualizar contador
            document.getElementById(countId).textContent = `${count} inscrito${count !== 1 ? 's' : ''}`;
        })
        .catch((error) => {
            console.error(`Error al cargar inscritos de ${club}: `, error);
            document.getElementById(tableId).innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger">Error al cargar los datos</td>
                </tr>
            `;
        });
}

// Formatear fecha
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-MX', options);
}

// Eliminar inscrito
function deleteInscrito(club, id) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
        db.collection(club).doc(id).delete()
            .then(() => {
                // Recargar la tabla correspondiente
                if (club === 'ritmos-latinos') {
                    loadInscritos('ritmos-latinos', 'table-ritmos', 'count-ritmos');
                } else if (club === 'gimnasio') {
                    loadInscritos('gimnasio', 'table-gimnasio', 'count-gimnasio');
                } else if (club === 'danza-folclorica') {
                    loadInscritos('danza-folclorica', 'table-danza', 'count-danza');
                }
            })
            .catch((error) => {
                console.error("Error al eliminar: ", error);
                alert("Ocurrió un error al eliminar el registro");
            });
    }
}