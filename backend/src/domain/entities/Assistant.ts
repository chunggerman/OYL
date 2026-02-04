export interface Assistant {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAssistantInput {
  name: string;
  description?: string | null;
}

export interface UpdateAssistantInput {
  name?: string;
  description?: string | null;
}
