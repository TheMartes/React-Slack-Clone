import React, { Component } from 'react'
import UsernameForm from './components/usernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {

  constructor () {
    super()

    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''      
    }

    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username}),   
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })        
      })
      .catch(error => {
        console.error('error')
      })
  }


  render() {

    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return ([
        <div>
          <div className="loginWrapper">
            <h1>Chatkit slack clone</h1>
            <UsernameForm onSubmit={this.onUsernameSubmitted} />
          </div>
          <footer>
            <span>💻</span> by <a href="https://github.com/TheMartes">TheMartes</a>, thanks to <a href="https://pusher.com/chatkit" target="_BLANK">Chatkit@pusher</a> for providing API ❤️
          </footer>
        </div>
      ])
    } else if (this.state.currentScreen === 'ChatScreen') {
        return <ChatScreen currentUsername={this.state.currentUsername} />  
    }
  }
}

export default App
