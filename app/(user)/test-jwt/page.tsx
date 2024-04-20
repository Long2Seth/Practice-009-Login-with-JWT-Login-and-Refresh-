'use client';
import React from 'react'
import { useState } from 'react'

export default function TestJWT() {
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState(null);
    const [unAuthorized, setUnAuthorized] = useState(false);
    const handlLogin = async () => {
        const email = "sangsokea109@gmail.com";
        const password = "admin@1234";

        fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("DATA ", data);
                setAccessToken(data.accessToken);
                setUser(data.user);
            })
            .catch((error) => {
                console.log("ERROR ", error);
            });
    }


    const handlePartailUpdate = async () => {
        const body = {
            "name": "New change"
        }

        const resData = await fetch(`${process.env.NEXT_PUBLIC_DJONGO_API_URL}/api/products/${499}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(body)
        })
        if (resData.status === 401) {
            setUnAuthorized(true);
        }
        const data = await resData.json();
        console.log("DATA ", data);

    }


    const handleRefreshToken = async () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/refresh", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({}),
        }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("REFRESH DATA ", data);
                setAccessToken(data.accessToken);
                setUser(data.user);
            })
            .catch((error) => {
                console.log("ERROR ", error);
            });
    }



    return (
        <main className=' h-screen grid place-content-center '>
            <h1 className=' text-5xl '>TEST HANDLE LOGIN</h1>
            <button onClick={handlLogin} className='my-8 p-4 bg-blue-700 rounded-lg text-3xl text-gray-100 '> Login </button>
            <button onClick={handlePartailUpdate} className='my-8 p-4 bg-blue-700 rounded-lg text-3xl text-gray-100 '> Update </button>
            <button className='my-8 bg-blue-700 rounded-lg text-3xl text-gray-100 '>
                {
                    unAuthorized && <button onClick={handleRefreshToken} className=' p-4 '> Refresh Token </button>
                }
            </button>

        </main>
    )
}
