'use strict'

const fastify = require('../fastify')()
const Promise = require('bluebird')

const schema = {
  out: {
    type: 'object',
    properties: {
      hello: {
        type: 'string'
      }
    }
  }
}

fastify
  .get('/', schema, function (req, reply) {
    // reply.header('Content-Type', 'application/json').code(200)
    // reply.send({ hello: 'world' })
    reply.header('content-type', 'text/plain').code(200).send('callback!')
  })
  .get('/promise', function (req, reply) {
    const promise = new Promise(function (resolve, reject) {
      resolve('promise!')
    })
    reply.header('content-type', 'text/plain').code(200).send(promise)
  })
  .post('/', schema, function (req, reply) {
    reply.send(null, { hello: 'world' })
  })
  .head('/', {}, function (req, reply) {
    reply.send(null)
  })
  .delete('/', schema, function (req, reply) {
    reply.send(null, { hello: 'world' })
  })
  .patch('/', schema, function (req, reply) {
    reply.send(null, { hello: 'world' })
  })

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
