export default async function handler(req: any, res: any) {
  // CORS headers para permitir acceso público
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Obtener la URL base del sitio desde el request
    // En Vercel, usar el header host y el protocolo
    const host = req.headers.host || req.headers['x-forwarded-host'];
    const protocol = req.headers['x-forwarded-proto'] || (req.headers['x-forwarded-ssl'] === 'on' ? 'https' : 'https');
    
    // Construir la URL base
    let baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : host 
        ? `${protocol}://${host}`
        : 'https://fundacion-un-plan-con-cafe.vercel.app'; // Fallback

    // Información de la fundación basada en el contenido real del sitio
    const foundationInfo = {
      name: "Fundación Un Plan con Café",
      mission: "Transformar la educación rural en Colombia, llevando arte y propósito a los niños que más lo necesitan. Reconocemos la valentía de quienes caminan una hora cada día para aprender, y respondemos convirtiendo sus escuelas en centros de transformación social.",
      vision: "Entregar más que libros: oportunidades reales de vida para niños en escuelas rurales y de bajos ingresos en toda Colombia.",
      programs: [
        {
          name: "Programa de Bilingüismo",
          description: "Enseñanza de inglés contextualizada para comunidades rurales en Colombia. Los estudiantes aprenden inglés desde su realidad, conectando el idioma con su entorno, cultura y oportunidades económicas locales. Programas gratuitos diseñados especialmente para comunidades cafetaleras.",
          url: `${baseUrl}/projects`
        },
        {
          name: "Proyecto Aldonarte",
          description: "Modelo de transformación educativa que equipa espacios de aprendizaje y los entrega a las autoridades locales para garantizar continuidad y sostenibilidad. Incluye tres fases: equipar salones, transferir a autoridades locales y garantizar seguimiento continuo.",
          url: `${baseUrl}/projects`
        },
        {
          name: "Arte y Creatividad",
          description: "Recursos artísticos y materiales creativos para niños en escuelas de bajos ingresos.",
          url: `${baseUrl}`
        },
        {
          name: "Educación Rural",
          description: "Apoyo a escuelas rurales y de bajos ingresos en toda Colombia.",
          url: `${baseUrl}`
        }
      ],
      who_we_help: "Niños y jóvenes en comunidades cafetaleras y rurales de Colombia que tienen acceso limitado a educación de calidad. Familias en escuelas rurales y de bajos ingresos que caminan largas distancias para acceder a educación. Estudiantes que necesitan aprender inglés contextualizado a su realidad y cultura.",
      how_to_help: {
        donate: {
          description: "Puedes hacer una donación a través de nuestra aplicación web. Las donaciones pueden ser desde $1.00 USD y puedes elegir si quieres que sea anónima. Tu apoyo se utiliza para nuestros proyectos de bilingüismo, Aldonarte, recursos artísticos y apoyo a escuelas rurales.",
          url: `${baseUrl}/donate`,
          minimum_amount: 1.00,
          currency: "USD"
        },
        shop: {
          description: "Compra productos con valor social en nuestra tienda solidaria. Cada producto que compras apoya directamente a las comunidades cafetaleras y nuestros proyectos de desarrollo comunitario.",
          url: `${baseUrl}/store`
        },
        learn: {
          description: "Accede a nuestras lecciones gratuitas de inglés diseñadas especialmente para comunidades cafetaleras. El programa es 100% gratuito y ofrece certificados al completar cada nivel.",
          url: `${baseUrl}`
        },
        listen: {
          description: "Escucha nuestro podcast '¡Tómate un café con nosotros!' para conocer las historias de los niños y las familias que transformamos juntos.",
          url: `${baseUrl}/podcast`
        }
      },
      donation_url: `${baseUrl}/donate`,
      website_url: baseUrl,
      impact: {
        families_supported: "Cientos de familias en comunidades cafetaleras",
        focus_areas: [
          "Escuelas rurales",
          "Comunidades cafetaleras",
          "Educación bilingüe",
          "Arte y creatividad"
        ]
      },
      contact: {
        email: null, // No disponible en el código actual
        phone: null, // No disponible en el código actual
        social_links: {
          website: baseUrl,
          podcast: `${baseUrl}/podcast`
        }
      },
      additional_info: {
        language_support: ["Español", "English"],
        payment_methods: "Stripe (tarjetas de crédito/débito)",
        donation_anonymity: "Las donaciones pueden ser anónimas si el donante lo prefiere",
        programs_free: "Todos nuestros programas educativos son 100% gratuitos"
      }
    };

    return res.status(200).json(foundationInfo);
  } catch (error) {
    console.error("Error fetching foundation info:", error);
    return res.status(500).json({ 
      error: "Failed to fetch foundation information",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
