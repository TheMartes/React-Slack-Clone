import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhoIsOnlineList from './components/WhoIsOnlineList'

class ChatScreen extends React.Component {

    constructor () {
        super()
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: []
        }
    this.sendMessage      = this.sendMessage.bind(this)
    this.sendTypingEvent  = this.sendTypingEvent.bind(this)
    }

    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'YOUR_INSTANCE_LOCATOR',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate',
            }),
        })

    chatManager
        .connect()
        .then(currentUser => {
            this.setState({currentUser})

            return currentUser.subscribeToRoom({
                roomId: 'YOUR_ROOM_ID',
                messageLimit: 100,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                           messages: [...this.state.messages, message] 
                        })
                    },
                    onUserStartedTyping: user => {
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                        })
                    },
                    onUserStoppedTyping: user => {
                        this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                username => username !== user.name
                            )
                        })
                    },
                    onUserCameOnline: () => this.forceUpdate(),
                    onUserWentOffline: () => this.forceUpdate(),
                    onUserJoined: () => this.forceUpdate()
                }
            })
        })
        .then(currentRoom => {
            this.setState({currentRoom})
        })
        .catch(error => console.error(error))
    }

    sendMessage (text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    sendTypingEvent () {
        this.state.currentUser
            .isTypingIn({roomId: this.state.currentRoom.id})
            .catch(error => console.error('error', error))
    }

    render() {
        return (            
            <div className="wrapper">
                <div className="onlineList">
                    <h2>Currently Online</h2>
                    <WhoIsOnlineList users={this.state.currentRoom.users} />
                </div>

                <div className="chat">
                    <h1>Chat</h1>
                    <p><span role="img" aria-label="jsx-a11y/accessible-emoji">👋</span> {this.props.currentUsername}</p>
                    <MessageList messages={this.state.messages} />

                    <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
                    <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                </div>
            </div>
        )
    }
}

export default ChatScreen