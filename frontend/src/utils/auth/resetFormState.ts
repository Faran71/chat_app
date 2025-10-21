import { Dispatch, SetStateAction } from "react"

const resetFormState = (
    setEmail: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>,
    setPassword?: Dispatch<SetStateAction<string>>,
    setFirstName?: Dispatch<SetStateAction<string>>,
    setLastName?: Dispatch<SetStateAction<string>>,
    setConfirmPassword?: Dispatch<SetStateAction<string>>
) => {
    setEmail("")
    setLoading(false)
    setError("")
    setPassword && setPassword("")
    setConfirmPassword && setConfirmPassword("")
    setFirstName && setFirstName("")
    setLastName && setLastName("")
}

export default resetFormState