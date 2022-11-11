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
    <Layout title="Home | Sr Smith App" className="h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
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
        <div className="w-1/2">
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
