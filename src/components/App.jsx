import React, {Component} from "react"
import ContactForm from "./Form/ContactForm"
import ContactList from "./Contacts/ContactList"
import Filter from "./Filter/Filter"
import {MainTitle, Container, SectionTitle} from "./App.styled"
import {nanoid} from "nanoid"

class App extends Component {
  state = {
    contacts: [
      {id: "id-1", name: "Hermione Granger", number: "459-12-56"},
      {id: "id-2", name: "Ron Weasley", number: "443-89-12"},
      {id: "id-3", name: "Albus Dumbledore", number: "645-17-79"},
      {id: "id-4", name: "Harry Potter", number: "227-91-26"}
    ],
    filter: ""
  }

  addContact = ({name, number}) => {
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    )

    if (existingContact) {
      alert(`${name} is already in contacts.`)
    } else {
      const id = nanoid(3)

      this.setState({
        contacts: [...this.state.contacts, {id: id, name: name, number: number}]
      })
    }
  }

  handleSearch = event => {
    const searchName = event.target.value.toLowerCase()
    this.setState({filter: searchName})
  }

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts")
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const {contacts, filter} = this.state

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    )

    const displayedContacts = filter ? filteredContacts : contacts

    return (
      <Container>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm addContact={this.addContact} />
        <SectionTitle>Contacts</SectionTitle>
        <Filter filter={filter} onHandleSearch={this.handleSearch} />
        <ContactList
          contacts={displayedContacts}
          onHandleDelete={this.handleDelete}
        />
      </Container>
    )
  }
}

export default App
