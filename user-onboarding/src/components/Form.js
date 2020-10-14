import React from 'react';

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Add a User</h2>

            <button disabled={disabled}>Submit</button>

            <div>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.terms}</div>
            </div>

            <div>
                <label>
                    Name 
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label>
                    Email 
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>

                <label>
                    Password 
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>

                <label>
                    Terms and Conditions
                    <input
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={onChange}
                    />
                </label>
            </div>
        </form>
    )
}