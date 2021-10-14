const nmea = require('@drivetech/node-nmea')
const { buildService } = require('@digicatapult/wasp-payload-processor')
const { WASP_SENSOR_TYPE } = require('./env')

const payloadProcessor =
  ({ logger }) =>
  ({ thingId, timestamp, payload }) => {
    if (payload.messageType !== 'DATA') {
      throw new Error(`Unexpected messageType: "${payload.messageType}"`)
    }

    switch (payload.appId) {
      case 'BUTTON':
        if (!['0', '1'].includes(payload.data)) {
          throw new Error(`Unexpected button data: "${payload.data}"`)
        }
        return formatEvent({
          thingId,
          timestamp,
          type: payload.data === '1' ? 'button_pressed' : 'button_released',
        })
      case 'FLIP':
        if (!['NORMAL', 'UPSIDE_DOWN'].includes(payload.data)) {
          throw new Error(`Unexpected flip data: "${payload.data}"`)
        }
        return formatEvent({
          thingId,
          timestamp,
          type: payload.data === 'NORMAL' ? 'flipped_normal' : 'flipped_upside_down',
        })
      case 'HUMID':
        return formatReading({
          thingId,
          timestamp,
          type: 'humidity',
          label: 'relative_humidity',
          value: parseFloat(payload.data), // relative humidity as %
          unit: '%',
        })
      case 'TEMP':
        return formatReading({
          thingId,
          timestamp,
          type: 'temperature',
          label: 'air_temperature',
          value: parseFloat(payload.data), // celsius
          unit: '°C',
        })
      case 'AIR_PRESS':
        return formatReading({
          thingId,
          timestamp,
          type: 'pressure',
          label: 'air_pressure',
          value: parseFloat(payload.data) * 1000, //kPa->Pa
          unit: 'Pa',
        })
      case 'GPS':
        return formatGps({ thingId, timestamp, payload: payload.data }) // latitude, longitude, altitude
      case 'LIGHT':
        logger.info(`Ignoring LIGHT ${payload.appId}`)
        break
      case 'AIR_QUAL':
        logger.info(`Ignoring AIR_QUAL ${payload.appId}`)
        break
      case 'RSRP':
        logger.info(`Ignoring RSRP ${payload.appId}`)
        break
      default:
        throw new Error(`Unexpected appId: ${payload.appId}`)
    }
  }

const formatEvent = ({ thingId, timestamp, type, details = {} }) => {
  return {
    events: [
      {
        thingId,
        timestamp,
        type,
        details,
      },
    ],
  }
}

const formatReading = ({ thingId, timestamp, type, label, unit, value }) => {
  return {
    readings: [
      {
        dataset: {
          thingId,
          type,
          label,
          unit,
        },
        timestamp,
        value,
      },
    ],
  }
}

const formatGps = ({ thingId, timestamp, payload: payloadData }) => {
  let parsedPayload = null

  // remove any whitespace as parser will invalidate payload, and line endings that will cause parsing issues
  const payload = payloadData.replace(/\s/g, '')

  // Thingy91 GPGGA value is not in the correct format as they do not support the geiod model, only the ellipsoid model
  // so if this is the case, pad out missing value with ' ' before the checksum value
  const payloadSplit = payload.split(',')
  const payloadSplitLastIndex = payloadSplit.length - 1

  if (payloadSplitLastIndex === 13) {
    const payloadSplitLastElement = payloadSplit[payloadSplitLastIndex]

    payloadSplit[payloadSplitLastIndex] = ''
    payloadSplit.push(payloadSplitLastElement)

    parsedPayload = nmea.parse(payloadSplit.join())
  } else {
    parsedPayload = nmea.parse(payload)
  }

  return {
    readings: [
      {
        dataset: {
          thingId,
          type: 'gps',
          label: 'gps_latitude',
          unit: '°',
        },
        timestamp,
        value: parsedPayload.loc.geojson.coordinates[0],
      },
      {
        dataset: {
          thingId,
          type: 'gps',
          label: 'gps_longitude',
          unit: '°',
        },
        timestamp,
        value: parsedPayload.loc.geojson.coordinates[1],
      },
      {
        dataset: {
          thingId,
          type: 'gps',
          label: 'gps_altitude',
          unit: 'm',
        },
        timestamp,
        value: parsedPayload.altitude,
      },
    ],
    events: [
      {
        thingId,
        timestamp: timestamp,
        type: 'location',
        details: {
          latitude: parsedPayload.loc.geojson.coordinates[0],
          latitudeUnit: '°',
          longitude: parsedPayload.loc.geojson.coordinates[1],
          longitudeUnit: '°',
          altitude: parsedPayload.altitude,
          altitudeUnit: 'm',
        },
      },
    ],
  }
}

const { startServer, createHttpServer } = buildService({
  sensorType: WASP_SENSOR_TYPE,
  payloadProcessor,
})

module.exports = { startServer, createHttpServer }
