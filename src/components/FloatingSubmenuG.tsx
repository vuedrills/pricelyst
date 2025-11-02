import React from "react";
import { Link } from "react-router-dom";

export interface SubmenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

interface FloatingSubmenuProps {
  isVisible: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  items: SubmenuItem[];
  navbarWidth: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const FloatingSubmenu: React.FC<FloatingSubmenuProps> = ({
  isVisible,
  items,
  navbarWidth,
  onMouseEnter,
  onMouseLeave,
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`
      fixed top-0 h-screen w-48
      bg-gray-50 z-40
      transition-transform duration-200 ease-out
      border-r border-gray-200
      ${isVisible ? "translate-x-0" : "-translate-x-full"}
      shadow-none
    `}
    style={{
      left: `${navbarWidth}px`,
      boxShadow: "none",
      top: 0,
    }}
  >
    <div className="h-full overflow-y-auto">
      <nav className="flex flex-col py-4">
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.path || "#"}
            onClick={item.onClick}
            className="px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer text-sm font-medium text-gray-700 group"
          >
            <span className="group-hover:text-blue-700">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  </div>
);

export default FloatingSubmenu;