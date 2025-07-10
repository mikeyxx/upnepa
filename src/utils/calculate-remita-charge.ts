/**
 * Calculates Remita fee, total cost, and electricity units for a given base amount.
 * @param {number} amount - The base amount entered by the user (₦), before fee.
 * @returns {{ remitaFee: number, totalCost: number, units: number }}
 */
export function getElectricityBreakdown(amount: number) {
  const UNIT_PRICE = 209.5;

  // Step 1: Compute remita fee
  function calculateRemitaCharge(amount: number) {
    if (amount <= 1000) return 167.49;
    if (amount <= 1500) return 170.18;
    if (amount <= 2000) return 175.87;
    if (amount <= 2500) return 175.55;
    if (amount <= 3000) return 178.24;
    if (amount <= 3500) return 178.94;
    if (amount <= 4000) return 180.93;
    if (amount <= 4500) return 183.6;
    if (amount <= 5000) return 186.53;
    if (amount <= 5500) return 191.69;
    if (amount <= 6000) return 194.91;
    if (amount <= 6500) return 199.68;
    if (amount <= 7000) return 199.43;
    if (amount <= 7500) return 199.24;
    if (amount <= 8000) return 205.12;
    if (amount <= 8500) return 207.4;
    if (amount <= 9000) return 210.49;
    if (amount <= 9500) return 213.18;
    if (amount <= 10000) return 213.57;

    if (amount <= 15000) return amount * 0.0142;
    if (amount <= 20000) return amount * 0.0134;
    if (amount <= 25000) return amount * 0.0128;
    if (amount <= 30000) return amount * 0.0123;
    if (amount <= 35000) return amount * 0.0122;
    if (amount <= 40000) return amount * 0.012;
    if (amount <= 45000) return amount * 0.0119;
    if (amount <= 50000) return amount * 0.0118;

    return amount * 0.0117;
  }

  const remitaFee = calculateRemitaCharge(amount);
  const totalCost = amount + remitaFee;
  const units = amount / UNIT_PRICE;

  return {
    remitaFee: Number(remitaFee.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    units: Number(units.toFixed(2)),
  };
}
