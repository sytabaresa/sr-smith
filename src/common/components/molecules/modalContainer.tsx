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

  return (
    <label htmlFor={modalName}
      className={className}
      onClick={isModal ? null : onClick}
      {...rest}
    >
      {children}
      {isModal && <>
        <input type="checkbox" id={modalName} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative ">
            <label
              htmlFor={modalName}
              aria-hidden="true"
              className="btn btn-sm btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="w-full">{modalChild}</div>
          </div>
        </div>
      </>}
    </label >
  );
};

export default ModalContainer;
