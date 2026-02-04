import {
  requireString,
  optionalObject,
  ValidationError,
} from "./index";

export function validateCreateMessage(body: any) {
  return {
    chatId: requireString(body.chatId, "chatId"),
    role: requireString(body.role, "role"),
    content: requireString(body.content, "content"),
    metadata: optionalObject(body.metadata, "metadata"),
  };
}

export function validateUpdateMessage(body: any) {
  if (!body.content && !body.metadata) {
    throw new ValidationError("Nothing to update");
  }

  return {
    content: body.content ? requireString(body.content, "content") : undefined,
    metadata: optionalObject(body.metadata, "metadata"),
  };
}
