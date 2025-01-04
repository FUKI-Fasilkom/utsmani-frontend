export const formatDuration = (timestamp: string): string => {
  const now = new Date()
  const createdAt = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000)

  const units = [
    { name: 'tahun', seconds: 365 * 24 * 60 * 60 },
    { name: 'bulan', seconds: 30 * 24 * 60 * 60 },
    { name: 'hari', seconds: 24 * 60 * 60 },
    { name: 'jam', seconds: 60 * 60 },
    { name: 'menit', seconds: 60 },
    { name: 'detik', seconds: 1 },
  ]

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds)
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit.name}` : `${interval} ${unit.name}`
    }
  }

  return 'baru saja' // "just now" in Indonesian
}
