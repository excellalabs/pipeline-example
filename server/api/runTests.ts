
import * as express from 'express'
import * as catcher from 'async-catcher'
import { getStatus, TestRunnerStage } from '../services/testRunner'

const router = express.Router()

router.get('/', catcher(async (req, res) => {
  const timeout = req.query.timeout && parseInt(req.query.timeout) || undefined
  const result = await getStatus(timeout)
  if(result.stage === 'DONE' && !req.query.noredirect){
    return res.redirect('/coverage')
  }
  const formatter = getMessageFormatter(result.stage)
  res.send(formatter(result.secondsElapsedInPhase, result.secondsElapsedTotal, result.error && result.error.message))
}))

type ResultFormatter = (phase: number, total: number, error: string) => string

const INSTALLING_MESSAGE = (phaseTime) => `Installing... (${phaseTime}s elapsed)`
const TESTING_MESSAGE = (phaseTime, totalTime) => `Testing... (${phaseTime}s elapsed -- ${totalTime}s total)`
const SUCCESS_MESSAGE = (phaseTime, totalTime) => `Done!\n\nInstalling took ${totalTime - phaseTime}s\nTesting took ${phaseTime}s\nTook ${totalTime}s total)`

const INSTALL_FAILURE_MESSAGE = (phaseTime, totalTime, err) => `Install failed after ${phaseTime} seconds (${totalTime} elapsed total): ${err}`
const TEST_FAILURE_MESSAGE = (phaseTime, totalTime, err) => `Test run failed after ${phaseTime} seconds (${totalTime} elapsed total): ${err}`

const UNKNOWN_MESSAGE = () => 'Something went wrong!'

function getMessageFormatter (stage: TestRunnerStage): ResultFormatter {
  switch(stage) {
    case TestRunnerStage.INSTALLING: return INSTALLING_MESSAGE
    case TestRunnerStage.TESTING: return TESTING_MESSAGE
    case TestRunnerStage.DONE: return SUCCESS_MESSAGE
    case TestRunnerStage.FAILED_INSTALL: return INSTALL_FAILURE_MESSAGE
    case TestRunnerStage.FAILED_TEST: return TEST_FAILURE_MESSAGE
    default: return UNKNOWN_MESSAGE
  }
}

export default router
