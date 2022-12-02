const redis =  require('redis')
const client = redis.createClient(6379);

client.connect()

client.on('error',(error) => console.log('Redis Error', error))

const redisConnect = client


module.exports = redisConnect