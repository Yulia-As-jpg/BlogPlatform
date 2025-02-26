import defaultAvatar from '../assets/images/defaultAvatar.svg'

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = defaultAvatar
}

export default handleImageError
