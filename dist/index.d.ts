interface BreakpointsOptions {
    [key: string]: number;
}
declare function reactToBreakpoints(breakpoints: BreakpointsOptions, callback: (id: string) => any): () => void;
export default reactToBreakpoints;
