import React, { useState, useEffect } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { AuthNotificationProps } from '../components/type'

const AuthNotification: React.FC<AuthNotificationProps> = ({ onClose }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={handleClose} show={show} delay={3000} autohide>
        <Toast.Header>
          <i className="bi bi-person-fill-lock" style={{ fontSize: '30px', color: '#b97c40' }}></i>
          <strong className="me-auto" style={{ fontSize: '15px', padding: '0 10px' }}>
            Authorization Required
          </strong>
        </Toast.Header>
        <Toast.Body>Please sign up or log in to like articles.</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default AuthNotification
