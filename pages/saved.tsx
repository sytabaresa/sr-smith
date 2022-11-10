import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WithAuth from "../components/hoc/withAuth";
import SavedProjectCard from "../components/molecules/savedProjectCard";
import { db } from "../firebase/clientApp";
import { SmithProject } from "../interfaces";
import { useUser } from "../providers/userContext";

const SavedProjects = () => {
  const router = useRouter();
  const auth = getAuth();
  const [userProejects, setUserProjects] = useState([] as SmithProject[]);
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      getSavedProjects(user.uid)
    }
  }, [])

  const getSavedProjects = async (userUid: string) => {
    if (auth != null) {
      var q = query(collection(db, "projects"), where("userId", "==", userUid));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as SmithProject
      });
      setUserProjects(projectsList);
    }
  };

  const goToSavedProject = (projectId: string) => {
    router.push({ pathname: '/', query: { id: projectId } });
  }

  const renderSavedProjects = (projects: SmithProject[]) => {
    if (projects.length == 0) {
      return <h3>No tienes proyectos guardados</h3>;
    } else {
      return (
        <div className="flex flex-wrap justify-center">
          {projects.map((item, i) => {
            return (
              <div
                key={i}
                className="w-4/12 md:w-2/12 m-2 md:m-4"
                onClick={() => { goToSavedProject(item.id) }}
              >
                <SavedProjectCard
                  title={item.name}
                  image="/images/smith-app.png"
                  id={""}
                />
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="overflow-y-hidden ">
      <h1 className="text-xl font-bold text-center my-2">
        Proyectos Anteriores
      </h1>
      {renderSavedProjects(userProejects)}
    </div>
  );
};

export default WithAuth(SavedProjects);
