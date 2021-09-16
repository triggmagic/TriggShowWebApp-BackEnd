const admin = require('firebase-admin');
const credential = require('./trigg-project-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(credential),
    projectId:"trigg-show-web-app"
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });