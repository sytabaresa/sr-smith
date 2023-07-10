import { HTMLAttributes } from "react";
import { About } from "@components/atoms/about";
import { useTranslation } from "@modules/i18n";
import createModal from "@components/molecules/createModal";
import { cn } from "@utils/styles";

export interface IFooterProps extends HTMLAttributes<HTMLElement> { }

const Footer: React.FC<IFooterProps> = ({ className }) => {
  const { t } = useTranslation()

  const modal = createModal('about')
  return (
    <footer className={cn("flex", className)}>
      <modal.Label>
        <button className="btn btn-sm btn-outline bg-base-100 btn-circle modal-button" aria-label={t.common.help()}>
          ?
        </button>
      </modal.Label>
      <modal.Modal className="overflow-x-clip overflow-y-auto p-0">
        <About />
      </modal.Modal>
    </footer>
  );
};

export default Footer;
