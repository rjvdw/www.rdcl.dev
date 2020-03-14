import React from 'react'
import { axios } from '../../../axios'

export class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      otp: '',
      errors: [],
      info: null,
    }
  }

  async test() {
    const response = await axios.get('/health', {
      validateStatus: () => true,
    })

    console.log(response.status, response.headers, response.data)
    this.setState({
      info: `status: ${ response.status }, body: ${ JSON.stringify(response.data, null, 2) }`,
    })
  }

  async onSubmit(event) {
    event.preventDefault()
    this.setState({ errors: [] })

    const error = await this.props.login(
      this.state.username,
      this.state.password,
      this.state.otp,
    )

    if (error) {
      this.setState({
        errors: [
          ...this.state.errors,
          error,
        ]
      })
    }
  }

  onChange(field) {
    return (event) => {
      this.setState({ [field]: event.target.value })
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <>
        <h1>Log out</h1>

        <button onClick={ () => this.props.logout() }>Log out</button>

        <hr/>
        <pre>{ this.state.info }</pre>
        <button onClick={ () => this.test() }>Test</button>
      </>
    } else {
      return <>
        <h1>Log in</h1>

        { this.state.errors.length > 0 ? <>
          <h2>Fout!</h2>

          <ul>
            { this.state.errors.map((err, idx) => (
              <li key={ idx }>{ err }</li>
            )) }
          </ul>
        </> : '' }

        <form onSubmit={ event => this.onSubmit(event) }>
          <rdcl-input-grid>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              inputMode="email"
              autoFocus
              required
              value={ this.state.username }
              onChange={ this.onChange('username') }
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={ this.state.password }
              onChange={ this.onChange('password') }
            />

            <label htmlFor="otp">OTP</label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              value={ this.state.otp }
              onChange={ this.onChange('otp') }
            />
          </rdcl-input-grid>

          <button>Submit</button>
        </form>

        <hr/>
        <pre>{ this.state.info }</pre>
        <button onClick={ () => this.test() }>Test</button>
      </>
    }
  }
}
