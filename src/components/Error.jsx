const Error = ({ children }) => {
	return (
		<div className="bg-red-800 text-center text-white p-3 uppercase font-bold mb-3 rounded">
			{/* La palabra clave "children" se encierra entre llaves para dar a entender que forma parte de JS y puede entenderse como cualquier estructura HTML */}
			{children}
		</div>
	);
};

export default Error;
