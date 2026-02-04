export interface Chat {
  id: string;
  userId: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChatInput {
  userId: string;
  title?: string | null;
}

export interface UpdateChatInput {
  title?: string | null;
}
