import {ActivityBlocks, ActivitySettings, HeartMetrics} from '../models/activity.model';
import {KeyValue} from '../models/ng-keyvalue.model';

const calcAll = (blocks: ActivityBlocks, settings: ActivitySettings): Partial<HeartMetrics> => {
    return {
        ...calcValues(blocks),
        ...calcRanges(blocks, settings),
    };
};

const calcValues = (blocks: ActivityBlocks): Pick<HeartMetrics, 'hrMax' | 'hrMin' | 'avgHr'> => {
    const heartMetrics: Pick<HeartMetrics, 'hrMax' | 'hrMin' | 'avgHr'> = {
        hrMax: 0,
        hrMin: 0,
        avgHr: 0,
    };

    heartMetrics.avgHr = blocks.heartBlocks.reduce((a, b, c, d) => a + b.heartRate, 0) / blocks.heartBlocks.length;
    heartMetrics.hrMax = Math.max(...blocks.heartBlocks.map((hb) => hb.heartRate));
    heartMetrics.hrMin = Math.min(...blocks.heartBlocks.map((hb) => hb.heartRate));
    return heartMetrics;
};

const calcRanges = (blocks: ActivityBlocks, settings: ActivitySettings): Pick<HeartMetrics, 'heartRanges'> => {
    const heartMetrics: Pick<HeartMetrics, 'heartRanges'> = {
        heartRanges: [],
    };

    const heartRanges: KeyValue<string, number>[] = [];
    for (let i = 1; blocks.heartBlocks.length > i; i++) {
        const diff = new Date(blocks.heartBlocks[i].time).valueOf() - new Date(blocks.heartBlocks[i - 1].time).valueOf();

        // ADD ITEM FOR EVERY KEYS
        if (!heartRanges.find((sr) => sr.key === blocks.heartBlocks[i].heartRange)) {
            heartRanges.push({key: blocks.heartBlocks[i].heartRange, value: 0});
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

export default {calcAll, calcValues, calcRanges};
