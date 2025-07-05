import React from 'react';
import { Stack, Button, Container, TextInput, Text } from '@mantine/core';
import { original } from '@reduxjs/toolkit';
import { useState } from 'react';
import Service from '../utils/http';
const service = new Service();
export default function UrlShortner(){

async function genrateShortUrl() {
  try{
    let data = await service.post("s",input);
    setResponse(data);
    console.log(data);

  } catch (error) {
         console.log(error);
        
  }
}
  const [input,setInput]=useState(
    {
      "originalUrl":"",
      "expirseAt":"",
      "title":"",
      "customUrl":""
    }
  )
  const [response,setResponse]=useState(null);
  return (
    <Container size={"xs"}>
      {response?<>{response.shortCode}</>:
      <Stack m="xl">
      <Text size='30px' style={{"textShadow":"1px "}} the url shortner /> 

       <TextInput label="Original URL" onChange={(e)=>{
        setInput({...input, originalUrl  : e.target.value})
       }} placeholder="Original URL"/>

       <TextInput label="customise your url" onChange={(e)=>{
        setInput({...input, customUrl  : e.target.value})
       }} placeholder="Input placeholder"/>

       <TextInput label="TITLE" onChange={(e)=>{
        setInput({...input, title  : e.target.value})
       }} placeholder="Input placeholder"/>

       <TextInput type='date' onChange={(e)=>{
        setInput({...input, date : e.target.value})
       }} label="Pick date and time" />

       <Button disabled={input.originalUrl.length<5} onClick={genrateShortUrl} variant="filled" color="red">generate short url</Button>
      



    </Stack>}
    </Container>
  )
}
