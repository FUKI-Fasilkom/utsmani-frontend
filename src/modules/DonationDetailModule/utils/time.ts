type Unit = 'tahun' | 'bulan' | 'hari' | 'jam' | 'menit'

/**
 * Calculates the duration based on the specified unit and accumulation flag.
 *
 * @param {string} timestamp - The target timestamp in ISO 8601 format.
 * @param {Unit} unit - The unit of time for the calculation.
 * @param {boolean} accumulated - Determines the calculation method.
 * @returns {number} The calculated duration.
 *
 * @example
 *
 * // Total duration: 102 minutes
 * getDuration('2025-02-15T00:00:00Z', 'menit', true) // Returns: 102
 *
 * // Total duration: 1 hour 42 minutes (102 minutes)
 * getDuration('2025-02-15T00:00:00Z', 'menit', false) // Returns: 42
 */
export function getDuration(
  timestamp: string,
  unit: Unit,
  accumulated: boolean = true
): number {
  const targetDate = new Date(timestamp)
  const now = new Date()

  // Calculate the difference in milliseconds
  let durationMs = targetDate.getTime() - now.getTime()

  // If the target date is in the past, return 0
  if (durationMs <= 0) {
    return 0
  }

  // Define the number of milliseconds in each unit
  const unitMs: { [key in Unit]: number } = {
    tahun: 365 * 24 * 60 * 60 * 1000, // 1 tahun = 365 hari
    bulan: 30 * 24 * 60 * 60 * 1000, // 1 bulan = 30 hari
    hari: 24 * 60 * 60 * 1000, // 1 hari = 24 jam
    jam: 60 * 60 * 1000, // 1 jam = 60 menit
    menit: 60 * 1000, // 1 menit = 60 detik
  }

  if (accumulated) {
    // Return the total duration in the specified unit
    return Math.floor(durationMs / unitMs[unit])
  } else {
    // Define the order of units from largest to smallest
    const units: Unit[] = ['tahun', 'bulan', 'hari', 'jam', 'menit']
    let remaining = durationMs

    for (const u of units) {
      if (u === unit) {
        // Return the duration in the specified unit after subtracting larger units
        return Math.floor(remaining / unitMs[unit])
      }
      // Subtract the current unit's duration from the remaining duration
      remaining %= unitMs[u]
    }

    // If the unit is not found, return 0
    return 0
  }
}

export const formatDuration = (timestamp: string): string => {
  const units: Unit[] = ['tahun', 'bulan', 'hari', 'jam', 'menit']

  for (const unit of units) {
    const interval = getDuration(timestamp, unit, false)
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit}` : `${interval} ${unit}`
    }
  }

  return 'baru saja' // "just now" in Indonesian
}
