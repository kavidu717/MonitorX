import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from 'bcryptjs';


export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage?: string;
    googleId?: string;
    role: 'admin' | 'user';
    isBlocked: boolean;

    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    otpCode?: string;
    otpExpires?: Date;

}

export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// define the mongoose schema
const UserSchema = new Schema<IUserDocument>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        profileImage: {
            type: String,
            default: '',
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        otpCode: {
            type: String,
        },
        otpExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function () {
    if (!this.password || !this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);



})
// method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};


// export the model
const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
