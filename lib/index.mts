import { android, macos, ios, linux, windows, type Target } from './platforms.mjs'

const allPlatforms = [android, windows, ios, macos, linux]

function isPlatform (target: Target, { strict = true, navigator = window.navigator }: { strict?: boolean; navigator?: Partial<Navigator> } = {}) {
  const { platform, userAgent } = navigator
  const platformMatch = platform ? target.platform.test(platform) : false
  const agentMatch = userAgent ? target.agent.test(userAgent) : false
  return strict
    ? platformMatch && agentMatch
    : platformMatch || agentMatch
}

declare global {
  interface Navigator {
    deviceMemory?: number | undefined
    hardwareConcurrency?: number | undefined
    cpuClass?: string | undefined
  }
}

export default class OSDetector {
  debug?: boolean
  detected: {
    os: string | undefined;
    isMobile: boolean | undefined;
    name: string | undefined;
    version: string | undefined;
    ram: number | undefined;
    cpuCount: number | undefined;
    platform: string | undefined;
    userAgent: string | undefined
    arch: string | undefined
  }

  constructor () {
    this.detected = {
      os: undefined,
      isMobile: undefined,
      name: undefined,
      version: undefined,
      ram: undefined,
      cpuCount: undefined,
      platform: undefined,
      userAgent: undefined,
      arch: undefined
    }
  }

  static get types () {
    return {
      android,
      ios,
      linux,
      macos,
      windows
    }
  }

  detect (navigator: Partial<Navigator> = window.navigator) {
    // always assign navigator values
    const { userAgent } = navigator
    const { platform } = navigator
    this.detected.userAgent = userAgent
    this.detected.platform = platform
    this.detected.ram = navigator.deviceMemory
    this.detected.cpuCount = navigator.hardwareConcurrency

    let found = allPlatforms.find(target => isPlatform(target, { strict: true, navigator }))
    if (!found) {
      found = allPlatforms.find(target => isPlatform(target, { strict: false, navigator }))
    }

    if (!found) {
      this.detected.name = 'unknown'
    } else {
      this.detected.os = found.os
      this.detected.version = found.version({ userAgent, platform })
      this.detected.isMobile = found.isMobile({ userAgent, platform, version: this.detected.version })
      this.detected.name = found.name({ userAgent, platform, version: this.detected.version })
      this.detected.arch = found.arch({ platform, userAgent })
    }
    return this.detected
  }

  isMobile () {
    return this.detected.isMobile
  }

  os () {
    return this.detected.os
  }

  platform () {
    return this.detected.platform
  }

  arch () {
    return this.detected.arch
  }

  userAgent () {
    return this.detected.userAgent
  }

  name () {
    return this.detected.name
  }

  version () {
    return this.detected.version
  }

  ram () {
    return this.detected.ram
  }

  cpuCount () {
    return this.detected.cpuCount
  }
}
