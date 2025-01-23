'use client';

import { MdClose } from 'react-icons/md';

import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

export interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

export function Modal({ show, children, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      <Dialog
        as="div"
        static
        open={show}
        onClose={onClose}
        className="relative z-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-backdrop"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-scroll">
          <DialogPanel
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl space-y-2 bg-mainLightColor py-6 px-8 max-h-[80vh] overflow-y-scroll relative no-scrollbar"
          >
            <button
              type="button"
              className="absolute top-4 right-4"
              onClick={onClose}
              aria-label="close modal"
            >
              <div className=" bg-mainDarkColor hover:bg-cardColor transition-colors rounded-full">
                <MdClose className="text-xl text-mainLightColor" />
              </div>
            </button>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </AnimatePresence>
  );
}
