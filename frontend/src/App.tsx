import React, { useState } from 'react'
import {Button, Container, Form, InputGroup} from "react-bootstrap";
import {axiosApi} from "../axiosApi.ts";
import {Response, UserUrl} from "../types";


function App() {
  const [userInput, setUserInput] = useState('')
  const [response, setResponse]=useState<Response>({
    originalUrl:'',
    shortUrl:'',
  });

  const [redirect, setRedirect]=useState('http://localhost:8000/')

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setUserInput(e.target.value)
  }

  const submitHandler=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    try{
      const data: UserUrl = {
        url: userInput
      }

      const response = await axiosApi.post('links',data)

      if(response.data !== undefined){
        console.log(response.data)
        setResponse(prevState => ({
          ...prevState,
          originalUrl: response.data.originalUrl,
          shortUrl: response.data.shortUrl
        }))
        setRedirect(prevState => prevState + response.data.shortUrl)

        console.log(redirect)
      }
        setUserInput('')
    }catch (e){
      console.log('Caught on try - SUBMIT FORM - ', e)
    }

  }


  return (
    <>
      <Container >
        <form onSubmit={submitHandler} className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center justify-content-between">
          <span className="text-primary d-block mb-3 text-uppercase">Shorten your link</span>
          <InputGroup className="mb-3">
            <Form.Control
                onChange={changeHandler}
                placeholder="any link you want"
                value={userInput}
            />
          </InputGroup>
          <Button type="submit" className="btn btn-primary">Shorten!</Button>
          <div className="mt-3">
            <span className="text-secondary d-block mb-3">
              Your link will appear here
            </span>
            <a href={redirect} className="text-success" target="_blank" rel="noopener noreferrer">{redirect}</a>
          </div>
        </form>

      </Container>
    </>
  )
}

export default App
