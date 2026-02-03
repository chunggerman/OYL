"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedText = embedText;
async function embedText(chunks) {
    return chunks.map((chunk) => {
        const vector = new Array(128).fill(0).map((_, i) => (chunk.length % (i + 1)) / 10);
        return vector;
    });
}
