import React from 'react'
import { fetch } from '../../../util/fetch'

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
    const response = await fetch('/.netlify/functions/health', {
      accessToken: this.props.accessToken,
      refresh: async () => {
        await this.refresh()
        return this.props.accessToken
      },
    })

    const body = await response.text()
    console.log(response.status, response.headers, body)
    this.setState({
      info: `status: ${ response.status }, body: ${ body }`,
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

  async refresh() {
    const error = await this.props.refresh()

    if (error) {
      this.setState({
        errors: [
          ...this.state.errors,
          error,
        ]
      })
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <>
        <h1>Log out</h1>

        <button onClick={ () => this.props.logout() }>Log out</button>
        <button onClick={ () => this.refresh() }>Ververs token</button>

        <hr/>
        <p>info:{ this.state.info }</p>
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
          <div>
            <label htmlFor="username">Username</label><br/>
            <input
              id="username"
              type="text"
              inputMode="email"
              autoFocus
              required
              value={ this.state.username }
              onChange={ this.onChange('username') }
            />
          </div>

          <div>
            <label htmlFor="password">Password</label><br/>
            <input
              id="password"
              type="password"
              required
              value={ this.state.password }
              onChange={ this.onChange('password') }
            />
          </div>

          <div>
            <label htmlFor="otp">OTP</label><br/>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              value={ this.state.otp }
              onChange={ this.onChange('otp') }
            />
          </div>

          <button>Submit</button>
        </form>

        <hr/>
        <p>info:{ this.state.info }</p>
        <button onClick={ () => this.test() }>Test</button>
      </>
    }
  }
}
