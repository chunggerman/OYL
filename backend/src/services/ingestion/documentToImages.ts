import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function pdfToImages(pdfPath: string, outDir: string): Promise<string[]> {
  await ensureDir(outDir);
  const base = path.join(outDir, "page");
  await execFileAsync("pdftoppm", ["-png", pdfPath, base]);
  const files = await fs.promises.readdir(outDir);
  return files
    .filter(f => f.startsWith("page-") || f.startsWith("page"))
    .filter(f => f.endsWith(".png"))
    .map(f => path.join(outDir, f))
    .sort();
}

async function officeToPdf(inputPath: string, outDir: string): Promise<string> {
  await ensureDir(outDir);
  await execFileAsync("libreoffice", [
    "--headless",
    "--convert-to",
    "pdf",
    "--outdir",
    outDir,
    inputPath
  ]);
  const files = await fs.promises.readdir(outDir);
  const pdf = files.find(f => f.toLowerCase().endsWith(".pdf"));
  if (!pdf) throw new Error("Failed to convert to PDF: " + inputPath);
  return path.join(outDir, pdf);
}

export async function documentToImages(
  workspaceId: string,
  documentId: string,
  filePath: string,
  storageRoot: string
): Promise<string[]> {
  const ext = path.extname(filePath).toLowerCase();
  const docDir = path.join(
    storageRoot,
    "workspaces",
    workspaceId,
    "documents",
    documentId
  );
  const imagesDir = path.join(docDir, "pages");
  await ensureDir(docDir);

  if (ext === ".pdf") {
    return pdfToImages(filePath, imagesDir);
  }

  if (ext === ".docx" || ext === ".pptx" || ext === ".ppt" || ext === ".doc") {
    const tmpPdfDir = path.join(docDir, "pdf");
    const pdfPath = await officeToPdf(filePath, tmpPdfDir);
    return pdfToImages(pdfPath, imagesDir);
  }

  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    await ensureDir(imagesDir);
    const target = path.join(imagesDir, "page_1" + ext);
    await fs.promises.copyFile(filePath, target);
    return [target];
  }

  throw new Error("Unsupported file type for documentToImages: " + ext);
}
