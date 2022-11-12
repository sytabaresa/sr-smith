import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase/clientApp";
import { SmithProject } from "../../interfaces";
import { useLanguageQuery, useTranslation } from "next-export-i18n"

type ConfigsFormProps = {
  // onSubmit: (data: any) => void;
};


const ConfigsForm = ({ }: ConfigsFormProps) => {
  const { t } = useTranslation()
  const[query] = useLanguageQuery()
  const router = useRouter()
  const user = auth.currentUser;

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();

  const onSubmit = async () => {}

  return (
    <form className="flex flex-col justify-center md:px-20" onSubmit={handleSubmit(onSubmit)}>
     
      <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
        {isSubmitting ? t('Creating') + "..." : isSubmitted ? t('Done') : t('Create')}
      </button>
    </form>
  );
};

export default ConfigsForm;
