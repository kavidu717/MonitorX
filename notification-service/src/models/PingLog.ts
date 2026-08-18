import mongoose, { Schema, Document } from "mongoose";


export interface IPingLog {
    url: string;
    status: 'UP' | 'DOWN' | 'SLOW';
    latency: number;
    checkAt: Date;


}

const PingLogSchema: Schema = new Schema({
    url:
    {
        type: String,
        required: true
    },

    status:
    {
        type: String,
        enum: ['UP', 'DOWN', 'SLOW'],
        required: true
    },
    latency:
    {
        type: Number,
        required: true
    },
    checkAt:
    {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IPingLog>('PingLog', PingLogSchema);

