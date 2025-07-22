"use client";
import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";

interface ChildrenFunction {
  closeModal: () => void;
}

export default function Modal({
  children,
  button,
  title,
}: {
  children:
    | React.ReactNode
    | ((closeModal: ChildrenFunction) => React.ReactNode);
  button: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {button}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            className="flex h-full max-h-[60vh] w-full max-w-[95vw] flex-col overflow-hidden rounded-lg bg-white p-4 sm:max-w-[80vw] lg:max-h-[70vh] lg:max-w-[60vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="custom-scrollbar relative flex-1 overflow-y-auto pr-2">
              <div className="mb-2 flex items-center justify-between px-4 pt-2">
                <h2 className="text-dark-text text-xl font-bold md:text-2xl">
                  {title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-dark-text hover:text-mainBlue cursor-pointer text-2xl font-medium transition-all duration-300 md:text-3xl"
                >
                  <VscClose />
                </button>
              </div>

              {typeof children === "function"
                ? children({ closeModal })
                : children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
