import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginCreditials } from '../network/notes.api'
import { User } from '../models/user'
import * as NotesApi from '../network/notes.api'
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import TextInputField from './form/TextInputField'
import styleUtils from '../styles/utils.module.css'
import { UnauthorizedError } from '../errors/http_errors'


interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void
}

export default function LoginModal({ onDismiss, onLoginSuccessful }: LoginModalProps) {
    const [errorText, setErrorText] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCreditials>()

    async function onSubmit(credentials: LoginCreditials) {
        try {
            const user = await NotesApi.login(credentials)
            onLoginSuccessful(user)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            console.log(error);

        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
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
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
