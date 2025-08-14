export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} Redmaq Colombia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
