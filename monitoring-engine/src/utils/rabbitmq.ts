import ampq, { Connection, Channel, ChannelModel } from 'amqplib'


let connection: ChannelModel
let channel: Channel;


export const connectRabbitMQ = async () => {
    try {
        const ampqServer = process.env.RABBITMQ_URL || `amqp://localhost:5672`
        connection = await ampq.connect(ampqServer)
        channel = await connection.createChannel()

        await channel.assertQueue('health_check', { durable: true })
        console.log("RabbitMQ connected")




    }
    catch (error) {
        console.log("Error in connecting to RabbitMQ", error)

    }
}

export const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel not initialized!');
    }
    return channel;
};