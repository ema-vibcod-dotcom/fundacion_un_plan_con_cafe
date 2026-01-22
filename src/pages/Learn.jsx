import { getLessonsByLevel } from '../data/lessons';

export default function Learn() {
  const lessonsByLevel = getLessonsByLevel();
  const totalLessons =
    lessonsByLevel.beginner.length +
    lessonsByLevel.intermediate.length +
    lessonsByLevel.advanced.length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">
          Educación Bilingüe
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm">
          Accede a nuestras lecciones gratuitas diseñadas para fortalecer el bilingüismo en
          comunidades cafetaleras. Aprende español y lenguas indígenas de manera interactiva.
        </p>
      </div>

      {totalLessons > 0 && (
        <div className="bg-amber-50 rounded-xl p-4 sm:p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-900">
                {totalLessons}
              </div>
              <div className="text-xs text-gray-700">Lecciones disponibles</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-amber-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-900">3</div>
              <div className="text-xs text-gray-700">Niveles</div>
            </div>
          </div>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-green-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nivel Básico</h2>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            Principiante
          </span>
        </div>

        {lessonsByLevel.beginner.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lessonsByLevel.beginner.map(lesson => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow-md p-5 sm:p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{lesson.title}</h3>
                </div>
                {lesson.description ? (
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {lesson.description}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm italic mb-3">Lección de nivel básico</p>
                )}
                <div className="flex items-center text-xs text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Nivel básico</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-gray-600 text-sm">
              No hay lecciones de nivel básico disponibles aún.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nivel Intermedio</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            Intermedio
          </span>
        </div>

        {lessonsByLevel.intermediate.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lessonsByLevel.intermediate.map(lesson => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow-md p-5 sm:p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{lesson.title}</h3>
                </div>
                {lesson.description ? (
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {lesson.description}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm italic mb-3">Lección de nivel intermedio</p>
                )}
                <div className="flex items-center text-xs text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Nivel intermedio</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-sm">
              No hay lecciones de nivel intermedio disponibles aún.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nivel Avanzado</h2>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
            Avanzado
          </span>
        </div>

        {lessonsByLevel.advanced.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lessonsByLevel.advanced.map(lesson => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow-md p-5 sm:p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{lesson.title}</h3>
                </div>
                {lesson.description ? (
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {lesson.description}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm italic mb-3">Lección de nivel avanzado</p>
                )}
                <div className="flex items-center text-xs text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Nivel avanzado</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-sm">
              No hay lecciones de nivel avanzado disponibles aún.
            </p>
          </div>
        )}
      </section>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-t-4 border-amber-500">
        <h3 className="text-lg font-bold text-amber-900 mb-3">
          Sobre nuestro programa educativo
        </h3>
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p>
            Nuestro programa de educación bilingüe está diseñado para fortalecer tanto el español
            como las lenguas indígenas en comunidades cafetaleras. Cada lección está cuidadosamente
            estructurada para ser accesible y práctica.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <svg
                className="w-8 h-8 text-amber-600 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="font-semibold text-amber-900">100% Gratuito</p>
              <p className="text-xs text-gray-600">Acceso libre a todas las lecciones</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <svg
                className="w-8 h-8 text-amber-600 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="font-semibold text-amber-900">Comunidad</p>
              <p className="text-xs text-gray-600">Aprende junto a otros</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <svg
                className="w-8 h-8 text-amber-600 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-semibold text-amber-900">Certificado</p>
              <p className="text-xs text-gray-600">Al completar cada nivel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
