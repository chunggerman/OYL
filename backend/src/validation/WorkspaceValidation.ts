import {
  requireString,
  optionalObject,
  ValidationError,
} from "./index";

export function validateCreateWorkspace(body: any) {
  return {
    ownerId: requireString(body.ownerId, "ownerId"),
    name: requireString(body.name, "name"),
    metadata: optionalObject(body.metadata, "metadata"),
  };
}

export function validateUpdateWorkspace(body: any) {
  if (!body.name && !body.metadata) {
    throw new ValidationError("Nothing to update");
  }

  return {
    name: body.name ? requireString(body.name, "name") : undefined,
    metadata: optionalObject(body.metadata, "metadata"),
  };
}
