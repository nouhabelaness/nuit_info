import React from 'react'
import e from '../event-bus'

export default class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'When Angular receives message, we should see a confirmation here 😎'
    }

    this.messageHandler = this.messageHandler.bind(this)
  }

  componentDidMount() {
    e.on('received', this.messageHandler)
    e.on('received2', this.messageHandler)
  }

  componentDidUnmount() {
    e.off('received', this.messageHandler)
    e.off('received2', this.messageHandler)
  
  }

  messageHandler(message) {
    this.setState({
      message: message.text,
      message2: message.text
    })
  }

  sendMessage() {
    e.emit('message', { text: 'Hello from React 👋' })
    e.emit('message2', { text: 'participant :  nom=Med,tel=20202020,adresse=monastir,date de naissance=25/05/1995' })
  }

  render() {
    return (
      <div style={{marginTop: '10px'}}>
        <h1>This was written in React</h1>

        <p>
          <button onClick={this.sendMessage}>
            Send a message to Angular
          </button>
        </p>

        <p>
          {this.state.message}
          
        </p>
        <p>
          {this.state.message2}
        </p>

      </div>
    )
  }
}
