import { string } from "prop-types";

export interface MainICardProps {
    title: string;
    bgImage: string;
};

const MainCard: React.FC<MainICardProps> = ({ bgImage, title }) => {
    return (
        <div className="border border-black rounded-t-3xl w-full h-96 flex flex-col shadow-sm">
            <div
                style={{ backgroundImage: `url(${bgImage})` }}
                className="w-full flex-1 bg-cover rounded-t-3xl border-b border-black"
            >
            </div>
            <h2 className="text-lg my-2 ml-2">{title}</h2>
        </div>
    );
}

export default MainCard;