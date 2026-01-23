import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default async function handler(req: any, res: any) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Leer el body
    const { items } = req.body;

    // Validar items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items: must be a non-empty array" });
    }

    // Validar cada item
    for (const item of items) {
      if (!item.name || typeof item.name !== "string") {
        return res.status(400).json({ error: "Invalid item: name is required and must be a string" });
      }
      if (!item.price || typeof item.price !== "number" || item.price <= 0) {
        return res.status(400).json({ error: "Invalid item: price is required and must be a positive number" });
      }
      if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0) {
        return res.status(400).json({ error: "Invalid item: quantity is required and must be a positive number" });
      }
    }

    // Convertir items a line_items de Stripe
    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convertir a centavos
      },
      quantity: item.quantity,
    }));

    // Identificar tipo de transacción
    const transaction_type = "store_purchase";

    // Crear sesión de Stripe en modo payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cart`,
      metadata: {
        transaction_type: transaction_type,
      },
    });

    // Responder con la URL de la sesión y el tipo de transacción
    return res.status(200).json({ 
      url: session.url,
      transaction_type: transaction_type 
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({ error: "Stripe checkout failed" });
  }
}
