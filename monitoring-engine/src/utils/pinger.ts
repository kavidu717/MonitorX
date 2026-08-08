
import axios from 'axios';
import { getChannel } from './rabbitmq';
import { IWebsite } from '../models/Website';

export const pingWebsite = async (website: IWebsite) => {
    const startTime = Date.now();
    let status = 'DOWN';
    let statusCode = 0;
    let responseTime = 0;

    try {
        // Check website
        const response = await axios.get(website.url, { timeout: 10000 });

        // Get response time
        responseTime = Date.now() - startTime;
        statusCode = response.status;

        // Check website status
        status = (statusCode >= 200 && statusCode < 300) ? 'UP' : 'DOWN';

    } catch (error: any) {
        // Handle error
        responseTime = Date.now() - startTime;

        if (error.response) {
            // Get error status code
            statusCode = error.response.status;
        } else {
            // No response
            statusCode = 0;
        }
    }

    // Create result
    const resultPayload = {
        websiteId: website._id,
        url: website.url,
        status,
        statusCode,
        responseTime,
        timestamp: new Date(),
    };

    // Send result to RabbitMQ
    try {
        const channel = getChannel();
        channel.sendToQueue(
            'health_check',
            Buffer.from(JSON.stringify(resultPayload)),
            { persistent: true }
        );
        console.log(`[x] Sent to queue: ${website.url} | Status: ${status} | Time: ${responseTime}ms`);
    } catch (err) {
        // Show error
        console.error(`[!] Failed to publish to RabbitMQ for ${website.url}`, err);
    }

    return resultPayload;
};

