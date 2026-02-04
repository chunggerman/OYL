export interface Reference {
  id: string;
  chunkId: string;
  sourceType: string;      // e.g. "url", "file", "page"
  sourceValue: string;     // e.g. URL, file path, page number
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReferenceInput {
  chunkId: string;
  sourceType: string;
  sourceValue: string;
}

export interface UpdateReferenceInput {
  sourceType?: string;
  sourceValue?: string;
}
