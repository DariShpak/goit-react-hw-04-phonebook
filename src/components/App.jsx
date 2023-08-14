import {useState, useEffect} from "react"
import ContactForm from "./Form/ContactForm"
import ContactList from "./Contacts/ContactList"
import Filter from "./Filter/Filter"
import {MainTitle, Container, SectionTitle} from "./App.styled"
import {nanoid} from "nanoid"


const defaultContacts = [
  { id: "id-1", name: "Hermione Granger", number: "459-12-56" },
  { id: "id-2", name: "Ron Weasley", number: "443-89-12" },
  { id: "id-3", name: "Albus Dumbledore", number: "645-17-79" },
  { id: "id-4", name: "Harry Potter", number: "227-91-26" }
];


const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(
      window.localStorage.getItem("contacts")) ?? defaultContacts }
   
  )
  const [filter, setFilter] = useState("")
  
  const id = nanoid(3)

  const addContact = ({name, number}) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    )

    if (existingContact) {
      alert(`${name} is already in contacts.`)
    } else {
      const newContact = {id: id, name: name, number: number}
      setContacts(prevState => {
        return [...prevState, newContact]
      })
    }
  }

  const handleSearch = event => {
    const searchName = event.target.value.toLowerCase()
    setFilter(searchName)
  }

  const handleDelete = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id)
    })
  }

  useEffect(
    () => {
      contacts && localStorage.setItem("contacts", JSON.stringify(contacts))
    },
    [contacts]
  )

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  )

  const displayedContacts = filter ? filteredContacts : contacts

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm addContact={addContact} />
      <SectionTitle>Contacts</SectionTitle>
      <Filter filter={filter} onHandleSearch={handleSearch} />
      <ContactList contacts={displayedContacts} onHandleDelete={handleDelete} />
    </Container>
  )
}

export default App
