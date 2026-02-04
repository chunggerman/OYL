export interface FileUpload {
  id: string;
  workspaceId: string;
  filename: string;
  mimetype: string;
  size: number;
  storagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFileUploadInput {
  workspaceId: string;
  filename: string;
  mimetype: string;
  size: number;
  storagePath: string;
}
