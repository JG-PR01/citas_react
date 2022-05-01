import Paciente from './Paciente';

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {
	return (
		<div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
			{/* Con esto comprobamos cuántos componentes de pacientes se han iterado */}
			{pacientes && pacientes.length ? (
				<>
					<h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

					<p className="text-lg text-center mt-5 mb-10">
						Administra tus {''}
						<span className="text-indigo-600 font-bold">Pacientes y Citas</span>
					</p>

					{/* En este caso se usa el método .map() ya que permite iterar un elemento y agregarlo a un nuevo array*/}
					{pacientes.map((paciente) => (
						<Paciente
							key={paciente.id}
							paciente={paciente}
							setPaciente={setPaciente}
							eliminarPaciente={eliminarPaciente}
						/>
					))}
				</>
			) : (
				<>
					<h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

					<p className="text-lg text-center mt-5 mb-10">
						Comienza agregando pacientes {''}
						<span className="text-indigo-600 font-bold">y Apareceran Aquí</span>
					</p>
				</>
			)}
		</div>
	);
};

export default ListadoPacientes;
