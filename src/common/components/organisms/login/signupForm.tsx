import { useLanguageQuery, useTranslation } from "@utils/i18n";
import { useLocation } from "wouter"
  ;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "../../../hooks/useAuthProvider";
import { qStr } from "../../../utils/common";

type SignUpFormProps = {
  // onSubmit?: (data: any) => void;
  // errorsRepeatPassword?: string;
};

const SingUpForm = ({ }: SignUpFormProps) => {
  const { t } = useTranslation();
  const [query] = useLanguageQuery()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { register: signUp } = useAuthProvider()
  const [errorsRepeatPassword, setErrorsRepeatPassword] = useState("");
  const [location, navigate] = useLocation();

  const onSubmitSignUp = async (data) => {
    const { email, password, repeatPassword } = data;
    if (password != repeatPassword) {
      setErrorsRepeatPassword("Passwords do not match");
      return;
    }
    try {
      const user = await signUp(data)
      console.log('succefull created', user);
      navigate('/smith' + qStr(query));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSignUp)} className="form-control">
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
          <span className="label-text-alt" role="alert">{t("email-required")}</span>
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
          <span className="label-text-alt" role="alert">{t("password-required")}</span>
        </label>
      )}
      <label htmlFor="repeatPassword" className="label">
        <span className="label-text" role="alert">{t("repeat-password")}</span>
      </label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        className="input input-bordered"
        aria-invalid={errors.repeatPassword ? "true" : "false"}
        {...register("repeatPassword", { required: true })}
      />
      <label className="label">
        <span className="label-text-alt">{errorsRepeatPassword}</span>
      </label>
      <button className="btn btn-primary mt-10 w-full lg:btn-wide self-center" type="submit">
        {t("Sign up")}
      </button>
    </form>
  );
};

export default SingUpForm;
