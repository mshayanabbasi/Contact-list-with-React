import React, {Component} from 'react'
import ListContacts from './ListContacts'
import * as ContactAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'
 class App extends Component {
   state = {
    contacts : [],
    
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
   createContact = (contact) => {
     ContactAPI.create(contact)
     .then((contact) => {
       this.setState((currentState) => ({
         contacts: currentState.contacts.concat([contact])
       }))
     })
   }
   render() {
     return (
       <div>
         <Route  exact path='/' render={() => (
            <ListContacts 
            contacts={this.state.contacts}
            onDeletedContact = {this.removeContact}
          />
        )}
         />
         <Route path='/create' render={({ history }) => (
           <CreateContact 
           onCreateContact={(contact) => {
              this.createContact(contact)
                history.push('/')
           }}/>
         )} />
       </div>
     )
   }
 }


export default App;
