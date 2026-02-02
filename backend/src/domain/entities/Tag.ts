export type TagSource = "BUILDER" | "AI";

export interface Tag {
  id: string;
  referenceId: string;
  tag: string;
  source: TagSource;
  createdAt: Date;
}
