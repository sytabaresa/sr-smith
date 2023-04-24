import { HTMLAttributes } from "react";
import { About } from "@components/atoms/about";
import { useTranslation } from "@modules/i18n";
import createModal from "@components/molecules/createModal";

export interface IFooterProps extends HTMLAttributes<HTMLElement> { }

const Footer: React.FC<IFooterProps> = ({ className }) => {
  const { t } = useTranslation()

  const modal = createModal('about')
  return (
    <footer className={"flex " + className}>
      <modal.Label className="btn btn-sm btn-outline bg-base-100 btn-circle modal-button" aria-label={t.common.help()}>
        ?
      </modal.Label>
      <modal.Modal>
        <About />
      </modal.Modal>
    </footer>
  );
};

export default Footer;
