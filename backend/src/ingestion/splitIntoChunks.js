"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitIntoChunks = splitIntoChunks;
const crypto_1 = __importDefault(require("crypto"));
function splitIntoChunks(text, options = {
    maxChunkSize: 1000,
    overlapSize: 200,
}) {
    const maxChunkSize = options.maxChunkSize;
    const overlapSize = options.overlapSize;
    const version = options.version ?? 1;
    const baseMetadata = options.baseMetadata ?? {};
    const chunks = [];
    const normalized = text.replace(/\r\n/g, "\n").trim();
    if (!normalized) {
        return [];
    }
    let position = 0;
    let index = 0;
    while (index < normalized.length) {
        const end = Math.min(index + maxChunkSize, normalized.length);
        const content = normalized.slice(index, end);
        const length = content.length;
        const overlap = index === 0 ? 0 : Math.min(overlapSize, length);
        const hash = crypto_1.default
            .createHash("sha256")
            .update(content)
            .digest("hex");
        const metadata = {
            ...baseMetadata,
            position,
            length,
            overlap,
        };
        chunks.push({
            content,
            position,
            length,
            overlap,
            hash,
            version,
            metadata,
        });
        position += 1;
        if (end === normalized.length)
            break;
        index = end - overlapSize;
    }
    return chunks;
}
