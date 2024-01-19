import React, { useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Select, { components } from 'react-select'
import axios from 'axios'

import { cloneDeep } from 'lodash'

import Button from 'components/button/button'

import './form.sass'

export default function form({
    formItems,
}) {
    const [formValues, setFormValues] = useState({
        'Preferred contact': 'Email'
    })
    const formValuesRef = useRef(formValues)
    formValuesRef.current = formValues

    const inputRefs = useRef([])

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const handleChange = (key, value) => {
        const _formValues = cloneDeep(formValuesRef.current)

        _formValues[key] = value

        setFormValues(_formValues)
    }

    let inputIncrementer = -1

    const CaretDownIcon = () => {
        return <i className="fa fa-caret-down"></i>
    }

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon />
            </components.DropdownIndicator>
        )
    }

    const handleSubmit = e => {
        e.preventDefault()

        const columnKeys = []

        formItems.formFields.rows.forEach(row => {
            row.columns.forEach(column => {
                columnKeys.push(column.label)
            })
        })

        let error = null

        columnKeys.some(key => {
            if(!formValuesRef.current[key]){
                error = true
                return true
            }
        })

        if(error){
            setResponse({
                type: 'error',
                message: `One or more fields are missing.`
            })

            return setTimeout(() => {
                setResponse(null)
            },3000)
        }

        setIsLoading(true)

        const json = JSON.stringify(formValuesRef.current)
        setIsLoading(true)
        
        delete axios.defaults.headers.common['Authorization']

        const formData = new FormData()
        formData.append('action', 'form')
        formData.append('data', json)
        formData.append('title', formItems.title)

        doWordPressRequest(formData, response => {
            const { data } = response

            if (data === 'success') {
                setResponse({
                    type: 'success',
                    message: `Thanks for that! We've received your submission.`
                })
            }
            setIsLoading(false)
            setFormValues({})
            
        })

        setResponse({
            type: 'success',
            message: `Thanks for that! We've received your submission.`
        })

        setTimeout(() => {
            setFormValues({})
            setIsLoading(false)
        },1000)
    }

    const doWordPressRequest = (data, callback) => {
        const tempToken = axios.defaults.headers.common['Authorization']
        delete axios.defaults.headers.common['Authorization']
    
        axios({
            method: 'POST',
            url: `https://supercloud.yourcreative.com.au/wp-admin/admin-ajax.php`,
            data,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }).then(callback)

        if (tempToken) {
            axios.defaults.headers.common['Authorization'] = tempToken
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <ul className={'rows'}>
                <div className={`cover-loader ${isLoading ? 'loading' : ''}`}>
                    {formItems && formItems.formFields.rows.map(({ columns }, index) => {
                        return (
                            <li key={index} className={`row columns-${columns.length}`}>
                                { columns.map((column, columnIndex) => {
                                    const {
                                        label,
                                        options,
                                        type
                                    } = column
                                    
                                    let _placeholder = ''

                                    switch (label) {
                                        case 'First Name':
                                            _placeholder = 'Jane'
                                            break;
                                        case 'Last Name':
                                            _placeholder = 'Doe'
                                            break;

                                        case 'Email':
                                            _placeholder = 'example@email.com.au'
                                            break;

                                        case 'Subject':
                                            _placeholder = 'Please select'
                                            break;

                                        case 'Message':
                                            _placeholder = ''
                                            break;
                                    
                                        default:
                                            break;
                                    }

                                    let component = null

                                    switch (type) {
                                        case 'text':
                                        case 'email':
                                            component = (
                                                <>

                                                    <label>{label.toUpperCase()}</label>
                                                    <input
                                                        type={type}
                                                        placeholder={_placeholder}
                                                        value={formValues[label] || ''}
                                                        onChange={e => handleChange(label, e.target.value)}
                                                        ref={ref => {
                                                            inputIncrementer++
                                                            inputRefs.current[inputIncrementer] = ref
                                                        }}
                                                    />
                                                </>
                                            )
                                            break
                                        case 'textarea':
                                            component = (
                                                <>
                                                    <label>{label.toUpperCase()}</label>
                                                    <TextareaAutosize
                                                        placeholder={_placeholder}
                                                        value={formValues[label] || ''}
                                                        onChange={e => handleChange(label, e.target.value)}
                                                    />
                                                </>
                                            )
                                            break

                                        case 'select':

                                            const _opt = options.split(/\n/).filter(Boolean).map(option => option.trim())
                                            let selectOptions = []

                                            _opt.map(items => {
                                                selectOptions.push({
                                                    value: items.replace(' ', '-'),
                                                    label: items            
                                                })
                                            })

                                            component = (
                                                <>
                                                    <label>{label.toUpperCase()}</label>
                                                    <Select
                                                        options={selectOptions}
                                                        onChange={value => handleChange(label, value)}
                                                        className='react-select-container'
                                                        classNamePrefix='react-select'
                                                        placeholder={_placeholder}
                                                        
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: 'transparent',
                                                            primary: 'transparent',
                                                            },
                                                        })}
                                                        components={{ DropdownIndicator }}
                                                        instanceId={'99'}
                                                    />
                                                </>
                                            )
                                            break

                                        case 'radio':
                                            const _options = options.split(/\n/).filter(Boolean).map(option => option.trim())

                                            component = (
                                                <div className={'radios'}>
                                                    <span dangerouslySetInnerHTML={{ __html: label + ':' }} />
                                                    <div className={'options'}>
                                                        {_options.map((option, optionIndex) => {
                                                            return (
                                                                <label key={optionIndex}>
                                                                    <input
                                                                        type={'radio'}
                                                                        name={label}
                                                                        checked={formValues[label] === option}
                                                                        onChange={() => handleChange(label, option)}
                                                                    />
                                                                    <span>
                                                                        {option}
                                                                    </span>
                                                                </label>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                            break
                                    }

                                    return (
                                        <div key={columnIndex}>
                                            { component}
                                        </div>
                                    )
                                })}

                            </li>
                        )
                    })}
                </div>
            </ul>
            <div className={'bottom-row'}>
                <div className={`validate-response ${response ? 'visible' : ''}`}>
                    {response &&
                        <>
                            <i className={`fe fe-${ response.type === 'success' ? 'check' : 'x' }`} />
                            <span>
                                { response.message }
                            </span>
                        </>
                    }
                </div>
                <Button
                    title={formItems && formItems.formFields.buttonLabel}
                    inverted
                    border
                    noArrow
                />
            </div>
        </form>
    )
}
