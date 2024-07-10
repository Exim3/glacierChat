import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
