import React, {Component} from 'react'
import ListContacts from './ListContacts'
import * as ContactAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
 class App extends Component {
   state = {
    contacts : [],
    screen: 'create'
   }
   componentDidMount () {
     ContactAPI.getAll()
     .then((contacts) => {
       this.setState(() => ({
        contacts
       }))
     })
   }
   removeContact = (contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.filter((c) => {
          return c.id !== contact.id
        })
      }))
    ContactAPI.remove(contact)
   }
   render() {
     return (
       <div>
         {this.state.screen === 'list' && (<ListContacts 
         contacts={this.state.contacts}
         onDeletedContact = {this.removeContact}/>
         )}
         {this.state.screen === 'create' &&(<CreateContact 
         contacts={this.state.}/>
        }
       </div>
     )
   }
 }


export default App;
