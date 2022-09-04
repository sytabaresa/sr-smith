import React from "react";

type ProjectSelectorProps = {
  image: JSX.Element;
  title: string;
  onClick?: () => void;
  isModal?: boolean;
  modalChild?: JSX.Element;
};

const ProjectSelector = ({
  image,
  title,
  onClick,
  isModal = false,
  modalChild,
}: ProjectSelectorProps) => {
  return (
    <div
      className="w-10/12 md:w-3/12 py-10 bg-gray-300 card shadow-2xl flex flex-col items-center justify-center"
      onClick={isModal ? null : onClick}
    >
      <label htmlFor="my-modal-3" className="">
        {image}
        <span className="text-lg font-semidbold text-center text-gray-500">
          {title}
        </span>
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      {isModal ? (
        <div className="modal">
          <div className="modal-box relative ">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="w-full">{modalChild}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectSelector;
