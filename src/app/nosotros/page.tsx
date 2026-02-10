export default function NosotrosPage() {
  const valores = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titulo: "Tradición",
      descripcion: "Recetas heredadas de generación en generación que mantienen viva la esencia de nuestra cocina.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      titulo: "Calidad",
      descripcion: "Seleccionamos los mejores ingredientes de productores locales para garantizar la excelencia.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      titulo: "Frescura",
      descripcion: "Ingredientes frescos cada día, de la huerta a tu mesa sin intermediarios.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      titulo: "Pasión",
      descripcion: "Cocinamos con amor y dedicación, poniendo el corazón en cada plato que servimos.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Nuestra Historia
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Más de 35 años compartiendo los sabores de nuestra tierra
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800')",
                }}
              />
            </div>

            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Desde 1985
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                Todo comenzó con una pequeña cocina y un gran sueño. Don Antonio y Doña María
                abrieron las puertas de nuestro restaurante con una misión clara: compartir
                los sabores auténticos de nuestra tierra con cada visitante.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Lo que empezó como un modesto local familiar se ha convertido en un referente
                gastronómico, manteniendo siempre la esencia de aquellas primeras recetas
                que conquistaron el corazón de nuestros primeros clientes.
              </p>
              <p className="text-gray-600 text-lg">
                Hoy, la tercera generación continúa el legado, combinando la tradición
                culinaria con toques contemporáneos, sin perder nunca la esencia que
                nos define: ingredientes frescos, recetas con historia y un servicio
                que te hace sentir como en casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Los principios que guían cada decisión en nuestra cocina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                  {valor.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600">
                  {valor.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Las personas que hacen posible la magia en cada plato
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400')",
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800">
                Chef Antonio García
              </h3>
              <p className="text-orange-600 font-medium mb-2">Chef Ejecutivo</p>
              <p className="text-gray-600 text-sm">
                30 años de experiencia llevando la tradición familiar a nuevas alturas.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1583394293214-28ez1c6ee536?w=400')",
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800">
                María López
              </h3>
              <p className="text-orange-600 font-medium mb-2">Chef Pastelera</p>
              <p className="text-gray-600 text-sm">
                Creadora de nuestros postres más emblemáticos y dulces tentaciones.
              </p>
            </div>

            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400')",
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800">
                Carlos Martínez
              </h3>
              <p className="text-orange-600 font-medium mb-2">Sommelier</p>
              <p className="text-gray-600 text-sm">
                Experto en maridajes que complementan perfectamente cada plato.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
