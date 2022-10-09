import React from "react";


type SavedProjectCard = {
    image: string
    title: string
    id: string
}

const SavedProjectCard = ({id, image, title}: SavedProjectCard) =>{
    return (
        <div className="border border-black rounded-t-3xl h-32 md:h-48 flex flex-col shadow-sm">
            <div
                style={{ backgroundImage: `url(${image})` }}
                className="w-full flex-1 bg-cover rounded-t-3xl border-b border-black"
            >
            </div>
            <h2 className="text-2xs md:text-sm my-2 ml-2">{title}</h2>
            <ul></ul>
            <li></li>
        </div>
    )
}

export default SavedProjectCard