interface BreakpointsOptions {
    [key: string]: number;
}
declare class ReactiveMediaQueries {
    teardowns: Set<() => any>;
    constructor(breakpoints: BreakpointsOptions, callback: (id: string) => any);
    destroy(): void;
}
export default ReactiveMediaQueries;
