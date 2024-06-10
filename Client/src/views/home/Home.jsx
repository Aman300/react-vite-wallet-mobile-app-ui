import React, { useState, useEffect } from 'react';
import { openGameRoute } from '../../utils/APIRoutes';
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

  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    if (value === '.') {
      // If the dot (.) button is clicked, hide the number
      setAmount(amount + value);
    } else if (value === 'clear') {
      // If the clear button is clicked, clear the last character
      setAmount(amount.slice(0, -1));
    } else {
      // For other buttons, append the value to the input
      setAmount(amount + value);
    }
  };


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

    <div className='h-screen p-5'>

      <div className='bg-black bg-gradient-to-l from-gray-600 to-black h-48 rounded-3xl w-full flex justify-center items-center mb-8 transition-transform transform hover:scale-105 cursor-pointer'>
        <div className="w-72  rounded-lg">
          <div className='flex justify-between items-center'>
            <h1 className="text-3xl font-semibold text-gray-100 pb-4">Herno</h1>
            <img className='w-1/3' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1000px-Mastercard-logo.svg.png" alt="" />
          </div>
          <span className="text-xs  text-gray-200 shadow-2xl">Aman sharma</span>
          <div className="flex justify-between items-center pt-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-300 font-bold">
                1234 4567 8901 2345
              </span>
              <span className="text-xs text-gray-300 font-bold">09/10</span>
            </div>
            <img
              src="https://img.icons8.com/offices/80/000000/sim-card-chip.png"
              width={48}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 mb-8'>
        <button onClick={() => setShowModal(true)} className='bg-[#ffcb66] py-3 px-4 rounded-full font-semibold flex justify-center items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
        </svg>
        Transfer</button>
        <button className='bg-[#b1deb7] py-3 px-4 rounded-full font-semibold flex justify-center items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path d="M10 2a.75.75 0 0 1 .75.75v5.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0L6.2 7.26a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z" />
          <path d="M5.273 4.5a1.25 1.25 0 0 0-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 0 1 .894.553l.448.894a1 1 0 0 0 .894.553h3.438a1 1 0 0 0 .86-.49l.606-1.02A1 1 0 0 1 14 11h3.47a1.318 1.318 0 0 0-.015-.062l-1.523-5.52a1.25 1.25 0 0 0-1.205-.918h-.977a.75.75 0 0 1 0-1.5h.977a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h.977a.75.75 0 0 1 0 1.5h-.977Z" />
        </svg>
        Request</button>
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

    
    {showModal ? (
        <>
          <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
            <div className="w-full">
              <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-black outline-none focus:outline-none xl:p-6 p-5">
                <div className='flex justify-between ' onClick={() => setShowModal(false)}>
                  <p className=' text-bold font-semibold'></p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <form >

                <div>
                    <div className='mb-4 text-center p-1'>
                      <input
                        id="amount"
                        name='amount'
                        className={`w-full text-white text-center px-8 py-3 rounded-full font-semibold bg-[#1e1d22]  placeholder-gray-500 text-xl focus:outline-none focus:border-gray-400 mb-4`}
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <p className=' text-[#1e1d22] text-sm'>₹ 3.5 commission Pay a commission ₹ 5000</p>
                    </div>

                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('1')}>1</button>
                      <button type="button" onClick={() => handleButtonClick('2')}>2</button>
                      <button type="button" onClick={() => handleButtonClick('3')}>3</button>
                    </div>
                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('4')}>4</button>
                      <button type="button" onClick={() => handleButtonClick('5')}>5</button>
                      <button type="button" onClick={() => handleButtonClick('6')}>6</button>
                    </div>
                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('7')}>7</button>
                      <button type="button" onClick={() => handleButtonClick('8')}>8</button>
                      <button type="button" onClick={() => handleButtonClick('9')}>9</button>
                    </div>
                    <div className='flex justify-around items-center gap-3 text-white mb-4 text-2xl '>
                      <button type="button" onClick={() => handleButtonClick('.')}>.</button>
                      <button type="button" onClick={() => handleButtonClick('0')}>0</button>
                      <svg type="button" onClick={() => handleButtonClick('clear')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                    </div>
                  </div>

                    <button
                        type='submit'
                        className="mt-5 tracking-wide font-semibold bg-white text-black w-full py-3 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"                        
                    >
                      <span>Send Money</span>                  
                    </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    


    </>
  )
}

export default Home