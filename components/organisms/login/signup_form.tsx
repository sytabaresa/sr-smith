import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebase/clientApp";

type SignUpFormProps = {
  // onSubmit?: (data: any) => void;
  // errorsRepeatPassword?: string;
};

const SingUpForm = ({ }: SignUpFormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
  formState: { errors },
  } = useForm();
  const [errorsRepeatPassword, setErrorsRepeatPassword] = useState("");
  const router = useRouter();

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
        {...register("email", { required: true })}
      />
      {errors.email && (
        <label className="label">
          <span className="label-text-alt">{t("email-required")}</span>
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
          <span className="label-text-alt">{t("password-required")}</span>
        </label>
      )}
      <label htmlFor="repeatPassword" className="label">
        <span className="label-text">{t("repeat-password")}</span>
      </label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        className="input input-bordered"
        {...register("repeatPassword", { required: true })}
      />
      <label className="label">
        <span className="label-text-alt">{errorsRepeatPassword}</span>
      </label>
      <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
        {t("Sign up")}
      </button>
    </form>
  );
};

export default SingUpForm;
