// Servicio para simular el guardado de donaciones
// En una app real, esto haría llamadas a una API

let donations = []; // Simulación de almacenamiento en memoria

export function saveDonation(donationData, translateFn) {
  // Simular guardado de donación
  const donation = {
    id: donations.length + 1,
    ...donationData,
    created_at: new Date().toISOString()
  };
  
  donations.push(donation);
  
  // Determinar mensaje según si es anónimo o no
  const isAnonymous = donationData.name === 'Anónimo' || donationData.name === 'Anonymous' || !donationData.name || donationData.name.trim() === '';
  const amount = parseFloat(donationData.amount_usd).toFixed(2);
  
  let message;
  if (translateFn) {
    // Usar función de traducción si está disponible
    if (isAnonymous) {
      const template = translateFn('donation_success_anonymous');
      message = template.replace('${amount}', `$${amount}`);
    } else {
      const template = translateFn('donation_success_named');
      message = template.replace('{name}', donationData.name).replace('${amount}', `$${amount}`);
    }
  } else {
    // Fallback a español si no hay función de traducción
    message = isAnonymous
      ? `¡Gracias! Tu donación anónima de $${amount} USD ha sido registrada exitosamente.`
      : `¡Gracias ${donationData.name}! Tu donación de $${amount} USD ha sido registrada exitosamente.`;
  }
  
  // Simular delay de red
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: message,
        donation
      });
    }, 500);
  });
}

export function getDonations() {
  return donations;
}
