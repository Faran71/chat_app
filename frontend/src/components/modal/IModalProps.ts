import { ReactNode } from "react";

interface IModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export default IModalProps