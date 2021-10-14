const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const moment = require('moment')
const { setupServer } = require('./helpers/server')
const setupKafka = require('./helpers/kafka')
const { WASP_SENSOR_TYPE } = require('../../app/env')

const {
  READING_PAYLOAD_1,
  READING_PAYLOAD_2,
  AIR_PRESS_PAYLOAD,
  AIR_QUAL_PAYLOAD,
  GPS_PAYLOAD_01,
  GPS_PAYLOAD_02,
  GPS_PAYLOAD_THINGY91_FORMAT_01,
  GPS_PAYLOAD_THINGY91_FORMAT_02,
  GPS_PAYLOAD_THINGY91_FORMAT_03,
  BUTTON_EVENT_PAYLOAD,
  FLIP_EVENT_PAYLOAD,
  UNEXPECTED_MESSAGE_TYPE_PAYLOAD,
  UNEXPECTED_BUTTON_DATA_PAYLOAD,
  UNEXPECTED_FLIP_DATA_PAYLOAD,
  UNEXPECTED_APP_ID_PAYLOAD,
} = require('./data/payloads')

describe('message Processing', function () {
  const context = {}
  setupServer(context)
  setupKafka(context)

  const singlePayloadTest = ({ context, description, payloadTemplate, expectation }) => {
    describe(description, function () {
      let payload

      before(async function () {
        payload = payloadTemplate(new Date().toISOString())
        context.result = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payload.message,
          1
        )
      })

      it(expectation, function () {
        const readings = context.result.get('readings')
        expect(readings).to.deep.equal(payload.expectedReadings)
        const events = context.result.get('events')
        expect(events).to.deep.equal(payload.expectedEvents)
      })
    })
  }

  describe('happy path', function () {
    singlePayloadTest({
      context,
      description: 'single reading',
      payloadTemplate: READING_PAYLOAD_1,
      expectation: 'should forward the correct reading',
    })

    singlePayloadTest({
      context,
      description: 'air pressure reading',
      payloadTemplate: AIR_PRESS_PAYLOAD,
      expectation: 'should forward the correct reading',
    })

    singlePayloadTest({
      context,
      description: 'air quality reading',
      payloadTemplate: AIR_QUAL_PAYLOAD,
      expectation: 'should not forward unimportant readings',
    })

    singlePayloadTest({
      context,
      description: 'gps reading',
      payloadTemplate: GPS_PAYLOAD_01,
      expectation: 'should forward correct readings and event',
    })

    singlePayloadTest({
      context,
      description: 'gps reading',
      payloadTemplate: GPS_PAYLOAD_02,
      expectation: 'should forward correct readings and event',
    })

    singlePayloadTest({
      context,
      description: 'gps reading',
      payloadTemplate: GPS_PAYLOAD_THINGY91_FORMAT_01,
      expectation: 'should forward correct readings and event',
    })

    singlePayloadTest({
      context,
      description: 'gps reading',
      payloadTemplate: GPS_PAYLOAD_THINGY91_FORMAT_02,
      expectation: 'should forward correct readings and event',
    })

    singlePayloadTest({
      context,
      description: 'gps reading',
      payloadTemplate: GPS_PAYLOAD_THINGY91_FORMAT_03,
      expectation: 'should forward correct readings and event',
    })

    describe('multiple readings', function () {
      let payloadOne
      let payloadTwo

      before(async function () {
        const timestampOne = moment().subtract(2, 'day').toISOString()
        payloadOne = READING_PAYLOAD_1(timestampOne)
        context.resultOne = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payloadOne.message,
          1
        )

        const timestampTwo = moment().subtract(1, 'day').toISOString()
        payloadTwo = READING_PAYLOAD_2(timestampTwo)
        context.resultTwo = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payloadTwo.message,
          1
        )
      })

      it('should forward the correct readings', function () {
        const readingsResultOne = context.resultOne.get('readings')
        expect(readingsResultOne).to.deep.equal(payloadOne.expectedReadings)

        const readingsResultTwo = context.resultTwo.get('readings')
        expect(readingsResultTwo).to.deep.equal(payloadTwo.expectedReadings)
      })
    })

    singlePayloadTest({
      context,
      description: 'button event',
      payloadTemplate: BUTTON_EVENT_PAYLOAD,
      expectation: 'should forward the correct event',
    })

    singlePayloadTest({
      context,
      description: 'flip event',
      payloadTemplate: FLIP_EVENT_PAYLOAD,
      expectation: 'should forward the correct event',
    })
  })

  describe('unexpected payloads', function () {
    singlePayloadTest({
      context,
      description: 'unexpected message type',
      payloadTemplate: UNEXPECTED_MESSAGE_TYPE_PAYLOAD,
      expectation: 'should not forward',
    })

    singlePayloadTest({
      context,
      description: 'unexpected button data',
      payloadTemplate: UNEXPECTED_BUTTON_DATA_PAYLOAD,
      expectation: 'should not forward',
    })

    singlePayloadTest({
      context,
      description: 'unexpected flip data',
      payloadTemplate: UNEXPECTED_FLIP_DATA_PAYLOAD,
      expectation: 'should not forward',
    })

    singlePayloadTest({
      context,
      description: 'unexpected app ID',
      payloadTemplate: UNEXPECTED_APP_ID_PAYLOAD,
      expectation: 'should not forward',
    })
  })
})
