import React from "react";
import { useForm } from "react-hook-form";

type NewProjectFormProps = {
  onSubmit: (data: any) => void;
};

const NewProjectForm = ({ onSubmit }: NewProjectFormProps) => {
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
