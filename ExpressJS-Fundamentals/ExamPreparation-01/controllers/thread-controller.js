const Thread = require('../models/Thread');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = {
    threadFind: async (req, res) => {
        let currentUser = req.user;
        let body = req.body;
        let otherUser = await User.findOne({ username: body.username });

        if (!otherUser) {
            res.redirect('/404');
        }

        let threadWithBothUsers = await Thread.findOne({ users: { $all: [currentUser.username, otherUser.username] } });

        if (!threadWithBothUsers) {
            let newThreat = {
                users: [currentUser.username, otherUser.username],
            };

            await Thread.create(newThreat)
                .then(() => {
                    res.redirect(`/thread/${otherUser.username}`)
                });
        } else {
            res.redirect(`/thread/${otherUser.username}`);
        }
    },

    openThread: async (req, res) => {
        let otherUser = req.params.otherUser;
        let currentUser = req.user;

        let thread = await Thread.findOne({ users: {$all: [currentUser.username, otherUser] } });

        await Message.find({ thread: { $in: thread._id } })
            .then((messages) => {
                let result = [];

                for (let message of messages) {
                    let currentMessage = {};
                    if (message.userReceiver.toString() === currentUser._id.toString()) {
                        currentMessage = { content: message.content, userReceiver: true };
                    }
                    else {
                        currentMessage = { content: message.content, userReceiver: false };
                    }
                    
                    if(message.content.startsWith('https://') && message.content.endsWith('.jpg')){
                        currentMessage['isImage'] = true;
                    }
                    result.push(currentMessage);
                }

                res.render('thread/chatroom', {
                    messages: result,
                    otherUserNickname: otherUser,
                });
            });
    },

    sendAMessage: async (req, res) => {
        let otherUserNickname = req.params.otherUser;
        let currentUser = req.user;
        let content = req.body.message;

        let thread = await Thread.findOne({ users: { $all: [currentUser.username, otherUserNickname] } });
        let otherUser = await User.findOne({ username: otherUserNickname });

        let newMessage = await Message.create({
            content,
            thread: thread._id,
            userReceiver: otherUser._id,
        });

        res.redirect(`/thread/${otherUser.username}`);
    },
};