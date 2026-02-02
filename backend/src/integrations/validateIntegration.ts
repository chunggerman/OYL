
export function validateIntegrationConfig(type: string, config: any) {
  if (type === "webhook") {
    if (!config.url) throw new Error("Webhook integration requires 'url'");
    return true;
  }

  if (type === "database") {
    if (!config.connectionString) throw new Error("Database integration requires 'connectionString'");
    return true;
  }

  return true;
}
