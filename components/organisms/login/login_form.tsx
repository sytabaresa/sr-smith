import { browserPopupRedirectResolver, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useTranslation } from "next-export-i18n";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase/clientApp";
import provider from "../../../firebase/googleLogin";
import { GoogleIcon } from "../../atoms/custom-icons";

type LoginFormProps = {
  // onSubmit: (data: any) => void;
}

const LoginForm = ({ }: LoginFormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (process.env.NODE_ENV !== 'development') {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

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
      // console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    }
  };

  const onGoogleLogin = async (data) => {
    if (process.env.NODE_ENV == 'development') {
      signInWithPopup(auth, provider, browserPopupRedirectResolver)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } else {
      await signInWithRedirect(auth, provider, browserPopupRedirectResolver)
    }

  }

  return (
    <form onSubmit={handleSubmit(onsubmitLogin)} className="form-control">
      <label htmlFor="user" className="label">
        <span className="label-text">{t("username")}</span>
      </label>
      <input
        id="user"
        name="user"
        type="email"
        placeholder="test@example.com"
        className="input input-bordered"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", { required: true })}
      />
      {errors.email && (
        <label className="label">
          <span className="label-text-alt" role="alert">
            {t("email-required")}
          </span>
        </label>
      )}

      <label htmlFor="password" className="label">
        <span className="label-text">{t("password")}</span>
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="input input-bordered"
        aria-invalid={errors.password ? "true" : "false"}
        {...register("password", { required: true })}
      />
      {errors.password && (
        <label className="label">
          <span className="label-text-alt" role="alert">
            {t("password-required")}
          </span>
        </label>
      )}
      <button
        className="btn btn-primary mt-10 w-full lg:btn-wide self-center"
        type="submit"
      >
        {t("login")}
      </button>
      <button className="group btn btn-outline bg-base-100 text-red-400
       hover:bg-red-400 hover:border-red-400 w-full lg:btn-wide mt-2 self-center" onClick={onGoogleLogin}>
        <div className="w-6 h-6 fill-red-400 group-hover:fill-base-100 mr-4">
          <GoogleIcon />
        </div>
        {t("google-login")}
      </button>
    </form >
  )
}

export default LoginForm;