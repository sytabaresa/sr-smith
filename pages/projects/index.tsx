import React, { useState } from "react";
import MainCard from "../../components/Card";
import smith from "../../assets/images/smith-app.png";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { SmithProyect } from "../../interfaces";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import ProjectSelector from "../../components/molecules/projectSelector";
import { FolderAddIcon, FolderIcon } from "@heroicons/react/outline";
import NewProjectForm from "../../components/organisms/newProjectForm";

const Projects = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const openNew = async (data) => {
    const { projectName, projectDescription } = data;
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        createAt: Timestamp.now(),
        data: "",
        description: projectDescription,
        hashReference: "",
        isPubic: false,
        name: projectName,
        updateAt: Timestamp.now(),
        userId: user.uid,
      } as SmithProyect);
      router.push(`/projects/smith?id=${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  const goToSavedProjects = () => {
    router.push("/projects/saved");
  };

  return (
    <div className="flex flex-wrap items-center justify-center h-screen space-y-2 md:space-x-5 relative">
      <ProjectSelector
        title={"Nuevo Proyecto"}
        image={
          <FolderIcon className="h-10 w-10 md:h-20 md:w-20 text-gray-500" />
        }
        isModal={true}
        modalChild={<NewProjectForm onSubmit={openNew} />}
      />
      <ProjectSelector
        title={"Abrir Proyecto"}
        image={
          <FolderAddIcon className="h-10 w-10 md:h-20 md:w-20 text-gray-500" />
        }
        onClick={goToSavedProjects}
      />
      <img
        src="../images/smith-app.png"
        alt="smith-bg"
        className="absolute -z-10 right-0 left-0"
      />
    </div>
  );
};

export default Projects;
