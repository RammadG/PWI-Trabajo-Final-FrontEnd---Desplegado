import { useState } from "react"

const useForm = (form_fields) => {
    const [form_state, setFormState] = useState(form_fields)

    const handleChange = (event) => {

        const field_name = event.target.name
        const field_value = event.target.value
        
        setFormState(
            (prev_form_state) => {
                return {...prev_form_state, [field_name]: field_value}
            }
        )

    }

    return {
        form_state,
        handleChange
    }
}

export default useForm