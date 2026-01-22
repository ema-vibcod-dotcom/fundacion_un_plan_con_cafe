import { getLessonsByLevel } from '../data/lessons';
import { useLanguage } from '../contexts/LanguageContext';

export default function Learn() {
  const { translate } = useLanguage();
  const lessonsByLevel = getLessonsByLevel();
  const totalLessons =
    lessonsByLevel.beginner.length +
    lessonsByLevel.intermediate.length +
    lessonsByLevel.advanced.length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">
          {translate('learn_title')}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm">
          {translate('learn_subtitle')}
        </p>
      </div>

      {totalLessons > 0 && (
        <div className="bg-amber-50 rounded-xl p-4 sm:p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-center space-x-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-900">
                {totalLessons}
              </div>
              <div className="text-xs text-gray-700">{translate('lessons_available')}</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-amber-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-900">3</div>
              <div className="text-xs text-gray-700">{translate('levels')}</div>
            </div>
          </div>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-green-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{translate('level_beginner')}</h2>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            {translate('beginner_badge')}
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
                  <p className="text-gray-500 text-sm italic mb-3">{translate('beginner_level')}</p>
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
                  <span>{translate('beginner_level')}</span>
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
              {translate('no_lessons_beginner')}
            </p>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{translate('level_intermediate')}</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            {translate('intermediate_badge')}
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
                  <p className="text-gray-500 text-sm italic mb-3">{translate('intermediate_level')}</p>
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
                  <span>{translate('intermediate_level')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-sm">
              {translate('no_lessons_intermediate')}
            </p>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{translate('level_advanced')}</h2>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
            {translate('advanced_badge')}
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
                  <p className="text-gray-500 text-sm italic mb-3">{translate('advanced_level')}</p>
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
                  <span>{translate('advanced_level')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-sm">
              {translate('no_lessons_advanced')}
            </p>
          </div>
        )}
      </section>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-t-4 border-amber-500">
        <h3 className="text-lg font-bold text-amber-900 mb-3">
          {translate('program_title')}
        </h3>
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p>
            {translate('program_description')}
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
              <p className="font-semibold text-amber-900">{translate('program_free')}</p>
              <p className="text-xs text-gray-600">{translate('program_free_desc')}</p>
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
              <p className="font-semibold text-amber-900">{translate('program_community')}</p>
              <p className="text-xs text-gray-600">{translate('program_community_desc')}</p>
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
              <p className="font-semibold text-amber-900">{translate('program_certificate')}</p>
              <p className="text-xs text-gray-600">{translate('program_certificate_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
