import React from 'react'
import { LikeButtonProps } from '../components/type'

const LikeButton: React.FC<LikeButtonProps> = ({ onClick, disabled = false, isLiked }) => {
  const handleLikeClick = () => {
    if (disabled) {
      onClick()
      return
    }
    onClick()
  }

  return (
    <button
      className="btn"
      onClick={handleLikeClick}
      style={{ backgroundColor: 'transparent', border: 'none', padding: '0px' }}
    >
      <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}`} style={{ fontSize: '16px' }}></i>
    </button>
  )
}

export default LikeButton
