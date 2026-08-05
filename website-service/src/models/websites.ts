import mongoose, { Document, Schema, Model } from "mongoose";


export interface IWebsite extends Document {
    userId: string;
    name: string;
    url: string;
    checkInterval: number;
    isActive: boolean;
    tags: { key: string, value: string }[];
    createdAt: Date;
    updateAt: Date;
}

const websiteSchema = new Schema<IWebsite>({
    userId: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    checkInterval: {
        type: Number,
        required: true,
        default: 5,
        enum: [1, 5, 15, 30, 60]
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    tags: [
        {
            key: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
}, {
    timestamps: true,
});

const Website: Model<IWebsite> = mongoose.model<IWebsite>('Website', websiteSchema);

export default Website;
