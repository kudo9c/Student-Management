import { Alert, Box, Button, CircularProgress } from '@mui/material'
import { useAppSelector } from 'app/hooks'
import { InputField, RadioGroupField, SelectField } from 'components/FormFields'
import { selectCityOptions } from 'features/city/citySlice'
import { Student } from 'models'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export interface StudentFormProps {
    initialValues?: Student
    onSubmit?: (formValues: Student) => void 
}

const schema = yup.object({
    name: yup.string().required('Vui lòng nhập trường này'),
    age: yup.number().positive('Vui lòng nhập số từ 16-25').integer('Vui lòng nhập số từ 16-25').required('Vui lòng nhập trường này').typeError('Vui lòng nhập số hợp lệ').min(16,'Tối thiểu là 18').max(25,'Tối đa 25'),
    mark: yup.number().positive().max(10).required('Vui lòng nhập trường này').typeError('Vui lòng nhập số hợp lệ'),
    gender: yup.string().oneOf(['male','female']).required('Vui lòng nhập trường này'),
    city: yup.string().required('Vui lòng nhập trường này')
}).required();

export default function StudentForm({initialValues, onSubmit}: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions)
    const [error,setError] = useState<string>('')
    const {control,handleSubmit, formState:{isSubmitting}} = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })
    const handleFormSubmit = async (formValues: Student) => {
        try {
            setError('')
            await onSubmit?.(formValues)
        } catch (error) {
            const result = (error as Error).message
            setError(result)
        }
    }
    return (
        <Box maxWidth={350}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Form fields */}
                <InputField name='name' control={control} label="Full Name"/>
                <RadioGroupField name='gender' control={control} label="Gender" options={[
                    {label:'Male',value:'male'},
                    {label:'Female',value:'female'}
                ]}/>
                <InputField name='age' control={control} label="Age" type="number"/>
                <InputField name='mark' control={control} label="Mark" type="number"/>
                {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                    <SelectField name='city' control={control} label="City" options={cityOptions}/>
                )}
                {error && <Alert severity="error">{error}</Alert>}
                <Box mt={3}>
                    <Button type="submit" variant='contained' color="primary" disabled={isSubmitting}>{isSubmitting && <CircularProgress size={16} color="primary"/>}Save</Button>
                </Box>
            </form>
        </Box>
    )
}