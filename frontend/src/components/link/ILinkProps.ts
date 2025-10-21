import { CSSProperties, ReactNode } from "react"

interface ILinkProps {
	reactRouter: boolean
	url: string
	children: ReactNode
	className?: string
	styles?: CSSProperties
}

export default ILinkProps