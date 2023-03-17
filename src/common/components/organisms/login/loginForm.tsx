import { useTranslation } from "@modules/i18n";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@hooks/useAuthProvider";
import { GoogleIcon } from "@components/atoms/icons";

type LoginFormProps = {
  // onSubmit: (data: any) => void;
}

const LoginForm = ({ }: LoginFormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const { login } = useAuthProvider()

  const onSubmitLogin = async (data) => {
    const { email, password } = data;

    const user = await login(data)
    // Signed in
    // console.log(user);

  };

  const onGoogleLogin = async (data) => {
    const user = await login({ provider: 'google' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} className="form-control">
      <label htmlFor="user" className="label">
        <span className="label-text uppercase font-bold">
          {t.login.username()}
        </span>
      </label>
      <input
        id="user"
        name="user"
        type="email"
        placeholder={"test@example.com".toUpperCase()}
        className="input input-bordered"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", { required: true })}
      />
      {errors.email && (
        <label className="label">
          <span className="label-text-alt uppercase" role="alert">
            {t.login.email_required()}
          </span>
        </label>
      )}

      <label htmlFor="password" className="label">
        <span className="label-text uppercase font-bold">{t.login.password()}</span>
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
          <span className="label-text-alt uppercase" role="alert">
            {t.login.password_required()}
          </span>
        </label>
      )}
      <button
        className="btn btn-primary mt-10 w-full lg:btn-wide self-center"
        type="submit"
      >
        {isSubmitting ? t.login.logging_in() + "..." : isSubmitSuccessful ? t.login.done() : t.login.login()}
      </button>
      <button className="group btn btn-outline bg-base-100 text-red-400
       hover:bg-red-400 hover:border-red-400 w-full lg:btn-wide mt-2 self-center" onClick={onGoogleLogin}>
        <div className="w-6 h-6 fill-red-400 group-hover:fill-base-100 mr-4">
          <GoogleIcon />
        </div>
        {t.login.google_login()}
      </button>
    </form >
  )
}

export default LoginForm;