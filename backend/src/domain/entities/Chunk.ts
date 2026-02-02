export interface Chunk {
  id: string;
  documentId: string;
  position: number;
  text: string;
  tagsText: string[] | null;
  createdAt: Date;
  deletedAt: Date | null;
}
