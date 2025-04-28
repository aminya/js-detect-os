import { type Target } from './platforms.mjs';
declare global {
    interface Navigator {
        deviceMemory?: number | undefined;
        hardwareConcurrency?: number | undefined;
        cpuClass?: string | undefined;
    }
}
export default class OSDetector {
    debug?: boolean;
    detected: {
        os: string | undefined;
        isMobile: boolean | undefined;
        name: string | undefined;
        version: string | undefined;
        ram: number | undefined;
        cpuCount: number | undefined;
        platform: string | undefined;
        userAgent: string | undefined;
        arch: string | undefined;
    };
    constructor();
    static get types(): {
        android: Target;
        ios: Target;
        linux: Target;
        macos: Target;
        windows: Target;
    };
    detect(navigator?: Partial<Navigator>): {
        os: string | undefined;
        isMobile: boolean | undefined;
        name: string | undefined;
        version: string | undefined;
        ram: number | undefined;
        cpuCount: number | undefined;
        platform: string | undefined;
        userAgent: string | undefined;
        arch: string | undefined;
    };
    isMobile(): boolean | undefined;
    os(): string | undefined;
    platform(): string | undefined;
    arch(): string | undefined;
    userAgent(): string | undefined;
    name(): string | undefined;
    version(): string | undefined;
    ram(): number | undefined;
    cpuCount(): number | undefined;
}
