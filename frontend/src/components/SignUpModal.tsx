import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { SignUpCreditials } from '../network/notes.api'
import * as NotesApi from '../network/notes.api'
import { Modal, Form, Button, Alert } from "react-bootstrap"
import TextInputField from './form/TextInputField'
import styleUtils from '../styles/utils.module.css'
import { ConflictError } from '../errors/http_errors'

interface SignUpModalProps {
    onDismiss: () => void,
    onSignupSuccessful: (user: User) => void
}

export default function SignUpModal({ onDismiss, onSignupSuccessful }: SignUpModalProps) {
    const [errorText, setErrorText] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCreditials>()

    async function onSubmit(credentials: SignUpCreditials) {
        try {
            const newUser = await NotesApi.signUp(credentials)
            onSignupSuccessful(newUser)
        } catch (error) {
            if(error instanceof ConflictError){
                setErrorText(error.message)
            }else{
                alert(error)
            }
            console.log(error);

        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText && 
                <Alert variant='danger'>
                   {errorText}
                </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label='Username'
                        type='text'
                        placeholder='Username'
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label='Email'
                        type='email'
                        placeholder='email'
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label='Password'
                        type='password'
                        placeholder='password'
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>

                </Form>
            </Modal.Body>

        </Modal>

    )
}
