import ReservationForm from "@/components/reservations/ReservationForm"

export default function ReservacionesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Reservaciones
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Reserva tu mesa y disfruta de una experiencia gastronómica inolvidable.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                Haz tu reservación
              </h2>
              <ReservationForm />
            </div>

            {/* Información */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">
                Información importante
              </h2>

              <div className="space-y-6">
                {/* Horarios */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Horarios de servicio
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p><span className="font-medium">Almuerzo:</span> 12:00 - 16:00</p>
                    <p><span className="font-medium">Cena:</span> 19:00 - 23:00</p>
                    <p className="text-sm text-gray-500 mt-2">Sábados y festivos extendemos el horario de cena hasta las 00:00</p>
                  </div>
                </div>

                {/* Políticas */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Políticas de reservación
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      Las reservaciones se confirman por email o teléfono
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      Tolerancia de 15 minutos de espera
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      Para grupos de más de 12 personas, contactar directamente
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      Cancelaciones con 24 horas de anticipación
                    </li>
                  </ul>
                </div>

                {/* Contacto directo */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-3">
                    ¿Prefieres llamar?
                  </h3>
                  <p className="text-gray-600 mb-3">
                    También puedes hacer tu reservación por teléfono:
                  </p>
                  <a
                    href="tel:+34123456789"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +34 123 456 789
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
