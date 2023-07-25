import {Form, Field} from "formik"
import styled from "styled-components"

export const PhoneBookForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
export const Label = styled.label`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #740001;
  align-items: center;
  width: 250px;
`
export const FormInput = styled(Field)`
  background: transparent;
  border: 2px solid #d3a625;
  border-radius: 8px;
  padding: 4px;
  color: #740001;

  &: focus,
  &: hover,
  &: active {
    border: 2px solid #eeba30;
    background: transparent;
    outline: transparent;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`

export const ErrorText = styled.span`
  color: #740001;
  align-items: center;
  font-size: 10px;
  margin-top: 4px;
`

export const Button = styled.button`
margin-left:40%;

  width: 95px;
  padding: 4px;
  border-radius: 8px;
  border: 2px solid #d3a625;
  background: #d3a625;
  color: #740001;


      &: focus,
      &: hover {
    border: 2px solid #eeba30;
    background:  #eeba30;
    color:#ae0001;
`
