// Test the updated similarity algorithm
function calculateTextSimilarity(text1, text2) {
    const words1 = text1.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !/^\d+$/.test(w));
    const words2 = text2.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !/^\d+$/.test(w));

    if (words1.length === 0 || words2.length === 0) return 0;

    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));

    const wordSimilarity = (intersection.size / set1.size) * 100;

    const phrases1 = [];
    const phrases2 = [];
    const phraseLength = 5;

    for (let i = 0; i <= words1.length - phraseLength; i++) {
        phrases1.push(words1.slice(i, i + phraseLength).join(' '));
    }

    for (let i = 0; i <= words2.length - phraseLength; i++) {
        phrases2.push(words2.slice(i, i + phraseLength).join(' '));
    }

    let phraseSimilarity = 0;
    if (phrases1.length > 0 && phrases2.length > 0) {
        const phraseSet2 = new Set(phrases2);
        const matchedPhrases = phrases1.filter(p => phraseSet2.has(p)).length;
        phraseSimilarity = (matchedPhrases / phrases1.length) * 100;
    }

    const combinedSimilarity = (wordSimilarity * 0.7) + (phraseSimilarity * 0.3);
    return Math.max(0, Math.min(100, combinedSimilarity));
}

console.log("=== PLAGIARISM CHECKER ACCURACY TEST ===\n");

// Test 1: Exact match
const test1 = "Climate change refers to long-term shifts in temperatures and weather patterns.";
const db1 = "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change.";
const result1 = calculateTextSimilarity(test1, db1);
console.log(`Test 1 - Exact Match (First Sentence):`);
console.log(`Result: ${result1.toFixed(2)}%`);
console.log(`Expected: 70-90% (high similarity)\n`);

// Test 2: Paraphrased content
const test2 = "Artificial intelligence represents the simulation of human cognitive processes by computer systems.";
const db2 = "Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems.";
const result2 = calculateTextSimilarity(test2, db2);
console.log(`Test 2 - Paraphrased Content:`);
console.log(`Result: ${result2.toFixed(2)}%`);
console.log(`Expected: 40-70% (moderate similarity)\n`);

// Test 3: Completely different
const test3 = "Quantum computing uses qubits and superposition for faster calculations.";
const db3 = "Climate change refers to long-term shifts in temperatures and weather patterns.";
const result3 = calculateTextSimilarity(test3, db3);
console.log(`Test 3 - Completely Different:`);
console.log(`Result: ${result3.toFixed(2)}%`);
console.log(`Expected: 0-20% (low/no similarity)\n`);

// Test 4: Partial overlap
const test4 = "Climate change is a serious issue. Global warming affects everyone.";
const db4 = "Climate change refers to long-term shifts in temperatures and weather patterns.";
const result4 = calculateTextSimilarity(test4, db4);
console.log(`Test 4 - Partial Overlap:`);
console.log(`Result: ${result4.toFixed(2)}%`);
console.log(`Expected: 20-40% (some similarity)\n`);

console.log("=== TEST COMPLETE ===");
