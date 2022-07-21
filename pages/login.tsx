import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form";
import Layout from '../components/templates'
import app from "../firebase/clientApp"
import { auth } from "../firebase/clientApp"
import { useUser } from "../providers/userContext";
import { useRouter } from "next/router";
import { UrlObject } from "url";

interface LoginProps {
    homePage: UrlObject | string
}

const Login = ({ homePage = '/' }: LoginProps) => {
    const { t } = useTranslation()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const router = useRouter()

    const onsubmit = async (data) => {
        const { email, password } = data

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // Signed in 
            const user = userCredential.user;
            console.log(user)

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        }
    }

    const { isAuthenticated } = useUser()

    if (isAuthenticated) {
        if (router.query?.redirect) {
            router.push(router.query?.redirect as string)
        } else {
            router.push(homePage)
        }
    }

    return (
        <Layout title="Home | Sr Smith App" className="h-screen">
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-primary text-xl">{t('login-title')}</h1>
                <form onSubmit={handleSubmit(onsubmit)} className="form-control w-1/2">
                    <label htmlFor="user" className="label">
                        <span className="label-text">{t('username')}</span>
                    </label>
                    <input id="user" name="user" type="email" placeholder="test@example.com" className="input input-bordered" {...register('email', { required: true })} />
                    {errors.email && <label className="label">
                        <span className="label-text-alt">{t('email-required')}</span>
                    </label>}

                    <label htmlFor="password" className="label">
                        <span className="label-text">{t('password')}</span>
                    </label>
                    <input id="password" name="password" type="password" className="input input-bordered" {...register('password', { required: true })} />
                    {errors.password && <label className="label">
                        <span className="label-text-alt">{t('password-required')}</span>
                    </label>}
                    <button onClick={onsubmit} className="btn btn-primary mt-10">{t('login')}</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login