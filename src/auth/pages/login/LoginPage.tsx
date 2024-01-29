
export const LoginPage = () => {
  return (
    <div>
      <form className='form'>
        <h1>Login</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
        </div>
      
      </form>
    </div>
  )
}
