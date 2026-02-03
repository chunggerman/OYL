import { DocumentRepository } from "../domain/repositories/DocumentRepository";
import { WorkspaceRepository } from "../domain/repositories/WorkspaceRepository";
import { Document } from "../domain/entities/Document";

export class DocumentService {
  private documentRepository: DocumentRepository;
  private workspaceRepository: WorkspaceRepository;

  constructor(
    documentRepository?: DocumentRepository,
    workspaceRepository?: WorkspaceRepository
  ) {
    this.documentRepository = documentRepository ?? new DocumentRepository();
    this.workspaceRepository = workspaceRepository ?? new WorkspaceRepository();
  }

  async createDocument(params: {
    workspaceId: string;
    referenceId?: string | null;
    title: string;
    content?: string | null;
  }): Promise<Document> {
    const workspace = await this.workspaceRepository.findById(params.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return this.documentRepository.create({
      workspaceId: params.workspaceId,
      referenceId: params.referenceId ?? null,
      title: params.title,
      content: params.content ?? null,
    });
  }

  async getDocumentById(id: string): Promise<Document | null> {
    return this.documentRepository.findById(id);
  }

  async listDocumentsByWorkspace(workspaceId: string): Promise<Document[]> {
    return this.documentRepository.listByWorkspace(workspaceId);
  }

  async deleteDocument(id: string): Promise<void> {
    await this.documentRepository.softDelete(id);
  }
}
