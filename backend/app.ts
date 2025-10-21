import express from "express"
import helmet from "helmet"
import cors from "cors"
import { authRouter, testingRouter } from "./routers"
import { allowedOrigins } from "./constants/arrays"

const app = express()

// allow requests from specified domains with credentials (jwt sent in cookie)
app.use(cors({
	origin: (origin, callback) => {
		// allow same-domain requests, otherwise check from allowed domains
		if (!origin || allowedOrigins.find(curr => curr === origin)) {
			callback(null, origin);
		} else {
			callback(
				new Error("Blocked by CORS - Cannot accept requests from this IP address")
			);
		}
	},
	credentials: true
}))

// adding Security HTTP Headers to req and res
app.use(helmet())

// convert request body to JSON
app.use(express.json())

app.use("/auth", authRouter)
app.use("/testing", testingRouter)

// protected routes that require authentication
// app.use("/someRoute", protect, someRouter)

export default app