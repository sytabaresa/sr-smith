import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { SmithProject } from "../interfaces";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import ModalContainer from "../components/molecules/modalContainer";
import { FolderAddIcon, FolderIcon } from "@heroicons/react/outline";
import NewProjectForm from "../components/organisms/newProjectForm";

const Projects = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const goToSavedProjects = () => {
    router.push("/saved");
  };

  const Child = ({ image, title }: { image: JSX.Element, title: string }) => {
    return <div className="card py-10 bg-gray-300  shadow-2xl flex flex-col items-center justify-center">
      <div className="text-lg font-semidbold text-center text-gray-500">
        {image}
        <span>
          {title}
        </span>
      </div>
    </div>
  }

  return (
    <div className="flex flex-wrap items-center justify-center h-screen space-y-2 md:space-x-5 relative">
      <ModalContainer
        className="w-10/12 md:w-3/12"
        modalChild={<NewProjectForm />}
        isModal
      >
        <Child
          title={"Nuevo Proyecto"}
          image={<FolderIcon className="h-10 w-10 md:h-20 md:w-20 text-gray-500" />}
        />
      </ModalContainer>
      <ModalContainer
        className="w-10/12 md:w-3/12"
        onClick={goToSavedProjects}
      >
        <Child
          title={"Abrir Proyecto"}
          image={<FolderAddIcon className="h-10 w-10 md:h-20 md:w-20 text-gray-500" />}
        />
      </ModalContainer>
      <img
        src="../images/smith-app.png"
        alt="smith-bg"
        className="absolute -z-10 right-0 left-0"
      />
    </div>
  );
};

export default Projects;
