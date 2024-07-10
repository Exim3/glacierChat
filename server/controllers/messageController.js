import ConversationModel from "../models/converstionModel.js";
import MessageModel from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user._id.toString();

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //SOCKET IO CONNECTION WILL GO HERE

    // await conversation.save();
    // await newMessage.save();

    //this will run parallel

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
  //   console.log("sent message");
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }
    console.log(conversation.messages, "comsg");

    const messages = await MessageModel.find({
      _id: { $in: conversation.messages },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessage controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
