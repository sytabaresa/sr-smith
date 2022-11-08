import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";

type LoginFormProps = {
  onSubmit: (data: any) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <label htmlFor="user" className="label">
        <span className="label-text">{t("username")}</span>
      </label>
      <input
        id="user"
        name="user"
        type="email"
        placeholder="test@example.com"
        className="input input-bordered"
        {...register("email", { required: true })}
      />
      {errors.email && (
        <label className="label">
          <span className="label-text-alt">
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
        {...register("password", { required: true })}
      />
      {errors.password && (
        <label className="label">
          <span className="label-text-alt">
            {t("password-required")}
          </span>
        </label>
      )}
      <button
        className="btn btn-primary mt-10 w-1/2 self-center"
        type="submit"
      >
        {t("login")}
      </button>
      <button className="btn bg-red-600  mt-2 w-1/2 self-center">
        <div className="w-6 h-6 fill-white mr-4">
          <svg version="1.1" id="Capa_1" x="0px" y="0px"
            viewBox="0 0 210 210">
            <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
	c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
	S0,162.897,0,105z"/>
          </svg>
        </div>
        Login por Google
      </button>
    </form>
  )
}

export default LoginForm;