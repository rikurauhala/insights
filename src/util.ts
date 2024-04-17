export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleDateString('en-UK', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
