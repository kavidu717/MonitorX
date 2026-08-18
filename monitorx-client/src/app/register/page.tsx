"use client"
import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // register function

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError("")

        console.log(firstName, lastName, email, password)

        try {
            const response = await api.post("/auth/register", {
                firstName,
                lastName,
                email,
                password,
            });

            localStorage.setItem("registerEmail", email);
            alert(response.data.message || "Registration successful! Please check your email for OTP.");
            router.push("/verify-otp")


        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <form action="" onSubmit={handleRegister}>
                <div>
                    <label htmlFor="">firstname</label>
                    <input type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor="">lastname</label>
                    <input type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor="">email</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div>
                    <label htmlFor="">password</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <button type="submit">Register</button>


            </form>
        </div>

    )
}