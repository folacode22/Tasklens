
const webpush = require("web-push");


const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

const notification = async (subcription, payload) =>{
  try{
    // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = await JSON.stringify({ title: "Task Notification" });

  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload)

  }catch(error){
    console.log("Notification not sent");
    console.log(error);
  }
}
module.exports = notification;
// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

/*----------------------0------0-----------------0-------------------0-------0-------------0-----*/

const FCM = require("node-fcm");
var serverKey = "";

const fcm = new FCM(serverKey);

const message = {

}
fcm.send(message , (error,response)=>{
  if(error){
    console.log("issue in the notification"+error.message);


    
  }
})