const admin = require('firebase-admin');

class NotificationController {
    static notfication = async (req, res, next) => {
        const message1 = {
            notification: {
                title: req.body.title,
                body: req.body.body
            },

            topic: 'broadcast'
        };
        next(
            admin.messaging().send(message1)
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                })
        )


    }
}

module.exports = NotificationController