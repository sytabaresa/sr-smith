import { HTMLAttributes } from "react";

export interface IFooterProps extends HTMLAttributes<HTMLElement> {}

const Footer: React.FC<IFooterProps> = ({ className }) => {
  return (
    <footer className={"mt-10 mx-4 flex " + className}>
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
        <img
          alt="Licencia Creative Commons"
          style={{ borderWidth: 0, paddingRight: 5 }}
          src="https://i.creativecommons.org/l/by/4.0/88x31.png"
        />
      </a>
      <span className="pr-1">Esta obra está bajo una</span>
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
        {" "}
        Licencia Creative Commons Atribución 4.0 Internacional.
      </a>
      <span>
        <a
          className="text-blue-500"
          href="https://www.linkedin.com/in/sytabaresa"
        >
          @sytabares
        </a>{" "}
        -
        <a className="text-blue-500" href="https://github.com/kellar1896">
          @cbarreto
        </a>
      </span>
    </footer>
  );
};

export default Footer;
