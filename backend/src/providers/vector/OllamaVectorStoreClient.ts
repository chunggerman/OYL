import { VectorStoreClient } from "../../services/EmbeddingService";
import fs from "fs";
import path from "path";

interface StoredVector {
  workspaceId: string;
  documentId: string;
  chunkId: string;
  vector: number[];
  text: string;
}

export class OllamaVectorStoreClient implements VectorStoreClient {
  private baseUrl: string;
  private storePath: string;

  constructor(
    baseUrl = "http://localhost:11434",
    storePath = path.join(process.cwd(), "vector_store.json")
  ) {
    this.baseUrl = baseUrl;
    this.storePath = storePath;

    if (!fs.existsSync(this.storePath)) {
      fs.writeFileSync(this.storePath, JSON.stringify([]));
    }
  }

  private loadStore(): StoredVector[] {
    return JSON.parse(fs.readFileSync(this.storePath, "utf8"));
  }

  private saveStore(data: StoredVector[]): void {
    fs.writeFileSync(this.storePath, JSON.stringify(data, null, 2));
  }

  async upsertEmbedding(params: {
    workspaceId: string;
    documentId: string;
    chunkId: string;
    text: string;
  }): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: params.text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama embedding error: ${response.statusText}`);
    }

    const json = await response.json();
    const vector = json.embedding as number[];

    const store = this.loadStore();

    const existingIndex = store.findIndex(
      (v) => v.chunkId === params.chunkId
    );

    const entry: StoredVector = {
      workspaceId: params.workspaceId,
      documentId: params.documentId,
      chunkId: params.chunkId,
      vector,
      text: params.text,
    };

    if (existingIndex >= 0) {
      store[existingIndex] = entry;
    } else {
      store.push(entry);
    }

    this.saveStore(store);

    return `local:${params.chunkId}`;
  }

  async query(params: {
    workspaceId: string;
    query: string;
    topK: number;
  }): Promise<Array<{ chunkId: string; score: number }>> {
    const response = await fetch(`${this.baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: params.query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama embedding error: ${response.statusText}`);
    }

    const json = await response.json();
    const queryVector = json.embedding as number[];

    const store = this.loadStore().filter(
      (v) => v.workspaceId === params.workspaceId
    );

    const cosine = (a: number[], b: number[]) => {
      let dot = 0,
        na = 0,
        nb = 0;
      for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
      }
      return dot / (Math.sqrt(na) * Math.sqrt(nb));
    };

    const scored = store
      .map((v) => ({
        chunkId: v.chunkId,
        score: cosine(queryVector, v.vector),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, params.topK);

    return scored;
  }
}
