import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase/clientApp";
import { SmithProject } from "../../interfaces";
import { useLanguageQuery, useTranslation } from "next-export-i18n"

type NewProjectFormProps = {
  // onSubmit: (data: any) => void;
};


const NewProjectForm = ({ }: NewProjectFormProps) => {
  const { t } = useTranslation()
  const[query] = useLanguageQuery()
  const router = useRouter()
  const user = auth?.currentUser;

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitting) return
    // clearErrors()
    const { projectName, projectDescription } = data;
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        createAt: Timestamp.now(),
        data: "",
        description: projectDescription,
        hashReference: "",
        isPublic: false,
        name: projectName,
        updateAt: Timestamp.now(),
        userId: user.uid,
      } as SmithProject);
      router.push({ pathname: '/', query: { id: docRef.id, ...query } });
      setTimeout(() => {
        router.reload()
      }, 1000)
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('projectName', { type: 'custom', message: e })
      reset({ keepValues: true })
    }
  };

  return (
    <form className="flex flex-col justify-center md:px-20" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="projectName" className="label">
        <span className="label-text">{t('Project Name')}*</span>
      </label>
      <input
        id="projectName"
        name="projectName"
        type="text"
        className="input input-bordered"
        {...register("projectName", { required: true })}
      />
      {errors.projectName && (
        <label className="label">
          <span className="label-text-alt">{t('Required Field')}</span>
        </label>
      )}
      <label htmlFor="projectDescription" className="label">
        <span className="label-text">{t('Project Description')}</span>
      </label>
      <textarea
        id="projectDescription"
        name="projectDescription"
        className="input input-bordered"
        {...register("projectDescription", { required: false })}
      />
      <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
        {isSubmitting ? t('Creating') + "..." : isSubmitted ? t('Done') : t('Create')}
      </button>
    </form>
  );
};

export default NewProjectForm;
