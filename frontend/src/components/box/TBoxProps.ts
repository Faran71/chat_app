import { CSSProperties, ReactNode } from "react";
import {
	TBoxType,
	TBoxDirection,
	TAlignItems,
	TJustifyContent,
	TJustifyItems,
	TAlignContent
} from "../../models/types";

interface IBaseBox {
	children: ReactNode
	flexDirection?: TBoxDirection
	justifyContent?: TJustifyContent
	alignItems?: TAlignItems
	spacing?: boolean
	className?: string
	styles?: CSSProperties
}

interface IFlexBox {
	type: Extract<TBoxType, "flex">
}

interface IGridBox {
	type: Extract<TBoxType, "grid">
	cols: number
	rows: number
	justifyItems?: TJustifyItems
	alignContent?: TAlignContent
}

export type TBoxProps = IBaseBox & (IFlexBox | IGridBox)