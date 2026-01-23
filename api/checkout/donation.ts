import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export default async function handler(req: any, res: any) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Leer el body
    const { amount, donorName } = req.body;

    // Validar monto
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Identificar tipo de transacción
    const transaction_type = "donation";
    
    // Construir success_url con parámetros - redirigir de vuelta a donaciones
    const successParams = new URLSearchParams({
      transaction_type: transaction_type,
      payment_success: 'true',
    });
    
    // Agregar nombre del donante si fue proporcionado
    if (donorName && donorName.trim() && donorName.trim().toLowerCase() !== 'anónimo' && donorName.trim().toLowerCase() !== 'anonymous') {
      successParams.append('donor_name', donorName.trim());
    }

    // Crear sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation – Fundación Un Plan con Café",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/donate?${successParams.toString()}`,
      cancel_url: `${req.headers.origin}/donate`,
      metadata: {
        transaction_type: transaction_type,
        donor_name: donorName || 'anonymous',
      },
    });

    // Responder con la URL y el tipo de transacción
    return res.status(200).json({ 
      url: session.url,
      transaction_type: transaction_type 
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: "Stripe checkout failed" });
  }
}
