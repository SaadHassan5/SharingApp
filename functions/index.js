const functions = require('firebase-functions');
const moment = require('moment');
const admin = require('firebase-admin');
const uuid = require('react-native-uuid');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const getData = (collection, doc) => {
    return db
        .collection(collection)
        .doc(doc)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                return doc.data();
            } else {
                return false;
            }
        });
};
const getAllData = async (collection) => {
    try {
        const ref = db.collection(collection);
        const querySnapshot = await ref?.get();
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data?.push(documentSnapshot.data());
        });
        return data;
    } catch (error) {
        throw new Error(SERVICES._returnError(error));
    }
};
const filterCollections = async (collection, key, op, value) => {
    try {
        const ref = db.collection(collection);
        const querySnapshot = await ref?.where(key, op, value).get();
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
            data?.push(documentSnapshot.data());
        });
        return data;
    } catch (error) {
        throw new Error(SERVICES._returnError(error));
    }
};
exports.sendFollowingNotification = functions.firestore
    .document('Comments/{id}')
    .onWrite(async (change, context) => {
        try {
            let after = change.after.data();
            let before = change.before.data();
            let docId = context.params.id;
            console.log("After", after);
            console.log("Before", before);
            // console.log("context",context);
            // console.log("Doc",docId);
            // let followerId = after.followings.pop();
            if (docId) {
                let ownerAlbum = await getData('Users', after?.owner);
                console.log("OwnerAlbum", ownerAlbum);
                if (ownerAlbum?.token) {
                    const payload = {
                        notification: {
                            title: `New Comment`,
                            body: `${after?.name} commented on your Album`,
                            sound: 'default',
                        },
                    };
                    const options = {
                        priority: 'high',
                        timeToLive: 60 * 60 * 24,
                    };
                    admin
                        .messaging()
                        .sendToDevice(ownerAlbum?.token, payload, options)
                        .then(reponse => {
                            console.log('Send Comment Notification ');
                        });
                }
            }
        } catch (error) {
            console.log('error in Comment Notification', error);
        }
    });
exports.sendLikeNotification = functions.firestore
    .document('Recieved/{id}')
    .onWrite(async (change, context) => {
        try {
            let after = change.after.data();
            let before = change.before.data();
            let docId = context.params.id;
            console.log("After", after);
            console.log("Before", before);
            // console.log("context",context);
            // console.log("Doc",docId);
            // let followerId = after.followings.pop();
            if (after?.likes > before?.likes) {
                let ownerAlbum = await getData('Users', after?.owner);
                //     console.log("OwnerAlbum", ownerAlbum);
                if (ownerAlbum?.token) {
                    const payload = {
                        notification: {
                            title: `Like <3`,
                            body: `${after?.likedBy[after?.likedBy?.length - 1]?.name} liked ${after?.albumName}`,
                            sound: 'default',
                        },
                    };
                    const options = {
                        priority: 'high',
                        timeToLive: 60 * 60 * 24,
                    };
                    admin
                        .messaging()
                        .sendToDevice(ownerAlbum?.token, payload, options)
                        .then(reponse => {
                            console.log('Send Like Notification ');
                        });
                }
            }
        } catch (error) {
            console.log('error in Comment Notification', error);
        }
    });
exports.sendOwnerNotification = functions.firestore
    .document('Albums/{id}')
    .onWrite(async (change, context) => {
        try {
            let after = change.after.data();
            let before = change.before.data();
            let docId = context.params.id;
            console.log("After", after);
            console.log("Before", before);
            // console.log("context",context);
            // console.log("Doc",docId);
            // let followerId = after.followings.pop();
            if (!before) {
                let ownerAlbum = await getData('Users', after?.owner);
                //     console.log("OwnerAlbum", ownerAlbum);
                if (ownerAlbum?.token) {
                    const payload = {
                        notification: {
                            title: `${after?.heading}`,
                            body: `${after?.sender} added photos`,
                            sound: 'default',
                        },
                    };
                    const options = {
                        priority: 'high',
                        timeToLive: 60 * 60 * 24,
                    };
                    admin
                        .messaging()
                        .sendToDevice(ownerAlbum?.token, payload, options)
                        .then(reponse => {
                            console.log('Send Album OWner Notification ');
                        });
                }
            }
        } catch (error) {
            console.log('error in Owner Notification', error);
        }
    });
exports.sendApprovalNotification = functions.firestore
    .document('Albums/{id}')
    .onWrite(async (change, context) => {
        try {
            let after = change.after.data();
            let before = change.before.data();
            console.log("After", after);
            console.log("Before", before);
            if (after?.imgs?.length < before?.imgs?.length) {

                let ownerAlbum = await getData('Users', after?.sender);
                //     console.log("OwnerAlbum", ownerAlbum);
                if (ownerAlbum?.token) {
                    const payload = {
                        notification: {
                            title: `${after?.heading}`,
                            body: `${after?.owner} approved your photos`,
                            sound: 'default',
                        },
                    };
                    const options = {
                        priority: 'high',
                        timeToLive: 60 * 60 * 24,
                    };
                    admin
                        .messaging()
                        .sendToDevice(ownerAlbum?.token, payload, options)
                        .then(reponse => {
                            console.log('Send Album  Notification ');
                        });
                }
            }
        } catch (error) {
            console.log('error in Owner Notification', error);
        }
    });
    exports.sendManualNotification = functions.firestore
    .document('ManualNotifications/{id}')
    .onWrite(async (change, context) => {
        try {
            let after = change.after.data();
            let before = change.before.data();
            console.log("After", after);
            console.log("Before", before);
            let allUsers = await getAllData("Users");
                console.log("All", allUsers?.length);
            const payload = {
                notification: {
                    title: `${after?.title}`,
                    body: `${after?.body}`,
                    sound: 'default',
                },
            };
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24,
            };
            allUsers?.map(i => {
                    if (i?.token) {
                    admin
                        .messaging()
                        .sendToDevice(i?.token, payload, options)
                        .then(reponse => {
                            console.log('Send Admin Notification ');
                        });
                    }
                })


        } catch (error) {
            console.log('error in Comment Notification', error);
        }
    });
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
