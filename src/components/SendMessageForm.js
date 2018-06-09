import React from 'react'

class SendMessageForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            text: e.target.value,
        })
    this.props.onChange()
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.text)
    }

    render() {
        return <div className="messageForm">
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="What's on your mind?" onChange={this.onChange} />
                <input type="submit" value="Send" />
            </form>
        </div>
    }

}

export default SendMessageForm