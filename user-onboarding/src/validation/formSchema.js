import * as yup from 'yup';

export default yup.object().shape({
    name: yup 
        .string()
        .required('name is required'),
    email: yup  
        .string()
        .email('must be a valid email address')
        .required('email is required'),
    password: yup   
        .string()
        .required('password is required'),
    terms: yup.boolean().oneOf([true], 'Terms must be accepted'),
})