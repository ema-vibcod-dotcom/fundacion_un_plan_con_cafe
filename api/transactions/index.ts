import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: any, res: any) {
  // Solo permitir GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { filter, limit = 100, starting_after, mode } = req.query;

    // Construir parámetros para listar sesiones de checkout
    const params: Stripe.Checkout.SessionListParams = {
      limit: Math.min(parseInt(limit as string) || 100, 100), // Máximo 100 por request
    };

    if (starting_after) {
      params.starting_after = starting_after as string;
    }

    // Filtrar por modo (test o live) si se especifica
    // Nota: Stripe no tiene un parámetro directo para filtrar por livemode en sessions.list
    // Por lo que filtraremos después de obtener los resultados

    // Listar todas las sesiones de checkout completadas
    const sessions = await stripe.checkout.sessions.list(params);

    // Filtrar solo las sesiones pagadas
    const paidSessions = sessions.data.filter(
      (session) => session.payment_status === "paid"
    );

    // Transformar las sesiones en formato de transacción
    const transactions = paidSessions.map((session) => {
      const transactionType =
        session.metadata?.transaction_type || "unknown";
      const donorName = session.metadata?.donor_name;
      const isAnonymous =
        !donorName ||
        donorName.toLowerCase() === "anonymous" ||
        donorName.toLowerCase() === "anónimo";

      // Calcular el monto total de la sesión
      const amountTotal = session.amount_total || 0;
      const amountInDollars = amountTotal / 100;

      return {
        id: session.id,
        transaction_type: transactionType,
        donor_name: isAnonymous ? null : donorName,
        amount: amountInDollars,
        currency: session.currency?.toUpperCase() || "USD",
        date: new Date(session.created * 1000).toISOString(),
        payment_status: session.payment_status,
      };
    });

    // Aplicar filtro por tipo de transacción si se especifica
    let filteredTransactions = transactions;
    if (filter && filter !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (tx) => tx.transaction_type === filter
      );
    }

    // Aplicar filtro por modo (test/live) si se especifica
    if (mode && mode !== "all") {
      if (mode === "test") {
        filteredTransactions = filteredTransactions.filter((tx) => tx.is_test === true);
      } else if (mode === "live") {
        filteredTransactions = filteredTransactions.filter((tx) => tx.is_test === false);
      }
    }

    // Ordenar por fecha (más reciente primero)
    filteredTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Preparar respuesta con paginación
    const hasMore = sessions.has_more;
    const lastTransactionId =
      filteredTransactions.length > 0
        ? filteredTransactions[filteredTransactions.length - 1].id
        : null;

    return res.status(200).json({
      transactions: filteredTransactions,
      has_more: hasMore,
      last_id: lastTransactionId,
      total: filteredTransactions.length,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
