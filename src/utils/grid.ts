export function getGridSize(cells: number, aspectratio: number): readonly [number, number] {
    const columns = Math.min(cells, Math.floor(Math.sqrt(aspectratio * cells)));
    const rows = Math.floor((cells + columns - 1) / columns);
    return [columns, rows];
};