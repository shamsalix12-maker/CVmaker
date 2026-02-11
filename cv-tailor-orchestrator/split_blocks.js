
const fs = require('fs');
const path = require('path');

const sourceFile = '/home/k/Desktop/cvmaker/blocksyml 1 to 26 blocks';
const targetDir = '/home/k/Desktop/cvmaker/cv-tailor-orchestrator/blocks';

const content = fs.readFileSync(sourceFile, 'utf-8');

// Primary separator: Look for id: BXX
// We split by a lookahead of "id: B"
const blockChunks = content.split(/(?=id:\s*B\d+)/m);

blockChunks.forEach(chunk => {
    const match = chunk.match(/id:\s*(B\d+)/);
    if (match) {
        const id = match[1];
        // Clean up: stop at the next significant non-yaml text or end of yaml (max_retries: \d+)
        let cleanChunk = chunk;
        const endMatch = chunk.match(/max_retries:\s*\d+/);
        if (endMatch) {
            cleanChunk = chunk.substring(0, endMatch.index + endMatch[0].length);
        }

        fs.writeFileSync(path.join(targetDir, `${id}.yaml`), cleanChunk);
        console.log(`Saved block ${id}`);
    }
});
