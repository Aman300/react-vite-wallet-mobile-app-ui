import React, { useState, useEffect } from 'react';
import OpenBattle from '../../components/OpenBattle';
import RunningBattle from '../../components/RunningBattle';
import { openGameRoute } from '../../utils/APIRoutes';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
import socket from "../../utils/Socket";
import 'animate.css';


const validate = values => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } 

  return errors;
};


function Home() {

  let userId = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])

async function fetchOpenGame(){
  try{
    let response = await axios.get(openGameRoute)
    if(response.data.status){
      setData(response.data.data) 
    }
  }catch(e){
    console.log(e)
  }
}

  
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(createGameRoute + `/${userId._id}`, {
          amount: values.amount,
        });

        toast.success(response.data.message);
        setShowModal(false)
        socket.emit("send-message", {
          room: 101
        });

      } catch (error) {
        // Handle any errors
        console.error('Login failed:', error);
        toast.error(error.response.data.message);
      } finally {
        // Reset the form's submitting state
        setSubmitting(false);
      }
    },
  });



  async function deleteGame(id){
    try{
      let response = await axios.delete(deleteGameRoute + `/${id}`,{
      })

      if(response.data.status){
        toast.success(response.data.message);
        socket.emit("send-message", {
          room: 101
        });
      }

    }catch(e){
      console.log(e)
      toast.success(e.response.data.message);
    }
  }



  useEffect(() => {
    // Emit join-room event when the socket connection is established
    socket.emit("join-room", 101);
    socket.emit("send-message", 
      fetchOpenGame()
    );

    socket.on("receive-message", (data) => {
      console.log(data)
      setData(data)
      //setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("disconnect", () => {
      socket.emit("send-message", 
      fetchOpenGame()
    );
    });

    return () => {
      // Unsubscribe from socket events here if needed
      // Note: It's generally not necessary to manually disconnect the socket here,
      // as it will be disconnected automatically when the component unmounts.
    };
  }, []);


  return (
    <>

    <div className='h-screen'>

      <div className='bg-rose-500 h-52 rounded-xl'>

      </div>

    </div>
    


    </>
  )
}

export default Home