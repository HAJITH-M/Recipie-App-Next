'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const getUser = async (email:string, password:string) => {
    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email,
            password: password,
        }),
    })

    const data = await res.json();
    console.log(data);
    return data;
}

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userEmail: '',
        userPassword: '',
        error: '',
    });  

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        try{
            const userData = await getUser(formData.userEmail, formData.userPassword);
            console.log(userData);
            
            if(userData.accessToken){
                console.log('User logged in successfully:', userData);
                router.push('/');

            } else{
                setFormData(prev => ({ ...prev, error: 'Invalid credentials' }));
            }
        }
        catch(error){
          console.error('Error:', error);
            setFormData(prev => ({...prev, error: 'An error occurred. Please try again later.' }));
        }   
    }

    return (
        <div>
            <h1>Login Page</h1>
            {formData.error && (<p>{formData.error}</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={formData.userEmail} onChange={(e)=> setFormData(prev => ({...prev, userEmail: e.target.value}))}/>

                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={formData.userPassword} onChange={(e)=> setFormData(prev => ({...prev, userPassword: e.target.value}))}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}