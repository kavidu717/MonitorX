"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {

    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)




    // login function
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email: email,
                password: password,
            });

            const token = response.data.accessToken;
            localStorage.setItem("token", token);

            router.push("/");
        }
        catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong!");

        } finally {
            setLoading(false)
        }

    }

    return (
        <div>

            <form action="" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="">email </label>
                    <input type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor="">password </label>
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />

                    <br />
                    <Link href="/forgot-password" style={{ fontSize: "14px", color: "blue", textDecoration: "underline" }}>
                        Forgot password?
                    </Link>
                </div>



                <div>
                    <button type="submit">submit</button>
                </div>

                <p>
                    Don't have an account? <Link href="/register" >
                        Register here
                    </Link>
                </p>
            </form>

        </div>
    )
}