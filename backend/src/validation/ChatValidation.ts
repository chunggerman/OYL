import {
  requireString,
  optionalObject,
  ValidationError,
} from "./index";

export function validateCreateChat(body: any) {
  return {
    workspaceId: requireString(body.workspaceId, "workspaceId"),
    title: requireString(body.title, "title"),
    metadata: optionalObject(body.metadata, "metadata"),
  };
}

export function validateUpdateChat(body: any) {
  if (!body.title && !body.metadata) {
    throw new ValidationError("Nothing to update");
  }

  return {
    title: body.title ? requireString(body.title, "title") : undefined,
    metadata: optionalObject(body.metadata, "metadata"),
  };
}
