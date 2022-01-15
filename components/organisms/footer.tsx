import { HTMLAttributes } from "react";

export interface IFooterProps extends HTMLAttributes<HTMLElement> {
};

const Footer: React.FC<IFooterProps> = ({ className }) => {
    return (
        <footer className={"mt-10 mx-4 " + className}>
            <span>
                CC - BY NC
                <a className="text-blue-500" href="https://www.linkedin.com/in/sytabaresa">@sytabares</a> -
                <a className="text-blue-500" href="https://github.com/kellar1896">@cbarreto</a>
            </span>
        </footer>
    );
}

export default Footer;