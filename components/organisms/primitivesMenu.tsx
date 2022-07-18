import React, { useContext } from "react";
import { BeakerIcon } from "@heroicons/react/outline";
import point from "../../assets/icons/point.png";
import line from "../../assets/icons/line.png";
import circle from "../../assets/icons/circle.jpeg";
import angle from "../../assets/icons/angle.webp";
import CircleCenterRadius from "../atoms/custom-icons/circle-center-radius";
import CircleCenterPoint from "../atoms/custom-icons/circle-center-point";
import PointIcons from "../atoms/custom-icons/point";
import SegmentIcon from "../atoms/custom-icons/segment";
import LineIcon from "../atoms/custom-icons/line-icon";
import AngleIcon from "../atoms/custom-icons/angle-icon";
import { SmithContext } from "../../providers/smithContext";

type PrimitivesMenuProps = {
  onClickPoint?: () => void;
  onClickLine?: () => void;
  onClickAngle?: () => void;
  onClickCircleCenterRadius?: () => void;
  onClickCircleCenterPoint?: () => void;
  onClickSegment?: () => void;
};

const PrimitivesMenu = ({
  onClickAngle,
  onClickCircleCenterPoint,
  onClickCircleCenterRadius,
  onClickLine,
  onClickPoint,
  onClickSegment,
}: PrimitivesMenuProps) => {

  const { ui } = useContext(SmithContext)

  return (
    <div className="dropdown">
      <button tabIndex={0} className="btn btn-primary">
        <BeakerIcon className="w-6" />
      </button>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={onClickPoint}>
            <PointIcons width={30} /> <span className="ml-2">Punto</span>
          </a>
        </li>
        <li onClick={onClickSegment}>
          <a>
            <SegmentIcon width={30} /> <span className="ml-2">Segmento</span>
          </a>
        </li>
        <li onClick={onClickLine}>
          <a>
            <LineIcon width={30} /> <span className="ml-2">Recta</span>
          </a>
        </li>
        <li onClick={onClickAngle}>
          <a>
            <AngleIcon width={30} /> <span className="ml-2">Angulo</span>{" "}
          </a>
        </li>
        <li>
          <a href="#modalCircleCenterRadius">
            <CircleCenterRadius width={30} />{" "}
            <span className="ml-2">Circunferencia: centro y radio</span>{" "}
          </a>
        </li>
        <li onClick={onClickCircleCenterPoint}>
          <a>
            <CircleCenterPoint width={30} />{" "}
            <span className="ml-2">Circunferencia (centro, punto)</span>{" "}
          </a>
        </li>
      </ul>
      <div className="modal" id="modalCircleCenterRadius">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">
            Circunferencia: centro y radio
          </h3>
          <input type="text" placeholder="Elija el Radio" className="input input-bordered w-full max-w-xs" />
          <div className="modal-action flex items-center">
            <a href="#" className="text-gray-500">Cancelar</a>
            <a href="#" className="btn" onClick={onClickCircleCenterRadius}>
              Crear
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimitivesMenu;
