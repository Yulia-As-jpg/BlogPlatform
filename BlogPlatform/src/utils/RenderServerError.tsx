import React from 'react'
import { serverError } from './serverError'

const RenderServerError: React.FC = () => {
  const isError = true
  const isAuthError = true
  const errorMessage = 'Authentication failed. Please check your credentials.'

  try {
    const errorElement = serverError(isError, isAuthError, errorMessage)
    return <div className="container mt-5">{errorElement}</div>
  } catch (error) {
    console.error('Error rendering server error:', error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          An unexpected error occurred. Please try again later.
        </div>
      </div>
    )
  }
}

export default RenderServerError
