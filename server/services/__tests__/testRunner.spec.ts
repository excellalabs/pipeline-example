
import { TestRunnerStage } from '../testRunner'

describe('getStatus', () => {
  beforeAll(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })
  it(`should should return '${TestRunnerStage.INSTALLING}' if timeout elapses before install is done`, async function (done) {
    jest.setMock('child_process', {
      exec: (() => {})
    })

    const getStatus = require('../testRunner').getStatus

    try {
      let result = await getStatus(0)
      expect(result.stage).toBe(TestRunnerStage.INSTALLING)
    } catch(e) {
      fail(e)
    }
    done()
  })
  it(`should should return '${TestRunnerStage.TESTING}' if timeout elapses after install is done but before testing is done`, async function (done) {
    jest.setMock('child_process', {
      exec: ((command, cb) => {
        if(command.indexOf('install') >= 0){
          cb()
        }
      })
    })

    const getStatus = require('../testRunner').getStatus

    try {
      let result = await getStatus(0)
      expect(result.stage).toBe(TestRunnerStage.TESTING)
    } catch(e) {
      fail(e)
    }
    done()
  })
  it(`should should return '${TestRunnerStage.DONE}' if install and test are done before timeout`, async function (done)  {
    jest.setMock('child_process', {
      exec: ((command, cb) => cb())
    })

    const getStatus = require('../testRunner').getStatus

    try {
      let result = await getStatus(1000)
      expect(result.stage).toBe(TestRunnerStage.DONE)
    } catch(e) {
      fail(e)
    }
    done()
  })
  it(`should should return '${TestRunnerStage.FAILED_INSTALL}' if install sends error before timeout`, async function (done) {
    jest.setMock('child_process', {
      exec: ((command, cb) => cb(new Error('Something went wrong')))
    })

    const getStatus = require('../testRunner').getStatus

    try {
      let result = await getStatus(1000)
      expect(result.stage).toBe(TestRunnerStage.FAILED_INSTALL)
    } catch(e) {
      fail(e)
    }
    done()
  })
  it(`should should return '${TestRunnerStage.FAILED_TEST}' if install finishes and test sends error before timeout`, async function (done) {
    jest.setMock('child_process', {
      exec: ((command, cb) => {
        if(command.indexOf('install') >= 0){
          cb()
        } else {
          cb(new Error('Something went wrong'))
        }
      })
    })

    const getStatus = require('../testRunner').getStatus

    try {
      let result = await getStatus(1000)
      expect(result.stage).toBe(TestRunnerStage.FAILED_TEST)
    } catch(e) {
      fail(e)
    }
    done()
  })
})