import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Layout from "../components/templates";
import app from "../firebase/clientApp";
import { auth } from "../firebase/clientApp";
import { useUser } from "../providers/userContext";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import SingUpForm from "../components/organisms/login/signup_form";
import LoginForm from "../components/organisms/login/login_form";

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
  const [errorsRepeatPassword, setErrorsRepeatPassword] = useState("");

  const router = useRouter();

  const onsubmitLogin = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    }
  };

  const onSubmitSignUp = async (data) => {
    const { email, password, repeatPassword } = data;
    if (password != repeatPassword) {
      setErrorsRepeatPassword("Passwords do not match");
      return;
    }
    try {
      setErrorsRepeatPassword("");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential;
      console.log('succefull created', user);
      router.push('/smith');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    }
  };

  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    if (router.query?.redirect) {
      router.push(router.query?.redirect as string);
    } else {
      router.push(homePage);
    }
  }

  return (
    <Layout title="Home | Sr Smith App" className="h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="tabs">
          <a
            className={`tab tab-lg tab-bordered ${isLogin ? "tab-active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            {t("login")}
          </a>
          <a
            className={`tab tab-lg tab-bordered ${
              !isLogin ? "tab-active" : ""
            }`}
            onClick={() => setIsLogin(false)}
          >
            {t("Sign Up")}
          </a>
        </div>
        <div className="w-1/2">
          {isLogin ? (
            <LoginForm onSubmit={onsubmitLogin} />
          ) : (
            <SingUpForm
              onSubmit={onSubmitSignUp}
              errorsRepeatPassword={errorsRepeatPassword}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
