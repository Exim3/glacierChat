import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "MessageModel",
        default: [],
        strictPopulate: false,
      },
    ],
  },
  //createdAt , updatedAt
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
