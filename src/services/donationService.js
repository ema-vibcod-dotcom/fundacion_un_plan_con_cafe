// Servicio para simular el guardado de donaciones
// En una app real, esto haría llamadas a una API

let donations = []; // Simulación de almacenamiento en memoria

export function saveDonation(donationData) {
  // Simular guardado de donación
  const donation = {
    id: donations.length + 1,
    ...donationData,
    created_at: new Date().toISOString()
  };
  
  donations.push(donation);
  
  // Determinar mensaje según si es anónimo o no
  const isAnonymous = donationData.name === 'Anónimo' || !donationData.name || donationData.name.trim() === '';
  const donorName = isAnonymous ? 'Anónimo' : donationData.name;
  const message = isAnonymous
    ? `¡Gracias! Tu donación anónima de $${parseFloat(donationData.amount_usd).toFixed(2)} USD ha sido registrada exitosamente.`
    : `¡Gracias ${donationData.name}! Tu donación de $${parseFloat(donationData.amount_usd).toFixed(2)} USD ha sido registrada exitosamente.`;
  
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
