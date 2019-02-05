const Thread = require('../models/Thread');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = {
    sendAMessage: async (req, res) => {
        let otherUserUsername = req.params.otherUser;
        let currentUser = req.user;
        let content = req.body.message;

        let thread = await Thread.findOne({ users: { $all: [currentUser.username, otherUserUsername] } });
        let otherUser = await User.findOne({ username: otherUserUsername });

        let newMessage = await Message.create({
            content,
            thread: thread._id,
            userReceiver: otherUser._id,
        });

        res.redirect(`/thread/${otherUser.username}`);
    },
}