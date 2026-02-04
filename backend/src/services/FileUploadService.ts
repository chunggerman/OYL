import { FileUpload, CreateFileUploadInput } from "../domain/entities/FileUpload";
import { FileUploadRepository } from "../domain/repositories/FileUploadRepository";

export class FileUploadService {
  constructor(private readonly repo: FileUploadRepository) {}

  listByWorkspace(workspaceId: string): Promise<FileUpload[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateFileUploadInput): Promise<FileUpload> {
    return this.repo.create(input);
  }

  get(id: string): Promise<FileUpload | null> {
    return this.repo.getById(id);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
