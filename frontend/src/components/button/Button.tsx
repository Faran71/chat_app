import React from "react"
import IButtonProps from "./IButtonProps"
import "./Button.css"
import * as motion from "motion/react-client"

const Button = ({
	children,
	type = "button",
	onClick,
	className = "",
	styles
}: IButtonProps) => {
	return (
		<motion.button
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 0.97 }}
			onClick={onClick}
			type={type}
			className={`button ${className}`}
			style={styles}
		>
			{children}
		</motion.button>
	)
}

export default Button
