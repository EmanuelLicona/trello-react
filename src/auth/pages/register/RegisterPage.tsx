import { NavLink } from 'react-router-dom'
import { AuthLayout } from '../../layout/AuthLayout'

import './RegisterPage.css'
import { useForm } from 'react-hook-form'
// import { useState } from 'react'

//  TODO DELETE
// import { faker } from '@faker-js/faker'
import { useAuthStore } from '../../../hooks/useAuthStore'


export const RegisterPage = () => {


  const { startCreateUserWithEmailPassword } = useAuthStore()

  // const [userfaker] = useState({
  //   name: faker.person.fullName(),
  //   email: faker.internet.email(),
  //   password: '12345678',
  //   confirmPassword: '1234567'
  // })




  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const handleRegister = (data: any) => {
    const { name, email, password, confirmPassword } = data

    if (password !== confirmPassword) return
    startCreateUserWithEmailPassword(email, password, name)
  }

  return (
    <AuthLayout>

      <section className="form-container">

        <div className="signin">
          <div className="content">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(handleRegister)} className="form">

              <div className="inputBox">
                <input type="text"
                  {...register('name', {
                    required: 'The full name is required',
                    minLength: {
                      value: 3,
                      message: 'The full name must be at least 3 characters'
                    },
                    maxLength: {
                      value: 20,
                      message: 'The full name must be less than 20 characters'
                    },

                    // value: userfaker.name
                  })}
                />
                <i>Full name</i>

                {errors.name && <p className='input-error'>{errors.name.message + ''}</p>}
              </div>

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


                    // value: userfaker.email
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

                    // value: userfaker.password
                  })}
                />
                <i>Password</i>

                {errors.password && <p className='input-error'>{errors.password.message + ''}</p>}
              </div>

              <div className="inputBox">
                <input type="password"
                  {...register('confirmPassword', {
                    required: 'The confirm password is required',
                    minLength: {
                      value: 6,
                      message: 'The confirm password must be at least 6 characters'
                    },
                    validate: (value) => value === watch('password') || 'The passwords do not match',

                    // value: userfaker.password

                  })}
                />
                <i>Confirm Password</i>

                {errors.confirmPassword && <p className='input-error'>{errors.confirmPassword.message + ''}</p>}
              </div>

              <div className="links">
                <NavLink className='nav' to="#">Forgot Password</NavLink>
                <NavLink className='' to="/auth/login">Sign in</NavLink>
              </div>

              <div className="inputBox">
                <input type="submit" value="Register" />
              </div>

            </form>
          </div>
        </div>
      </section>

    </AuthLayout>
  )
}
