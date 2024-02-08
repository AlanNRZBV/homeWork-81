import { useState } from 'react'
import {Container, Form, InputGroup} from "react-bootstrap";


function App() {
  const [userInput, setUserInput] = useState('')

  const submitHandler=()=>{

  }

  return (
    <>
      <Container>
        <form onSubmit={submitHandler}>
          <span className="text-primary">Shorten your link</span>
          <InputGroup className="mb-3">
            <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
          </InputGroup>
        </form>

      </Container>
    </>
  )
}

export default App
