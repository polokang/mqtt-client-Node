const mqtt = require('mqtt')
const { connectOptions } = require('./use_mqtt.js')

const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8)
const options = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx_test',
    password: 'emqx_test',
    reconnectPeriod: 1000,
}

const { protocol, host, port } = connectOptions
let connectUrl = `${protocol}://${host}:${port}`
const client = mqtt.connect(connectUrl, options)
const topic = 'testtopic/#'
const payload = 'nodejs mqtt test'
const qos = 0
client.on("connect", () => {
    console.log(`${protocol}: Connected`)
    client.subscribe(topic, { qos }, (err) => {
        console.log(`Subscribe to topic '${topic}'`)
        client.on("message", async (topic, payload) => {
            console.log("Received Message:", topic, '| payload: ', payload.toString())
        })
    })
})


