import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import "./Modal.css";
import IModalProps from './IModalProps';

const Modal = ({
    isOpen,
    onClose,
    children
}: IModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal