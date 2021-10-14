const READING_PAYLOAD_1 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'TEMP',
        data: '20.9',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'temperature',
        label: 'air_temperature',
        unit: '°C',
      },
      timestamp: messageTimestamp,
      value: 20.9,
    },
  ],
  expectedEvents: [],
})

const READING_PAYLOAD_2 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'HUMID',
        data: '70.9',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'humidity',
        label: 'relative_humidity',
        unit: '%',
      },
      timestamp: messageTimestamp,
      value: 70.9,
    },
  ],
})

const AIR_PRESS_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'AIR_PRESS',
        data: '103.2',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'pressure',
        label: 'air_pressure',
        unit: 'Pa',
      },
      timestamp: messageTimestamp,
      value: 103200,
    },
  ],
  expectedEvents: [],
})

const GPS_PAYLOAD_01 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      payload: {
        appId: 'GPS',
        data: '$GPGGA,120558.916,5058.7457,N,00647.0514,E,2,06,1.7,109.0,M,47.6,M,1.5,0000*71',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_latitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 6.78419,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_longitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 50.979095,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_altitude',
        unit: 'm',
      },
      timestamp: messageTimestamp,
      value: 109,
    },
  ],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'location',
      details: {
        latitude: 6.78419,
        latitudeUnit: '°',
        longitude: 50.979095,
        longitudeUnit: '°',
        altitude: 109,
        altitudeUnit: 'm',
      },
    },
  ],
})

const GPS_PAYLOAD_02 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'GPS',
        data: '$GPGGA,001038.00,3334.2313457,N,11211.0576940,W,2,04,5.4,354.682,M,-  26.574,M,7.0,0138*79',
        messageType: 'DATA',
      },
    }),
    metadata: {},
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_latitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: -112.1842949,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_longitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 33.570522428333334,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_altitude',
        unit: 'm',
      },
      timestamp: messageTimestamp,
      value: 354.682,
    },
  ],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'location',
      details: {
        latitude: -112.1842949,
        latitudeUnit: '°',
        longitude: 33.570522428333334,
        longitudeUnit: '°',
        altitude: 354.682,
        altitudeUnit: 'm',
      },
    },
  ],
})

const GPS_PAYLOAD_THINGY91_FORMAT_01 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'GPS',
        data: '$GPGGA,120558.916,5058.7457,N,00647.0514,E,2,06,1.7,109.0,M,47.6,,*71\r\n',
        messageType: 'DATA',
      },
    }),
    metadata: {},
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_latitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 6.78419,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_longitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 50.979095,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_altitude',
        unit: 'm',
      },
      timestamp: messageTimestamp,
      value: 109,
    },
  ],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'location',
      details: {
        latitude: 6.78419,
        latitudeUnit: '°',
        longitude: 50.979095,
        longitudeUnit: '°',
        altitude: 109,
        altitudeUnit: 'm',
      },
    },
  ],
})

const GPS_PAYLOAD_THINGY91_FORMAT_02 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'GPS',
        data: '$GPGGA,001038.00,3334.2313457,N,11211.0576940,W,2,04,5.4,354.682,M,-26.574,,*79\r\n',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_latitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: -112.1842949,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_longitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 33.570522428333334,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_altitude',
        unit: 'm',
      },
      timestamp: messageTimestamp,
      value: 354.682,
    },
  ],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'location',
      details: {
        latitude: -112.1842949,
        latitudeUnit: '°',
        longitude: 33.570522428333334,
        longitudeUnit: '°',
        altitude: 354.682,
        altitudeUnit: 'm',
      },
    },
  ],
})

const GPS_PAYLOAD_THINGY91_FORMAT_03 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'GPS',
        data: '$GPGGA,001038.00,3334.2313457,N,11211.0576940,W,2,04,5.4,354.682,M,,M,,*79\r\n',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_latitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: -112.1842949,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_longitude',
        unit: '°',
      },
      timestamp: messageTimestamp,
      value: 33.570522428333334,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'gps',
        label: 'gps_altitude',
        unit: 'm',
      },
      timestamp: messageTimestamp,
      value: 354.682,
    },
  ],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'location',
      details: {
        latitude: -112.1842949,
        latitudeUnit: '°',
        longitude: 33.570522428333334,
        longitudeUnit: '°',
        altitude: 354.682,
        altitudeUnit: 'm',
      },
    },
  ],
})

const AIR_QUAL_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'AIR_QUAL',
        data: '47.1',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

const BUTTON_EVENT_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'BUTTON',
        data: '1',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'button_pressed',
      details: {},
    },
  ],
})

const FLIP_EVENT_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'FLIP',
        data: 'UPSIDE_DOWN',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'flipped_upside_down',
      details: {},
    },
  ],
})

const UNEXPECTED_MESSAGE_TYPE_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'TEMP',
        data: '20.0',
        messageType: 'invalid',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

const UNEXPECTED_BUTTON_DATA_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'BUTTON',
        data: 'invalid',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

const UNEXPECTED_FLIP_DATA_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'FLIP',
        data: 'invalid',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

const UNEXPECTED_APP_ID_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'thingy91',
      ingest: 'nordic-cloud',
      ingestId: 'nrf-111111111111111',
      timestamp: messageTimestamp,
      payload: {
        appId: 'invalid',
        data: '',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

module.exports = {
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
}
