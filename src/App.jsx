import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Header from './components/Header';
import ListadoPacientes from './components/ListadoPacientes';

// Componente principal
function App() {
	const [pacientes, setPacientes] = useState([]);
	const [paciente, setPaciente] = useState({});

	// Función para eliminar pacientes del state
	const eliminarPaciente = (id) => {
		const pacientesActualizados = pacientes.filter(
			(paciente) => paciente.id !== id
		);

		setPacientes(pacientesActualizados);
	};

	// Comprobar si hay algo en Local Storage
	useEffect(() => {
		const obtenerLS = () => {
			// Con el método .getItem() podemos obtener un item para revisarlo
			// Con JSON.parse() convertimos lo que esté dentro de los paréntesis en un objeto
			// Esto es un ternario pero sin el "else"
			// Si no hay nada den local storage entonces, agrega un arreglo vacío
			const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
			// Le enviamos el resultado al State "pacientes"
			setPacientes(pacientesLS);
		};
		// Cuando el componente esté cargado, se llamará esta función y se revisará el ternario.
		obtenerLS();
	}, []);

	// Guardar datos en Local Storage
	useEffect(() => {
		// Pasamos el arreglo a Local Storage y lo convertimos a String
		// Con el método .setItem() podemos enviar un item para que sea leído
		localStorage.setItem('pacientes', JSON.stringify(pacientes));
	}, [pacientes]);

	return (
		<div className="container mx-auto mt-10">
			<Header />

			<div className="mt-12 md:flex">
				<Formulario
					pacientes={pacientes}
					setPacientes={setPacientes}
					paciente={paciente}
					setPaciente={setPaciente}
				/>
				<ListadoPacientes
					pacientes={pacientes}
					setPaciente={setPaciente}
					eliminarPaciente={eliminarPaciente}
				/>
			</div>
		</div>
	);
}

export default App;
