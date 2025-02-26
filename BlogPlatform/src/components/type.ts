export interface User {
  username: string
  email: string
  token: string
  image?: string
}

export interface UserState {
  user: User
}

export interface RootState {
  user: UserState
}

export interface User {
  username: string
  image?: string
  email: string
  password?: string
}

// export interface UserState {
//   user: {
//     username: string
//     image?: string
//     email: string
//   }
// }

export interface RootState {
  user: UserState
}

export interface ArticleProps {
  slug: string
  title: string
  description: string
  tagList: string[]
  updatedAt: string
  image?: string
  favoritesCount: number
  author: {
    username: string
    image: string
  }
  favorited: boolean
}

export interface FetchBaseQueryError {
  status: number
  data: unknown
}

export interface ArticleForm {
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface SignInForm {
  email: string
  password: string
}

export interface SignUpForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  checkbox: boolean
}

export interface BaseQueryError {
  status: number
  data: {
    errors: {
      username?: string
      email?: string
    }
  }
}

export type MessageKeys = 'profile' | 'sign-up' | 'sign-in' | 'new-article' | 'update-article' | 'article-delete'

// export interface UserState {
//   user: {
//     username: string
//     image?: string
//   }
// }

export interface UserProfileForm {
  username: string
  email: string
  password: string
  avatar: string
}

export interface AuthNotificationProps {
  onClose: () => void
}

export interface LikeButtonProps {
  onClick: () => void
  disabled?: boolean
  isLiked: boolean
}
