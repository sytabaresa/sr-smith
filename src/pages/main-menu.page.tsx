import ModalContainer from "@components/molecules/modalContainer";
import { FolderAddIcon, FolderIcon } from "@heroicons/react/outline"
import NewProjectForm from "@components/organisms/newProjectForm";
import Layout from "@components/templates/default";
import { useLanguageQuery } from "@hooks/i18n";
import { qStr } from "@utils/common";
import { useRouter } from "@modules/router";

export { Projects as Page }

const Projects = () => {
  const { useHistory } = useRouter()
  const { push } = useHistory();
  const [query] = useLanguageQuery()

  const goToSavedProjects = () => {
    push("/saved" + qStr(query));
  };

  const Child = ({ image, title }: { image: JSX.Element, title: string }) => {
    return <div className="btn h-auto btn-large py-10 bg-gray-300  shadow-2xl">
      <div className="text-lg font-semidbold text-center text-gray-500 flex items-center">
        {image}
        <span>
          {title}
        </span>
      </div>
    </div>
  }

  return (
    <Layout title="Open | Sr Smith App" className="h-screen">
      <div className="-z-10 absolute right-0 left-0 w-full h-full bg-black">
        <img
          src={new URL("/images/smith-app.png", import.meta.url) as unknown as string}
          alt="smith-bg"
          className=" w-full h-full object-cover blur-sm opacity-40"
        />
      </div>
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
      </div>
    </Layout>
  );
};