import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Form onSubmit={onSubmit}>
          <div className="field">
            <Label name="email" errorClassName="error">
              Email
            </Label>
            <TextField
              name="email"
              errorClassName="rw-input rw-input-error"
              ref={emailRef}
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
            />

            <FieldError name="email" className="error-message" />
          </div>

          <div className="field">
            <Label name="password" errorClassName="error">
              Password
            </Label>
            <PasswordField
              name="password"
              errorClassName="rw-input rw-input-error"
              autoComplete="current-password"
              validation={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
              }}
            />

            <FieldError name="password" className="error-message" />
          </div>

          <Submit>Login</Submit>
        </Form>

        <div>
          <Link to={routes.forgotPassword()} className="rw-forgot-link">
            Forgot Password?
          </Link>
          *
          <Link to={routes.signup()} className="rw-link">
            Need an account?
          </Link>
        </div>
      </main>
    </>
  )
}

export default LoginPage
