import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import axios from 'axios';
import * as yup from 'yup';
import schema from './validation/formSchema';

const initialFormValues = {
  name: '', 
  email: '', 
  password: '', 
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '', 
  password: '', 
  terms: '',
}

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);


  const getUsers = () => {
    axios
      .get(`https://reqres.in/api/users`)
      .then((res) => {
        setUsers(res.data.data)
      })
      .catch((err) => {
        alert('Error')
      })
  }

  const postUser = (newUser) => {
    axios
      .post(`https://reqres.in/api/users`, newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        setFormValues(initialFormValues)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      });
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms,
    };

    postUser(newUser)
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    });
  }, [formValues])

  return (
    <div className="App">
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  );
}

export default App;
