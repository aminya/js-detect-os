type Args = {
    userAgent?: string;
    platform?: string;
    version?: string;
};
export type Target = {
    os: string;
    platform: RegExp;
    agent: RegExp;
    isMobile: (args: Args) => boolean;
    version: (args: Omit<Args, 'version'>) => string | undefined;
    name: (args: Args) => string | undefined;
    arch: (args: Args) => string | undefined;
};
export declare const android: Target;
export declare const ios: Target;
export declare const macos: Target;
export declare const windows: Target;
export declare const linux: Target;
export {};
