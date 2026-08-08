import mongoose, { Document, Schema, Model } from "mongoose";



export interface IWebsite extends Document {
    url: string;
    checkInterval: number;
    isActive: boolean
}

const WebsiteSchema = new Schema<IWebsite>({
    url: { type: String, required: true },
    checkInterval: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
});

const Website: Model<IWebsite> = mongoose.model<IWebsite>('Website', WebsiteSchema);

export default Website;