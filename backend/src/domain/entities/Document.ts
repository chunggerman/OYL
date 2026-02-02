export interface Document {
  id: string;
  referenceId: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  metadataJson: any | null;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
