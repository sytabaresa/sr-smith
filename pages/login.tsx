import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/templates";
import { auth } from "../firebase/clientApp";
import { useUser } from "../providers/userContext";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import SingUpForm from "../components/organisms/login/signup_form";
import LoginForm from "../components/organisms/login/login_form";
import { useTranslation } from "next-export-i18n";
import { SmithImage } from "../components/atoms/smithImage";

interface LoginProps {
  homePage: UrlObject | string;
}

const Login = ({ homePage = "/" }: LoginProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    if (router.query?.redirect) {
      router.push(router.query?.redirect as string);
    } else {
      router.push(homePage);
    }
  }

  return (
    <Layout title="Saved | Sr Smith App" className="relative h-screen overflow-hidden">
      <div className="absolute w-full h-full blur-[3px] lg:blur-sm">
        <SmithImage className="absolute w-96 lg:w-[50rem] left-[-10rem] bottom-[-4rem] opacity-40 hover:opacity-100 stroke-success trasnform -scale-x-100 scale-y-100 motion-safe:animate-pulse hover:animate-none" />
        <SmithImage className="absolute w-60 lg:w-[30rem] right-[-1rem] lg:right-[-4rem] top-[2rem] opacity-40 hover:opacity-100 stroke-error motion-safe:animate-pulse hover:animate-none" />
      </div>

      <div className="flex-grow flex flex-col items-center justify-start mt-20 lg:mt-40">
        <div className="tabs">
          <a
            className={`tab tab-lg tab-bordered ${isLogin ? "tab-active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            {t("Login")}
          </a>
          <a
            className={`tab tab-lg tab-bordered ${!isLogin ? "tab-active" : ""
              }`}
            onClick={() => setIsLogin(false)}
          >
            {t("Sign Up")}
          </a>
        </div>
        <div className="w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 z-10">
          {isLogin ? (
            <LoginForm />
          ) : (
            <SingUpForm />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
