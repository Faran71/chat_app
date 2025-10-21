import React from "react"
import { Link as ReactRouterLink } from "react-router-dom"
import ILinkProps from "./ILinkProps"
import "./Link.css"

const Link = ({
	reactRouter,
	url,
	children,
	className,
	styles
}: ILinkProps) => {
	return (
		reactRouter ? (
			<ReactRouterLink
				to={url}
				className={`link ${className}`}
				style={styles}
			>
				{children}
			</ReactRouterLink>
		) : (
			<a
				href={url}
				className={`link ${className}`}
				style={styles}
			>
				{children}
			</a>
		)
	)
}

export default Link