import { CSSProperties, ReactNode } from "react"

interface IPageProps {
	children: ReactNode
	videoBackground?: string
	title?: string
	className?: string
	styles?: CSSProperties
}

export default IPageProps