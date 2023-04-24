import { ModalLabel } from "@components/atoms/modalLabel";
import { useTranslation } from "@modules/i18n";
import { labelExtraProps } from "@utils/label";
import React from "react";

interface ModalContainerProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isModal?: boolean;
  modalChild?: JSX.Element;
  modalName?: string;
};

const ModalContainer = ({
  onClick,
  isModal = false,
  modalChild,
  children,
  className,
  modalName,
  ...rest
}: ModalContainerProps) => {
  modalName = !modalName || modalName == '' ? `modal-${Math.random().toString().slice(-5)}` : modalName
  const {t} = useTranslation()

  return (
    <label htmlFor={modalName}
      className={className}
      onClick={isModal ? null : onClick}
      {...rest}
    >
      {children}
      {isModal && <>
        <input type="checkbox" id={modalName} className="modal-toggle hidden" />
        <label htmlFor={modalName} className="modal cursor-pointer">
          <label htmlFor="" className="modal-box relative ">
            <ModalLabel
              htmlFor={modalName}
              className="btn btn-sm btn-ghost absolute right-2 top-2"
              aria-label={t.common.close()}
            >
              ✕
            </ModalLabel>
            <div className="w-full">{modalChild}</div>
          </label>
        </label>
      </>}
    </label >
  );
};

export default ModalContainer;
