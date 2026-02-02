
import { Pool } from "pg";

export async function listTaggedReferences(db: Pool, tagId: string) {
  const result = await db.query(
    `
    SELECT r.id, r.name, r.description
    FROM reference_items r
    JOIN tag_links tl ON tl.reference_id = r.id
    WHERE tl.tag_id = $1
    ORDER BY r.created_at DESC
    `,
    [tagId]
  );

  return result.rows;
}
