import React, { useEffect, useState } from 'react'
import { Stack } from '@mantine/core';
import Service from "../utils/http.js"
const service = new Service();
import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';


export default function Profile() {

   const [user,setUser] = useState({});
async function getMyData() {
    try{
        let data = await service.get("user/me");
        setUser(data);
    } catch (error){
        console.log(error);
    
    }
    
}
    useEffect(()=>{
     getMyData();
    },[])

  return (
    <div>
        <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
    >

      
      <Avatar src={user.avatar} alt="it's me"/>
       <Avatar color="green" radius="xl">
        <IconStar size={20}  />
      </Avatar>
      <text>{user.name}</text>
      <text>{user.email}</text>
      <text>{user.createdAt}</text>
      <text>{user.updatedAt}</text>
      </Stack>
    </div>
  )
}
