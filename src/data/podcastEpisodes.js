// Datos mock de episodios de podcast
export const podcastEpisodes = [
  {
    id: 1,
    title: 'Historias de Comunidades Cafetaleras',
    description: 'En este episodio, conocemos las historias inspiradoras de familias que han transformado sus vidas a través de la educación bilingüe y el desarrollo comunitario.',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Sostenibilidad en el Cultivo del Café',
    description: 'Conversación sobre prácticas sostenibles en el cultivo del café y su impacto positivo en las comunidades y el medio ambiente.',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    created_at: '2024-01-08T10:00:00Z'
  },
  {
    id: 3,
    title: 'El Poder de la Educación Bilingüe',
    description: 'Exploramos cómo la educación bilingüe fortalece la identidad cultural y abre nuevas oportunidades en comunidades cafetaleras.',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    created_at: '2024-01-01T10:00:00Z'
  }
];

// Función helper para formatear fechas
export function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
}
