export class DocumentService {
  async list(workspaceId: string) {
    return [
      {
        id: "doc-1",
        workspaceId,
        title: "Sample Document",
        source: "manual"
      }
    ];
  }

  async get(id: string, workspaceId: string) {
    return {
      id,
      workspaceId,
      title: "Sample Document",
      source: "manual"
    };
  }

  async create(workspaceId: string, title: string, source: string) {
    return {
      id: "doc-new",
      workspaceId,
      title,
      source
    };
  }

  async update(id: string, workspaceId: string, title: string, source: string) {
    return {
      id,
      workspaceId,
      title,
      source
    };
  }

  async delete(id: string, workspaceId: string) {
    return {
      id,
      workspaceId,
      deleted: true
    };
  }
}
