# React Slack Clone App
<hr>
React slack clone app, builded uppone the Chatkit@pusher

To make it work simply just make following tweaks.

Grab your Instance Locator and secret key from [here](https://pusher.com/chatkit). If you don't have account create one. In dashboard select chatkit and make an instance. Give it a name, and you'll have available Instance locator and Secret Key.

### Installation
```
$ npm install
```

### Update ./server.js
```
const chatkit = new Chatkit.default({
  instanceLocator: 'YOUR_INSTANCE_LOCATOR',
  key: 'YOUR_SECRET_KEY',
}) 
```

### Update ./src/ChatScreen.js
In ChatScreen.js in function `ComponentDidMount` find
```
instanceLocator: 'YOUR_INSTANCE_LOCATOR',
``` 
and then simply in your ChatKit instance create new inspector. Give a name to user, then to room and you should have the roomID which you need to paste there
```
roomId: 'YOUR_ROOM_ID',
```
And thats it :)