import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    otp_code: {
        type: String,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 300000), // Thời gian hết hạn là 60 giây sau thời điểm hiện tại
}
}, {
    timestamps: true
});

// Tạo chỉ mục TTL trên trường expiresAt để tự động xóa tài liệu sau 60 giây
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpSchema = mongoose.model('Otp', otpSchema);
export default OtpSchema;
