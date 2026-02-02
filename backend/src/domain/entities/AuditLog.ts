export interface AuditLog {
  id: string;
  tenantId: string;
  workspaceId: string;
  userId: string | null;
  action: string;
  payloadJson: any | null;
  createdAt: Date;
}
