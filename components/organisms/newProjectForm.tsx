import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase/clientApp";
import { SmithProject } from "../../interfaces";

type NewProjectFormProps = {
  // onSubmit: (data: any) => void;
};

const NewProjectForm = ({ }: NewProjectFormProps) => {
  const router = useRouter()
  const user = auth.currentUser;

  const onSubmit = async (data) => {
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
      router.push({ pathname: '/canvas', query: { id: docRef.id } });
      router.reload()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <form className="flex flex-col justify-center md:px-20" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="projectName" className="label">
        <span className="label-text">Nombre del Projecto *</span>
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
          <span className="label-text-alt">Campo Requerido</span>
        </label>
      )}
      <label htmlFor="projectDescription" className="label">
        <span className="label-text">Descripcion del Projecto</span>
      </label>
      <textarea
        id="projectDescription"
        name="projectDescription"
        className="input input-bordered"
        {...register("projectDescription", { required: false })}
      />
      <button className="btn btn-primary mt-10 w-1/2 self-center" type="submit">
        Crear
      </button>
    </form>
  );
};

export default NewProjectForm;
