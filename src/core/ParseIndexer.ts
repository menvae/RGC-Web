import { fs } from '@zenfs/core';
import { Chart } from '../lib/rgc-chart/rgc_chart';

export interface ChartEntry {
    readonly chart: Chart;
    readonly originalPath: string;
}

export class MapParseIndexer {
    private root: string;
    private entries: ChartEntry[] = [];
    private entriesByName = new Map<string, ChartEntry[] | null>();

    constructor(root: string) {
        this.root = root;
    }

    addEntry(mapName: string, originalPath: string, chart: Chart): void {
        const entry: ChartEntry = { chart, originalPath };
        this.entries.push(entry);
        
        const entries = this.entriesByName.get(mapName) || [];
        entries.push(entry);
        this.entriesByName.set(mapName, entries);
    }

    getEntries(mapName?: string): readonly ChartEntry[] {
        if (mapName) {
            return this.entriesByName.get(mapName) || [];
        }
        return this.entries;
    }

    findEntries(predicate: (entry: ChartEntry) => boolean): readonly ChartEntry[] {
        return this.entries.filter(predicate);
    }

    clear(): this {
        this.entries.length = 0;
        this.entriesByName.forEach((value, key) => {
        this.entriesByName.set(key, null);
    });
    this.entriesByName.clear();
        return this;
    }

    reset(newRoot?: string): this {
        this.clear();
        if (newRoot !== undefined) {
            this.root = newRoot;
        }
        return this;
    }

    getRoot(): string {
        return this.root;
    }

    getMapNames(): readonly string[] {
        return Array.from(this.entriesByName.keys());
    }

    hasMap(mapName: string): boolean {
        return this.entriesByName.has(mapName);
    }
}