const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const createNotification = (notification=>{
    return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc=>{
        console.log('notification created',doc);
    })
})
exports.reimburseCreated = functions.firestore
  .document('reimburseRequests/{reimburse}')
  .onCreate(doc => {
    console.log('on create');
    const project = doc.data();
    const notification = {
      content: 'Added a new reimbursement',
      user: `${project.submitFirstName} ${project.submitLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});
exports.reimburseRequestUpdate = functions.firestore.document('reimburseRequests/{reimburse}')
.onUpdate((change, context)=>{
    console.log('on update');
    console.log(change);
    console.log(context);
    const newValue = change.after.data();
    const notification = {
        content : "Status of "+`${context.params.reimburse}`+" has updated to "+`${newValue.status}`,
        status: `${newValue.status}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
})

