import React, { useState } from 'react'

const Login = () => {
 
    const[state,setState]=useState("Login");
    const [formData, setFormData]=useState({
      username:"",
      password:"",
      email:""
    })

    const changeHandler=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    }

    const login =async()=>{
      console.log("Login fuction excecuted",formData);
      let responseData;
      await fetch('http://localhost:4000/login',{
        method:"POST",
        headers:{
          Accept:'application/formData',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      }).then((response)=>response.json()).then((data)=>responseData=data);
      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace('/')
      }else{
        alert(responseData.errors)
      }
    }

    const signup =async()=>{
      console.log("signup fuction excecuted",formData);
      let responseData;
      await fetch('http://localhost:4000/signup',{
        method:"POST",
        headers:{
          Accept:'application/formData',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      }).then((response)=>response.json()).then((data)=>responseData=data);
      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace('/')
      }else{
        alert(responseData.errors)
      }
    }
  return (
    <section className='max_padd_container flexCenter flex-col pt-32'>
      <div className='max-w-[555px] h-[600px bg-white m-auto px-14 py-10 rounded-md'>
        <h3 children className='h3'>{state}</h3>
        <div  className='flex flex-col gap-4 mt-7'>
        {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='your name'  className='h-14 w-full pl-5 bg-slate-900/5outline-none rounded-xl' />:''}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='email address' className='h-14 w-full pl-5 bg-slate-900/5outline-none rounded-xl' />
          <input type="password" name='password' onChange={changeHandler} placeholder='password' className='h-14 w-full pl-5 bg-slate-900/5outline-none rounded-xl' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} className='btn_dark_rounded my-5 w-full !rounded-md'>continue</button>

       {state==="Sign Up"?<p className='text-black font-bold'>Already have an account?<span onClick={()=>{setState("Login")}} className='text-secondary underline cursor-pointer'>Login</span></p>:
        <p className='text-black font-bold'>Create an account?<span onClick={()=>{setState("Sign Up")}} className='text-secondary underline cursor-pointer'>Click here</span></p>}
        
        <div className='flexCenter mt-6 gap-3'>
          <input type="checkbox" name="" id="" />
          <p>By continuing i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </section>
  )
}

export default Login
