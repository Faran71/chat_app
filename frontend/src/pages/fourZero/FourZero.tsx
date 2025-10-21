import { Link } from "react-router-dom";
import { Box, Page } from "../../components"
import { IFourZeroProps } from "./IFourZeroProps"
import {
	authRoute,
	fourZeroFourErrorCode,
	fourZeroOneRoute,
	fourZeroThreeRoute,
	homeRoute,
} from "../../constants/strings";
import "./FourZero.css"

const FourZero = ({
	errorCode,
	errorMessage
}: IFourZeroProps) => {
	return (
		<Page
			title="4XX Error"
			className="ctr"
		>
			<Box
				type="flex"
				flexDirection="col"
				className="space-y-4"
			>
				<h1>{errorCode.split("/")[1]}</h1>
				<h2>{errorMessage}</h2>
				{
					errorCode === fourZeroOneRoute && (
						<>
							<h2>Click a link below to Sign in</h2>
							<Link
								to={authRoute}
								className="color-darkLumina four-zero-link"
							>
								Sign In
							</Link>
						</>
					)
				}
				{
					(errorCode === fourZeroThreeRoute || errorCode === fourZeroFourErrorCode) && (
						<>
							<h2>Click the link below to return Home</h2>
							<Link
								to={homeRoute}
								className="color-darkLumina four-zero-link"
							>
								Return Home
							</Link>
						</>
					)
				}
			</Box>
		</Page>
	)
}

export default FourZero