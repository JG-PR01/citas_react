import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [fecha, setFecha] = useState('');
	const [sintomas, setSintomas] = useState('');

	const [error, setError] = useState(false);

	useEffect(() => {
		if (Object.keys(paciente).length > 0) {
			setNombre(paciente.nombre);
			setPropietario(paciente.propietario);
			setEmail(paciente.email);
			setFecha(paciente.fecha);
			setSintomas(paciente.sintomas);
		}
	}, [paciente]);

	// Generador de ID
	const generarId = () => {
		const random = Math.random().toString(34).substr(2);
		const fecha = Date.now().toString(25);

		return random + fecha;
	};

	// Validación de formularios con React
	const handleSubmit = (evento) => {
		evento.preventDefault();

		// El método de arrays - .includes() - verifica si el existe algún valor que coincida con el que está entre sus paréntesis.
		if ([nombre, propietario, email, fecha, sintomas].includes('')) {
			setError(true);
			return;
		}

		setError(false);

		// Objeto de Paciente
		const ObjetoPaciente = {
			nombre,
			propietario,
			email,
			fecha,
			sintomas,
		};

		// Editor de datos de pacientes
		if (paciente.id) {
			// Editando paciente
			ObjetoPaciente.id = paciente.id;

			// Aquí iteramos cada objeto que se edite y evaluamos si, el ID del objeto que se edite y el ID del objeto que se registra son iguales. Si el resultado es verdadero, entonces retornarmos el objeto actualizado.
			const pacientesActualizados = pacientes.map((pacienteState) =>
				pacienteState.id === paciente.id ? ObjetoPaciente : pacienteState
			);

			// Cuando se cumpla la condición el objeto del Prop "paciente" será reemplazado con el objeto que se edita
			setPacientes(pacientesActualizados);
			// Con este Prop podemos eliminar el paciente desactualizado del states del App.jsx
			setPaciente({});
		} else {
			// Nuevo registro
			ObjetoPaciente.id = generarId();
			setPacientes([...pacientes, ObjetoPaciente]);
		}

		// Con esto podemos reiniciar el formulario una vez que ha sido completado de manera correcta
		setNombre('');
		setPropietario('');
		setEmail('');
		setFecha('');
		setSintomas('');
	};

	return (
		<div className="md:w-1/2 lg:w-2/5">
			<h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

			<p className="text-lg mt-5 mb-10 text-center">
				Añade pacientes y {''}
				<span className="font-bold text-indigo-600 ">Administralos</span>
			</p>

			<form
				action=""
				className="bg-white shadow-md rounded-lg py-10 px-5 mb-5"
				// Evento para activar la función de validación
				onSubmit={handleSubmit}
			>
				{/* Con el doble andPersand '&&' se evalúa la primera parte y retorna la segunda parte del ternario.
				
				Además de esto, gracias al parámetro "children" en la función del componente "Error" se pueden emplear etiquetas de apertura y cierre con el nombre con que se importa*/}
				{error && (
					<Error>
						<p>Todos los campos son obligatorios</p>
					</Error>
				)}
				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="block text-gray-700 font-bold uppercase"
					>
						Nombre Mascota
					</label>
					<input
						id="mascota"
						type="text"
						placeholder="Nombre de la Mascota"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						value={nombre}
						onChange={(evento) => setNombre(evento.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="propietario"
						className="block text-gray-700 font-bold uppercase"
					>
						Nombre Propietario
					</label>
					<input
						id="propietario"
						type="text"
						placeholder="Nombre del Propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						value={propietario}
						onChange={(evento) => setPropietario(evento.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block text-gray-700 font-bold uppercase"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email Contacto Propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						value={email}
						onChange={(evento) => setEmail(evento.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="alta"
						className="block text-gray-700 font-bold uppercase"
					>
						Alta
					</label>
					<input
						id="alta"
						type="date"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						value={fecha}
						onChange={(evento) => setFecha(evento.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="sintomas"
						className="block text-gray-700 font-bold uppercase"
					>
						Síntomas
					</label>
					<textarea
						id="sintomas"
						placeholder="Describe los síntomas"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
						value={sintomas}
						onChange={(evento) => setSintomas(evento.target.value)}
					/>
				</div>
				<input
					type="submit"
					className="bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-all"
					value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
				/>
			</form>
		</div>
	);
};

export default Formulario;
