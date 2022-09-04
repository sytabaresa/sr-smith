import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { SmithProyect } from "../../interfaces";

const SavedProjects = () => {
  const router = useRouter();
    const [userProejects, setUserProjects] = useState([] as SmithProyect[])

  useEffect(() => {
    getSavedProjects();
  }, []);

  const getSavedProjects = async () => {
    const auth = await getAuth().currentUser;
    var q = query(
      collection(db, "projects"),
      where("userId", "==", auth.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    const projectsList = querySnapshot.docs.map((doc) => doc.data());
    setUserProjects(projectsList);
  };

  const renderSavedProjects = (projects: SmithProyect[]) => {
    if(projects.length == 0) {
        return (
            <div>
                <h3>No tienes proyectos guardados</h3>
            </div>
        )
    }else {
        return (
            <div>
                {projects.map((item)=>{
                    return(
                        <div>
                            <label>{item.userId}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
  }

  return (
    <div>
      {renderSavedProjects(userProejects)}
    </div>
  );
};

export default SavedProjects;
