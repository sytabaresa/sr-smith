import React from "react";


type SavedProjectCard = {
    image: string
    title: string
    id: string
    description?: string
}

const SavedProjectCard = ({ id, image, title, description }: SavedProjectCard) => {
    return (
        <div className="border-neutral border-2 hover:border-4 hover:border-primary card rounded-b-none w-80 h-80 md:h-72 flex flex-col shadow-md">
            <figure><img src={image} /></figure>
            <div className="p-2 md:h-32 bg-base-100">
                <h2 className="text-2xs md:text-sm my-2 ml-2 font-bold">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default SavedProjectCard