import React from 'react'

class UsernameForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            username: e.target.value,
        })
    }
    
    onSubmit (e) {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    render () {
        return <div className="usernameForm">
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="What's your username?" onChange={this.onChange}/>
                <input type="submit" value="Continue"/>
            </form>
        </div>
    }

}

export default UsernameForm