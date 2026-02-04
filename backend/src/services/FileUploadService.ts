export class FileUploadService {
  async upload(workspaceId: string, filename: string, buffer: Buffer) {
    return {
      workspaceId,
      filename,
      size: buffer.length,
      uploaded: true
    };
  }
}
