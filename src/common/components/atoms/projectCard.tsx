import { themeAtom } from "@core/atoms/common";
import { useBoardSnapshot } from "@core/utils/snapshot";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { useDataProvider } from "@hooks/useDataProvider";
import { SmithProject } from "@localtypes/smith";
import { useLanguageQuery, useTranslation } from "@modules/i18n";
import { useRouter } from "@modules/router";
import { cn } from "@utils/styles";
import { useAtomValue } from "jotai";
import { HTMLAttributes, Suspense } from "react";


interface ProjectCard extends HTMLAttributes<HTMLDivElement> {
    project: SmithProject
    initialImage?: string
}

const ProjectCard = (props: ProjectCard) => {
    const { project, className, initialImage, ...rest } = props
    const { id, name, description } = project
    const { t } = useTranslation()
    const [query] = useLanguageQuery()
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { data } = useDataProvider()

    const goToSavedProject = (id: string) => {
        push('/', { ...query, id: id })
    }

    const removeProject = async (id: string) => {
        const { deleteOne } = data
        await deleteOne({ resource: 'projects', id: id })
    }

    return (
        <div className={cn('group border-neutral border-2 hover:border-4 hover:border-primary card bg-base-100',
            'rounded-b-none w-80 h-80 md:h-72 flex flex-col shadow-md cursor-pointer relative', className)}
            onClick={(e) => { goToSavedProject(id) }}
            {...rest}>
            <Suspense fallback={<div style={{ backgroundImage: `url(${initialImage}` }} className="w-full grow bg-cover bg-center blur-[2px] animate-pulse" />}>
                <ProjectImage code={project.data} />
            </Suspense>
            <div className="p-2 md:h-24 bg-base-100">
                <h2 className="text-2xs md:text-md my-2 font-bold">{name}</h2>
                <p>{description}</p>
                <div className="absolute right-0 bottom-0 dropdown dropdown-end" onClick={e => e.stopPropagation()}>
                    <label tabIndex={0} className="btn btn-ghost rounded-none"><DotsVerticalIcon className="w-6" /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
                        <li>
                            <a role="button" onClick={(e) => { e.stopPropagation(); removeProject(id) }}>
                                <TrashIcon className="w-6" />
                                {t.saved.delete()}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}



const ProjectImage = ({ code }) => {
    const { getImageUrl } = useBoardSnapshot()
    const theme = useAtomValue(themeAtom)

    const image = getImageUrl(code, { theme }).read()
    // console.log(image)

    return <div style={{ backgroundImage: `url(${image}` }} className="group-hover:backdrop-brightness-90 group-hover:grayscale w-full grow bg-cover bg-center" />


}

export default ProjectCard