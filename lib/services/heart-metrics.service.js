"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcRanges = exports.calcValues = exports.calcAll = void 0;
const calcAll = (blocks, settings) => {
    return {
        ...(0, exports.calcValues)(blocks),
        ...(0, exports.calcRanges)(blocks, settings),
    };
};
exports.calcAll = calcAll;
const calcValues = (blocks) => {
    const heartMetrics = {
        hrMax: 0,
        hrMin: 0,
        avgHr: 0,
    };
    heartMetrics.avgHr = blocks.heartBlocks.reduce((a, b, c, d) => a + b.heartRate, 0) / blocks.heartBlocks.length;
    heartMetrics.hrMax = Math.max(...blocks.heartBlocks.map((hb) => hb.heartRate));
    heartMetrics.hrMin = Math.min(...blocks.heartBlocks.map((hb) => hb.heartRate));
    return heartMetrics;
};
exports.calcValues = calcValues;
const calcRanges = (blocks, settings) => {
    const heartMetrics = {
        heartRanges: [],
    };
    const heartRanges = [];
    for (let i = 1; blocks.heartBlocks.length > i; i++) {
        const diff = new Date(blocks.heartBlocks[i].time).valueOf() - new Date(blocks.heartBlocks[i - 1].time).valueOf();
        // ADD ITEM FOR EVERY KEYS
        if (!heartRanges.find((sr) => sr.key === blocks.heartBlocks[i].heartRange)) {
            heartRanges.push({ key: blocks.heartBlocks[i].heartRange, value: 0 });
        }
        // FIND ITEM
        const updateItem = heartRanges.find((sr) => sr.key === blocks.heartBlocks[i].heartRange);
        if (updateItem && heartRanges) {
            updateItem.value += diff;
            // UPDATE TIME
            const index = heartRanges.indexOf(updateItem);
            heartRanges[index] = updateItem;
        }
    }
    heartMetrics.heartRanges = heartRanges;
    return heartMetrics;
};
exports.calcRanges = calcRanges;
exports.default = { calcAll: exports.calcAll, calcValues: exports.calcValues, calcRanges: exports.calcRanges };
