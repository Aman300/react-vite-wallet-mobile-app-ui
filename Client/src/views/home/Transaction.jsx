import React, { useState, useEffect } from 'react';
import { openGameRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
import socket from "../../utils/Socket";
import 'animate.css';
import ReactApexChart from 'react-apexcharts';
import { Link, useNavigate } from 'react-router-dom';


const validate = values => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } 

  return errors;
};


function Transaction() {

  const navigate = useNavigate();

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


  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 325
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        borderRadius: 3,
        color: 'black' // Setting bar color to black
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    // yaxis: {
    //   title: {
    //     text: '$ (thousands)'
    //   }
    // },
    fill: {
      opacity: 1,
      colors: ['#000000'] // Setting bar color to black
    }
  });
  

  const [series, setSeries] = useState([{
    name: 'Net Profit',
    data: [44, 55, 45, 56, 81, 58, 63, 30, 66]
  }]);




  return (
    <>

    <div className='h-screen p-5'>

    <div className='flex justify-between mb-3'>                   
        
    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => (navigate("/"))}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
        
     <p className='text-center font-semibold text-black mb-6'>Transaction</p>

     <p className='text-center font-semibold text-black mb-6'></p>
      
        
    </div>

     

      <div className='bg-black text-white h-12 rounded-3xl w-full flex justify-around items-center mb-8'>
          <a href="">1W</a>
          <a href="">1M</a>
          <a href="">6M</a>
          <a href="">1Y</a>
          <a href="">ALL</a>
      </div>

      <div className='grid grid-cols-1 gap-3 mb-8'>
      <ReactApexChart options={options} series={series} type="bar" />
      </div>

      <div>
        <div className='flex justify-between items-center mb-4'>
          <p className=' font-semibold'>Transaction</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>

        <div className=' flex justify-between items-center bg-white w-full h-20 px-5 rounded-2xl mb-3'>
          <div className='flex justify-center items-center gap-2'>
            <div>
              <img className=' size-12' src="https://avatar.iran.liara.run/username?username=Aman+Sharma" alt="" />
            </div>
            <div>
              <p className='text-black font-semibold'>Aman Sharma</p>
              <p className='text-sm font-semibold text-gray-500'>24 sep 2024</p>
            </div>
          </div>
          <div>
            <p className=' font-semibold text-green-600'>+₹ 11213.34</p>
          </div>
        </div>

        <div className=' flex justify-between items-center bg-white w-full h-20 px-5 rounded-2xl mb-3'>
          <div className='flex justify-center items-center gap-2'>
            <div>
              <img className=' size-12' src="https://avatar.iran.liara.run/username?username=Ram+kumar" alt="" />
            </div>
            <div>
              <p className='text-black font-semibold'>Ram kumar</p>
              <p className='text-sm font-semibold text-gray-500'>12 oct 2024</p>
            </div>
          </div>
          <div>
            <p className=' font-semibold text-rose-600'>-₹ 1113.36</p>
          </div>
        </div>

        <div className=' flex justify-between items-center bg-white w-full h-20 px-5 rounded-2xl mb-3'>
          <div className='flex justify-center items-center gap-2'>
            <div>
              <img className=' size-12' src="https://avatar.iran.liara.run/username?username=Shubham+Sharma" alt="" />
            </div>
            <div>
              <p className='text-black font-semibold'>Shubham sharma</p>
              <p className='text-sm font-semibold text-gray-500'>12 oct 2024</p>
            </div>
          </div>
          <div>
            <p className=' font-semibold text-green-600'>-₹ 2583.69</p>
          </div>
        </div>
      </div>

    </div>
    


    </>
  )
}

export default Transaction
