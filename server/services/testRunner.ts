
import { exec } from 'child_process'

let testPromise: Promise<void> = null
let installDone = false
let testsDone = false
let startTime: number = null
let installEndTime: number = null
let testEndTime: number = null

export type TestRunnerStage = 'INSTALLING' | 'TESTING' | 'DONE' | 'FAILED_INSTALL' | 'FAILED_TEST'
export namespace TestRunnerStage {
  export const INSTALLING: TestRunnerStage = 'INSTALLING'
  export const TESTING: TestRunnerStage = 'TESTING'
  export const DONE: TestRunnerStage = 'DONE'
  export const FAILED_INSTALL: TestRunnerStage = 'FAILED_INSTALL'
  export const FAILED_TEST: TestRunnerStage = 'FAILED_TEST'
}

export interface TestRunnerResult {
  stage: TestRunnerStage
  secondsElapsedInPhase: number
  secondsElapsedTotal: number
  error?: Error
}

const makeTimeout = (duration: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

const checkWithTimeout = (timeout: number) => {
  return new Promise<void>((resolve, reject) => {
    testPromise.then(resolve).catch(reject)
    makeTimeout(timeout).then(resolve)
  })
}

const runInstall = () => {
  return new Promise<void>((resolve, reject) => {
    startTime = Date.now()
    exec('npm install', (err, stdout, stderr) => {
      installEndTime = Date.now()
      if (err) {
        reject(err)
      } else {
        installDone = true
        resolve()
      }
    })
  })
}

const runTests = () => {
  return new Promise<void>((resolve, reject) => {
    exec('npm test', (err, stdout, stderr) => {
      testEndTime = Date.now()
      if (err) {
        reject(err)
      } else {
        testsDone = true
        resolve()
      }
    })
  })
}

const toSeconds = (milliseconds: number) => {
  return Math.round(milliseconds / 100) / 10
}

const done = (): TestRunnerResult => {
  return {
    stage: 'DONE',
    secondsElapsedInPhase: toSeconds(testEndTime - installEndTime),
    secondsElapsedTotal: toSeconds(testEndTime - startTime)
  }
}

const testing = (): TestRunnerResult => {
  const now = Date.now()
  return {
    stage: 'TESTING',
    secondsElapsedInPhase: toSeconds(now - installEndTime),
    secondsElapsedTotal: toSeconds(now - startTime)
  }
}

const installing = (): TestRunnerResult => {
  const now = Date.now()
  return {
    stage: 'INSTALLING',
    secondsElapsedInPhase: toSeconds(now - startTime),
    secondsElapsedTotal: toSeconds(now - startTime)
  }
}

const testFailed = (err: Error): TestRunnerResult => {
  return {
    stage: 'FAILED_TEST',
    secondsElapsedInPhase: toSeconds(testEndTime - installEndTime),
    secondsElapsedTotal: toSeconds(testEndTime - startTime),
    error: err
  }
}

const installFailed = (err: Error): TestRunnerResult => {
  return {
    stage: 'FAILED_INSTALL',
    secondsElapsedInPhase: toSeconds(installEndTime - startTime),
    secondsElapsedTotal: toSeconds(installEndTime - startTime),
    error: err
  }
}

const DEFAULT_TIMEOUT = 1000
export const getStatus = async (timeout = DEFAULT_TIMEOUT): Promise<TestRunnerResult> => {
  let responded = false
  testPromise = testPromise || runInstall().then(runTests)
  try {
    await checkWithTimeout(timeout)
    if (testsDone) {
      return done()
    } else if (installDone) {
      return testing()
    } else {
      return installing()
    }
  } catch (e) {
    if (installDone) {
      return testFailed(e)
    } else {
      return installFailed(e)
    }
  }
}
