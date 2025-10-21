import {
	Context as AppContext,
	createContext,
} from 'react'
import { IContextStateProps } from './IContextStateProps'

const Context: AppContext<
	IContextStateProps | null
> = createContext<IContextStateProps | null>(null)

export default Context