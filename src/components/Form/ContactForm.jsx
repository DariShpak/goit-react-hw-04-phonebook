import React from "react"
import {Formik, ErrorMessage} from "formik"
import {
  Label,
  Button,
  ErrorText,
  PhoneBookForm,
  FormInput
} from "./ContactForm.styled"
import {object, string} from "yup"

const ContactForm = (props) => {

  const initialValues = {name: "", number: ""}

  const schema = object().shape({
    name: string()
      .required("Please enter the name")
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      ),
    number: string()
      .required("Please enter the number")
      .matches(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      )
  })

  const FormError = ({name}) => {
    return (
      <ErrorMessage
        name={name}
        render={message =>
          <ErrorText>
            {message}
          </ErrorText>}
      />
    )
  }

  const handleInput = (values, {setValues, resetForm}) => {
    props.addContact(values)

    setValues(initialValues)
    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleInput}
      validationSchema={schema}
    >
      <PhoneBookForm autoComplete="off">
        <Label htmlFor="name">
          Name ⚡
          <FormInput type="text" id="name" name="name" />
          <FormError name="name" />
        </Label>
        <Label htmlFor="number">
          Number ⚡
          <FormInput type="tel" id="number" name="number" />
          <FormError name="number" />
        </Label>
        <Button type="submit">Add contact</Button>
      </PhoneBookForm>
    </Formik>
  )
}

export default ContactForm
