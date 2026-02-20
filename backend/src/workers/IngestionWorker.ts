require("dotenv").config({ path: ".env" });

import fs from "fs/promises";
import path from "path";
const pdfParse = require("pdf-parse-fixed");
import { pool } from "../db";

async function getNextQueuedJob() {
  const result = await pool.query(
    `SELECT *
     FROM ingestion_jobs
     WHERE status = 'queued'
     ORDER BY created_at ASC
     LIMIT 1`
  );
  return result.rows[0] || null;
}

async function markJobStatus(jobId: string, status: string, errorMessage: string | null = null) {
  await pool.query(
    `UPDATE ingestion_jobs
     SET status = $1,
         error_message = $2,
         updated_at = NOW()
     WHERE id = $3`,
    [status, errorMessage, jobId]
  );
}

async function getDocumentSource(documentId: string) {
  const result = await pool.query(
    `SELECT uds.*
     FROM uploaded_document_sources uds
     JOIN documents d ON d.document_source_id = uds.id
     WHERE d.id = $1`,
    [documentId]
  );
  return result.rows[0] || null;
}

async function saveExtractedText(documentId: string, text: string) {
  await pool.query(
    `UPDATE documents
     SET content = $1
     WHERE id = $2`,
    [text, documentId]
  );
}

async function processJob(job: any) {
  console.log(`Processing ingestion job ${job.id} for document ${job.document_id}`);

  await markJobStatus(job.id, "processing");

  const source = await getDocumentSource(job.document_id);
  if (!source) {
    await markJobStatus(job.id, "failed", "Document source not found");
    return;
  }

  const filePath = path.resolve(source.storage_path);

  try {
    const fileBuffer = await fs.readFile(filePath);

    const parsed = await pdfParse(fileBuffer);
    const text = parsed.text || "";

    await saveExtractedText(job.document_id, text);

    await markJobStatus(job.id, "completed");
  } catch (err: any) {
    await markJobStatus(job.id, "failed", err.message);
  }
}

async function run() {
  console.log("Ingestion worker started");

  while (true) {
    const job = await getNextQueuedJob();

    if (!job) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      continue;
    }

    await processJob(job);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
