import React from "react"
import IPageProps from "./IPageProps"
import "./Page.css"
import { Navbar } from ".."
import { authRoute } from "../../constants/strings"
import { motion } from "motion/react"

const Page = ({
	children,
	videoBackground,
	title,
	className,
	styles
}: IPageProps) => {
	const showNavbar = window.location.pathname !== authRoute

	return (
		<>
			{
				showNavbar && (
					<Navbar/>
				)
			}
			<motion.div
				initial={{ opacity: "0%" }}
				animate={{ opacity: "100%" }}
				transition={{
					duration: 0.6
				}}
				className={`page ${className}`}
				style={styles}
			>
				{
					videoBackground && (
						<video className='pageVideo' autoPlay loop muted>
							<source src={videoBackground} type='video/mp4' />
						</video>
					)
				}
				{
					title && (
						<h1
							className="title"
						>
							{title}
						</h1>
					)
				}
				<div
					className="content fh"
				>
					{children}
				</div>
			</motion.div>
		</>
	)
}

export default Page