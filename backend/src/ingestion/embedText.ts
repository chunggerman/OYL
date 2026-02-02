
export async function embedText(chunks: string[]): Promise<number[][]> {
  return chunks.map((chunk) => {
    const vector = new Array(128).fill(0).map((_, i) => (chunk.length % (i + 1)) / 10);
    return vector;
  });
}
