document.getElementById('formAlumno').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    const datos = Object.fromEntries(formData.entries());

    const ID_INSTITUCION = 1;
    try {
        const year = new Date(datos.Fecha_de_nacimiento).getFullYear();
        const age = new Date().getFullYear()-year;        
        datos.Edad = age;

        if (datos.DNI <= 0) {
            console.log('DNI invalido, por favor ingrese un DNI valido');
            return;
        }
        if (age <= 0) {
            console.log('Fecha de nacimiento no valida xd LoL tung tung sahur adolf hitler mi waifu');
            return;
        }

        const response = await fetch(`https://apidemo.geoeducacion.com.ar/api/testing/formulario/${ID_INSTITUCION}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();

        const divRespuesta = document.getElementById('respuesta');
        if (resultado.success) {
            divRespuesta.style.color = 'green';
            divRespuesta.textContent = 'Alumno registrado correctamente.';
            this.reset();
        } else if (resultado.errors) {
            divRespuesta.style.color = 'red';
            divRespuesta.textContent = 'Error de validación: ' + Object.values(resultado.errors).flat().join(', ');
        } else if (resultado.error) {
            divRespuesta.style.color = 'red';
            divRespuesta.textContent = 'Error: ' + resultado.error;
        } else {
            divRespuesta.style.color = 'red';
            divRespuesta.textContent = 'Error desconocido.';
        }

    } catch (error) {
        document.getElementById('respuesta').style.color = 'Fallo la conexión';
        document.getElementById('respuesta').textContent = 'Fallo el servidor.';
        console.error('Error de conexión:', error);
    }
});
