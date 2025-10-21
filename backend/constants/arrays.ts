import {
	frontendDevelopmentDomain,
	frontendLocalDomain,
	frontendLocalServeDomain,
	frontendProductionDomain
} from "@lumina/shared/constants/strings";

export const allowedOrigins: string[] = [
	frontendLocalDomain,
	frontendLocalServeDomain,
	frontendDevelopmentDomain,
	frontendProductionDomain,
	"127.0.0.1",
	"http://localhost",
	"localhost"
]