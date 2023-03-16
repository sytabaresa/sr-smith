import { HTMLAttributes } from "react";
import { About } from "@components/atoms/about";

export interface IFooterProps extends HTMLAttributes<HTMLElement> { }

const Footer: React.FC<IFooterProps> = ({ className }) => {
  return (
    <footer className={"mt-10 mx-4 flex " + className}>
      <label htmlFor="about-modal" className="btn btn-sm btn-outline bg-base-100 btn-circle modal-button">
        ?
      </label>
      <input type="checkbox" id="about-modal" className="modal-toggle" />
      <label className="modal cursor-pointer" htmlFor="about-modal">
        <label className="modal-box relative" htmlFor="">
          <label htmlFor="about-modal" className="btn btn-link btn-sm absolute right-2 top-2">✕</label>
          <About />
        </label>
      </label>
    </footer>
  );
};

export default Footer;
