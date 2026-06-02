export function chunkText(text: string, chunkSize = 500): string[] {
  const sentences = text.split(/[.!?]\s+/)
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + sentence).length > chunkSize && current) {
      chunks.push(current.trim())
      current = sentence
    } else {
      current += (current ? '. ' : '') + sentence
    }
  }
  if (current) chunks.push(current.trim())
  return chunks
}

export function findRelevantChunks(query: string, chunks: string[], topK = 5): string[] {
  const queryWords = query.toLowerCase().split(/\s+/)

  const scored = chunks.map(chunk => {
    const chunkLower = chunk.toLowerCase()
    const score = queryWords.reduce((acc, word) => {
      return acc + (chunkLower.includes(word) ? 1 : 0)
    }, 0)
    return { chunk, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk)
}
