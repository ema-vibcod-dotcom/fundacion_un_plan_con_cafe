/**
 * Ejemplo de componente para mostrar un proyecto
 * Este es un ejemplo de cómo consumir datos de Strapi
 */

import { useState, useEffect } from 'react';
import { getProyectoById, getStrapiImageUrl } from '../../services/proyectoService';

export default function ProyectoCard({ proyectoId }) {
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProyecto() {
      try {
        setLoading(true);
        const data = await getProyectoById(proyectoId);
        setProyecto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (proyectoId) {
      loadProyecto();
    }
  }, [proyectoId]);

  if (loading) {
    return <div className="text-amber-900">Cargando proyecto...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!proyecto) {
    return <div>Proyecto no encontrado</div>;
  }

  const { attributes } = proyecto;
  const estadoColors = {
    en_curso: 'bg-blue-100 text-blue-800',
    completado: 'bg-green-100 text-green-800',
    urgente: 'bg-red-100 text-red-800',
  };

  const estadoLabels = {
    en_curso: 'En Curso',
    completado: 'Completado',
    urgente: 'Urgente',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Imagen principal */}
      {attributes.galeriaImagenes && attributes.galeriaImagenes.length > 0 && (
        <img
          src={attributes.galeriaImagenes[0].url}
          alt={attributes.titulo}
          className="w-full h-48 object-cover rounded-lg mb-4"
          loading="lazy"
        />
      )}

      {/* Estado */}
      <div className="mb-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            estadoColors[attributes.estado] || estadoColors.en_curso
          }`}
        >
          {estadoLabels[attributes.estado] || 'En Curso'}
        </span>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-amber-900 mb-2">
        {attributes.titulo}
      </h2>

      {/* Descripción (primeros 150 caracteres) */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {attributes.descripcion?.substring(0, 150)}...
      </p>

      {/* Métricas */}
      <div className="flex gap-4 text-sm text-gray-600 mb-4">
        {attributes.voluntarios > 0 && (
          <span>{attributes.voluntarios} Voluntarios</span>
        )}
        {attributes.porcentajeFinanciado > 0 && (
          <span>{attributes.porcentajeFinanciado}% Financiado</span>
        )}
        {attributes.socios > 0 && <span>{attributes.socios} Socios</span>}
      </div>

      {/* Barra de progreso */}
      {attributes.porcentajeFinanciado > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-900 h-2 rounded-full transition-all"
              style={{ width: `${attributes.porcentajeFinanciado}%` }}
            />
          </div>
        </div>
      )}

      {/* Video corto */}
      {attributes.videoCorto && (
        <div className="mt-4">
          <video
            src={attributes.videoCorto.url}
            controls
            className="w-full rounded-lg"
            preload="metadata"
          >
            Tu navegador no soporta videos.
          </video>
        </div>
      )}

      {/* Fechas */}
      <div className="text-sm text-gray-500 mt-4">
        <p>
          Inicio: {new Date(attributes.fechaInicio).toLocaleDateString('es-ES')}
        </p>
        {attributes.fechaFinalizacion && (
          <p>
            Fin:{' '}
            {new Date(attributes.fechaFinalizacion).toLocaleDateString('es-ES')}
          </p>
        )}
      </div>
    </div>
  );
}
