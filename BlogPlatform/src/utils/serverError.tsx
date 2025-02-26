import React from 'react'

export const serverError = (isError: boolean, isAuthError: boolean, ...errorMessage: string[]): React.ReactNode => {
  if (isError && isAuthError) {
    return (
      <div className="alert alert-danger" role="alert" style={{ marginTop: '-10px', marginBottom: '5px' }}>
        {errorMessage}
      </div>
    )
  } else if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error occurred. Please try again later.
      </div>
    )
  }
  return null
}
