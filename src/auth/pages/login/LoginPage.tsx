import { NavLink } from 'react-router-dom'
import { AuthLayout } from '../../layout/AuthLayout'

import GoogleIcon from '../../../assets/images/google_icon.webp'

import './LoginPage.css'
import { useAuthStore } from '../../../hooks/useAuthStore'
import { useForm } from 'react-hook-form'
export const LoginPage = () => {

  const { startGoogleLogin, startLoginWithEmailPassword } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleGoogleLogin = () => startGoogleLogin()

  const handleLoginWithEmailPassword = (data: any) => {
    const { email, password } = data

    startLoginWithEmailPassword(email, password)

  }

  return (
    <AuthLayout>
      <section className="form-container">

        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(handleLoginWithEmailPassword)} className="form">

              <div className="inputBox">
                <input type="text"
                  {...register('email', {
                    required: 'The email is required',
                    maxLength: {
                      value: 50,
                      message: 'The email must be less than 50 characters'
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    },

                    value: 'emanuel.licona02@gmail.com'
                  })}
                />
                <i>Email Address</i>

                {errors.email && <p className='input-error'>{errors.email.message + ''}</p>}
              </div>

              <div className="inputBox">
                <input type="password"
                  {...register('password', {
                    required: 'The password is required',
                    minLength: {
                      value: 6,
                      message: 'The password must be at least 6 characters'
                    },

                    value: '12345678'
                  })}
                />
                <i>Password</i>

                {errors.password && <p className='input-error'>{errors.password.message + ''}</p>}
              </div>

              <div className="links">
                <NavLink className='nav' to="#">Forgot Password</NavLink>
                <NavLink className='' to="/auth/register">Sign up</NavLink>
              </div>

              <div className="inputBox">
                <input type="submit" value="Login" />
              </div>

              <div className='icons-container'>
                <img onClick={handleGoogleLogin} className='google-icon' src={GoogleIcon} alt="image of google" />
              </div>

            </form>
          </div>
        </div>
      </section>

    </AuthLayout>
  )
}
