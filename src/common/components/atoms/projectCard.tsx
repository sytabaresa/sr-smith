import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { useDataProvider } from "@hooks/useDataProvider";
import { SmithProject } from "@localtypes/smith";
import { useLanguageQuery, useTranslation } from "@modules/i18n";
import { useRouter } from "@modules/router";
import React, { HTMLAttributes } from "react";


interface ProjectCard extends HTMLAttributes<HTMLDivElement> {
    project: SmithProject
}

const ProjectCard = (props: ProjectCard) => {
    const { project, className, ...rest } = props
    const { id, name, description } = project
    const image = '/images/smith-app.png'
    const { t } = useTranslation()
    const [query] = useLanguageQuery()
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { deleteOne } = useDataProvider()

    const goToSavedProject = (id: string) => {
        push('/', { ...query, id: id })
    }

    const removeProject = async (id: string) => {
        await deleteOne({ resource: 'projects', id: id })
    }

    return (
        <div className={`border-secondary border-2 hover:border-4 hover:border-primary card bg-base-100
        rounded-b-none w-80 h-80 md:h-72 flex flex-col shadow-md cursor-pointer relative ${className}`}
            onClick={(e) => { goToSavedProject(id) }}
            {...rest}>
            <figure><img src={image} className="w-full" /></figure>
            <div className="p-2 md:h-32 bg-base-100">
                <h2 className="text-2xs md:text-sm my-2 ml-2 font-bold">{name}</h2>
                <p>{description}</p>
                <div className="absolute right-0 bottom-0 dropdown dropdown-end" onClick={e => e.stopPropagation()}>
                    <label tabIndex={0} class="btn btn-ghost"><DotsVerticalIcon className="w-6" /></label>
                    <ul tabIndex={0} class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a role="button" onClick={(e) => { e.stopPropagation(); removeProject(id) }}><TrashIcon className="w-6" />{t.saved.delete()}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard