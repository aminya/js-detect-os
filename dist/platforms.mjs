const underscore = /_/g;
const androidVersions = [
    ['Android 11', /^11.*$/],
    ['Android 10', /^10.*$/],
    ['Pie', /^9.*$/],
    ['Oreo', /^8.+$/],
    ['Nougat', /^7.+$/],
    ['Marshmallow', /^6.+$/],
    ['Lollipop', /^5.+$/],
    ['KitKat', /^4.4.*$/],
    ['Jelly Bean', /^4.[1-3].*$/],
    ['Ice Cream Sandwich', /^4.0.*$/],
    ['Honeycomb', /^3.+$/],
    ['Gingerbread', /^2.3.*$/],
    ['FroYo', /^2.2.*/],
    ['Eclair', /^2.[0-1].*$/],
    ['Donut', /^1.6.*$/],
    ['Cupcake', /^1.5.*$/],
    ['Petit Four', /^1.1.*$/]
];
export const android = {
    os: 'android',
    platform: /android.*|aarch64|arm.*/i,
    agent: /(?:android|adr) (\d+([._]\d+)*)/i,
    isMobile: () => true,
    version({ userAgent = '' }) {
        const match = userAgent.match(android.agent);
        return match?.[1];
    },
    name({ version = '' }) {
        const found = androidVersions.find(entry => entry[1].test(version));
        return found?.[0];
    },
    arch({ platform = '', userAgent = '' }) {
        if (platform.toLowerCase().includes('aarch64')) {
            return 'arm64';
        }
        const match = userAgent.match(/armv.*;/i);
        return match?.find(entry => entry.includes('armv')) ?? arch(navigator);
    }
};
export const ios = {
    os: 'ios',
    platform: /(?:iphone|ipod|ipad|Pike v.*)/i,
    agent: /os ((\d+[._])+\d+) like mac os x/i,
    isMobile: () => true,
    version({ userAgent = '' }) {
        const match = userAgent.match(ios.agent);
        return match?.[1]?.replace(underscore, '.');
    },
    name() {
        return undefined;
    },
    arch() {
        return arch(navigator);
    }
};
const macosVersions = [
    ['Catalina', /^10.15.*$/],
    ['Mojave', /^10.14.*$/],
    ['High Sierra', /^10.13.*$/],
    ['Sierra', /^10.12.*$/],
    ['El Capitan', /^10.11.*$/],
    ['Yosemite', /^10.10.*$/],
    ['Mavericks', /^10.9.*$/],
    ['Mountain Lion', /^10.8.*$/],
    ['Lion', /^10.7.*$/],
    ['Snow Leopard', /^10.6.*$/],
    ['Leopard', /^10.5.*$/],
    ['Tiger', /^10.4.*$/],
    ['Panther', /^10.3.*$/],
    ['Jaguar', /^10.2.*$/],
    ['Puma', /^10.1.*$/],
    ['Cheetah', /^10.0.*$/]
];
export const macos = {
    os: 'macos',
    platform: /mac.*/i,
    agent: /os x ((\d+[._])+\d+)\b/i,
    isMobile: () => false,
    arch() {
        return arch(navigator);
    },
    version({ userAgent = '' }) {
        const match = userAgent.match(macos.agent);
        return match?.[1]?.replace(underscore, '.');
    },
    name({ version = '' }) {
        const found = macosVersions.find(entry => entry[1].test(version));
        return found?.[0];
    }
};
export const windows = {
    os: 'windows',
    platform: /win.*/i,
    agent: /win(?:dows)?(?: phone)?[ _]?(?:(?:nt|9x) )?((?:(\d+\.)*\d+)|xp|me|ce)\b/i,
    isMobile: ({ userAgent = '' }) => userAgent.toLowerCase().indexOf('windows phone') > -1,
    arch({ platform, userAgent }) {
        if (platform === 'win64') {
            return 'x64';
        }
        return arch(navigator);
    },
    name() {
        return undefined;
    },
    version({ userAgent = '' }) {
        const match = userAgent.match(windows.agent);
        if (match?.[1]) {
            switch (match[1]) {
                case '6.4':
                case '10.0':
                    // some versions of Firefox mistakenly used 6.4
                    return '10.0';
                case '6.3':
                case '8.1':
                    return '8.1';
                case '6.2':
                case '8.0':
                    return '8';
                case '6.1':
                case '7.0':
                    return '7';
                case '6.0':
                    return 'Vista';
                case '5.2':
                    return 'Server 2003';
                case '5.1':
                    return 'XP';
                case '5.01':
                    return '2000 SP1';
                case '5.0':
                    return '2000';
                case '4.0':
                    return '4.0';
                default:
                // fallthrough
            }
        }
        return undefined;
    }
};
export const linux = {
    os: 'linux',
    isMobile: ({ userAgent = '' }) => userAgent.toLowerCase().indexOf('mobi') > -1,
    platform: /(?:linux.*)/i,
    agent: /(?!.*android.*)(linux|x11|ubuntu)/i,
    arch({ platform = '' }) {
        if (platform.indexOf('i686') > -1) {
            return 'ia32';
        }
        if (platform.indexOf('x86_64') > -1) {
            return 'x64';
        }
        return arch(navigator);
    },
    name() {
        return undefined;
    },
    version() {
        return undefined;
    }
};
const x64 = [
    'x64',
    'x86_64',
    'x86-64',
    'Win64',
    'amd64',
    'AMD64',
    'WOW64',
    'wow64',
    'x64_64',
    'MacIntel',
    'macintel'
];
const x86 = [
    'x86',
    'ia32',
    'i386',
    'i686',
    'x86_32',
    'X86',
];
const arm64 = [
    'arm64',
    'aarch64',
    'WOA',
    'woa',
    'WOA64',
    'woa64',
];
function arch(navigator) {
    const sources = [
        navigator.userAgent,
        navigator.platform,
        navigator.cpuClass
    ]
        .filter(s => typeof s === 'string');
    for (const source of sources) {
        if (source && x64.some((str) => source.toLowerCase().includes(str))) {
            return 'x64';
        }
        if (source && x86.some((str) => source.toLowerCase().includes(str))) {
            return 'x86';
        }
        if (source && arm64.some((str) => source.toLowerCase().includes(str))) {
            return 'arm64';
        }
    }
    return 'x86';
}
//# sourceMappingURL=platforms.mjs.map