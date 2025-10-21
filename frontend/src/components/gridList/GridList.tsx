import React from "react"
import IGridListProps from "./IGridListProps"
import "./GridList.css"

const GridList = ({
	children,
	className,
	styles
}: IGridListProps) => {
	return (
		<div
			className={`grid ${className}`}
			style={styles}
		>
			{children}
		</div>
	)
}

export default GridList