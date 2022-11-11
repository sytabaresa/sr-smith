import React from "react";


type SavedProjectCard = {
    image: string
    title: string
    id: string
    description?: string
}

const SavedProjectCard = ({ id, image, title, description }: SavedProjectCard) => {
    return (
        <div className="border-black border-2 hover:border-4 rounded-t-3xl w-80 h-80 md:h-72 flex flex-col shadow-md">
            <div
                style={{ backgroundImage: `url(${image})` }}
                className="w-full flex-1 bg-cover rounded-t-3xl border-b border-black"
            >
            </div>
            <div className="p-2 md:h-32 bg-white">
                <h2 className="text-2xs md:text-sm my-2 ml-2 font-bold">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default SavedProjectCard