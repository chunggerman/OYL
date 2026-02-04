import { FileUpload, CreateFileUploadInput } from "../entities/FileUpload";

export interface FileUploadRepository {
  listByWorkspace(workspaceId: string): Promise<FileUpload[]>;
  create(input: CreateFileUploadInput): Promise<FileUpload>;
  getById(id: string): Promise<FileUpload | null>;
  delete(id: string): Promise<void>;
}
