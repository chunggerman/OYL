"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentToImages = documentToImages;
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
async function ensureDir(dir) {
    await fs_1.default.promises.mkdir(dir, { recursive: true });
}
async function pdfToImages(pdfPath, outDir) {
    await ensureDir(outDir);
    const base = path_1.default.join(outDir, "page");
    await execFileAsync("pdftoppm", ["-png", pdfPath, base]);
    const files = await fs_1.default.promises.readdir(outDir);
    return files
        .filter(f => f.startsWith("page-") || f.startsWith("page"))
        .filter(f => f.endsWith(".png"))
        .map(f => path_1.default.join(outDir, f))
        .sort();
}
async function officeToPdf(inputPath, outDir) {
    await ensureDir(outDir);
    await execFileAsync("libreoffice", [
        "--headless",
        "--convert-to",
        "pdf",
        "--outdir",
        outDir,
        inputPath
    ]);
    const files = await fs_1.default.promises.readdir(outDir);
    const pdf = files.find(f => f.toLowerCase().endsWith(".pdf"));
    if (!pdf)
        throw new Error("Failed to convert to PDF: " + inputPath);
    return path_1.default.join(outDir, pdf);
}
async function documentToImages(workspaceId, documentId, filePath, storageRoot) {
    const ext = path_1.default.extname(filePath).toLowerCase();
    const docDir = path_1.default.join(storageRoot, "workspaces", workspaceId, "documents", documentId);
    const imagesDir = path_1.default.join(docDir, "pages");
    await ensureDir(docDir);
    if (ext === ".pdf") {
        return pdfToImages(filePath, imagesDir);
    }
    if (ext === ".docx" || ext === ".pptx" || ext === ".ppt" || ext === ".doc") {
        const tmpPdfDir = path_1.default.join(docDir, "pdf");
        const pdfPath = await officeToPdf(filePath, tmpPdfDir);
        return pdfToImages(pdfPath, imagesDir);
    }
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        await ensureDir(imagesDir);
        const target = path_1.default.join(imagesDir, "page_1" + ext);
        await fs_1.default.promises.copyFile(filePath, target);
        return [target];
    }
    throw new Error("Unsupported file type for documentToImages: " + ext);
}
