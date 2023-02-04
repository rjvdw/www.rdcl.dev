import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'

type SingleErrorProps = {
  error?: string
}

type MultipleErrorsProps = {
  errors: string[]
}

type ErrorProps = (SingleErrorProps | MultipleErrorsProps) &
  HTMLAttributes<HTMLDivElement>

export const Error: FunctionComponent<ErrorProps> = (props) => {
  if (hasMultipleErrors(props) && props.errors.length > 0) {
    if (props.errors.length === 1) {
      const { errors, ...rest } = props
      return <SingleError error={errors[0]} {...rest} />
    }

    return <MultipleErrors {...props} />
  }

  if (hasSingleError(props) && props.error !== undefined) {
    return <SingleError {...props} />
  }

  return null
}

const SingleError: FunctionComponent<
  SingleErrorProps & HTMLAttributes<HTMLDivElement>
> = ({ error, children, ...rest }) => (
  <Wrapper {...rest}>
    <p>
      {children ? <>{children}: </> : null}
      {error}
    </p>
  </Wrapper>
)

const MultipleErrors: FunctionComponent<
  MultipleErrorsProps & HTMLAttributes<HTMLDivElement>
> = ({ errors, children, ...rest }) => (
  <Wrapper {...rest}>
    {children ? <p>{children}:</p> : null}
    <ul>
      {errors.map((err, i) => (
        <li key={i}>{err}</li>
      ))}
    </ul>
  </Wrapper>
)

const Wrapper: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div className={classNames('error-message', className)} {...rest}>
    {children}
  </div>
)

function hasMultipleErrors(props: ErrorProps): props is MultipleErrorsProps {
  return Array.isArray((props as MultipleErrorsProps).errors)
}

function hasSingleError(props: ErrorProps): props is SingleErrorProps {
  return !hasMultipleErrors(props)
}
