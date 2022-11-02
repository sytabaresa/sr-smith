import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SavedProjectCard from "../../components/molecules/savedProjectCard";
import { db } from "../../firebase/clientApp";
import { SmithProyect } from "../../interfaces";

const SavedProjects = () => {
  const router = useRouter();
  const auth = getAuth();
  const [userProejects, setUserProjects] = useState([] as SmithProyect[]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        getSavedProjects(user.uid)
      } else {
        router.replace("/login");
      }
    });
  }, [])

  const getSavedProjects = async (userUid: string) => {
    if (auth != null) {
      var q = query(collection(db, "projects"), where("userId", "==", userUid));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as SmithProyect
      });
      setUserProjects(projectsList);
    }
  };

  const goToSavedProject = (projectId: string) => {
    router.push(`/projects/smith?id=${projectId}`)
  }

  const renderSavedProjects = (projects: SmithProyect[]) => {
    if (projects.length == 0) {
      return <h3>No tienes proyectos guardados</h3>;
    } else {
      return (
        <div className="flex flex-wrap justify-center">
          {projects.map((item) => {
            return (
              <div className="w-4/12 md:w-2/12 m-2 md:m-4" onClick={() => { goToSavedProject(item.id) }}>
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

export default SavedProjects;
