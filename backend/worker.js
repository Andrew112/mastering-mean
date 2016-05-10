'use strict'

const config = require('./config')
const monq = require('monq')
const client = monq(config.get('DB_URI'), { safe: true })
const worker = client.worker(['mean'])

worker.register({})

worker.on('dequeued', function (data) {
  console.log('Dequeued:')
  console.log(data)
})

worker.on('failed', function (data) {
  console.log('Failed:')
  console.log(data)
})

worker.on('complete', function (data) {
  console.log('Complete:')
  console.log(data)
})

worker.on('error', function (err) {
  console.log('Error:')
  console.log(err)
  worker.stop()
})

worker.start()
