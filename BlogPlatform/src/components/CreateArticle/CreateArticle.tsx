import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCreateAnArticleMutation, useGetAnArticleQuery, useUpdateAnArticleMutation } from '../../Api/blogApi'
import { ArticleForm } from '../type'

const CreateArticle: React.FC = () => {
  const [tags, setTags] = useState([''])
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams<{ slug: string }>()
  const isEditing = location.pathname.includes('/edit')

  const addTagField = () => {
    setTags([...tags, ''])
  }
  const removeTagField = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  const [createArticle, { data, isError: isCreateError, isSuccess: isCreateSuccess }] = useCreateAnArticleMutation()
  const [updateAnArticle, { isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateAnArticleMutation()
  const { data: articleData } = useGetAnArticleQuery(slug)

  const initialData =
    isEditing && articleData
      ? {
          title: articleData.article.title,
          description: articleData.article.description,
          body: articleData.article.body,
          tagList: articleData.article.tagList || [],
        }
      : {
          title: '',
          description: '',
          body: '',
          tagList: [],
        }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ArticleForm>({ defaultValues: initialData })

  const newArticleSlug = data?.article?.slug

  const onSubmit = (data: ArticleForm) => {
    const { title, description, body } = data
    if (isEditing) {
      updateAnArticle({
        slug,
        title,
        description,
        body,
        tagList: tags,
      })
    }
    if (!isEditing) {
      createArticle({
        title,
        description,
        body,
        tagList: tags,
      })
    }
  }

  useEffect(() => {
    if (isEditing && articleData) {
      setTags(articleData.article.tagList || [''])
    }
  }, [isEditing, articleData])

  useEffect(() => {
    if (isCreateSuccess) {
      navigate('/successful-message', {
        state: { from: 'new-article', articleSlug: newArticleSlug },
      })
    }
    if (isUpdateSuccess) {
      navigate('/successful-message', {
        state: { from: 'update-article', articleSlug: slug },
      })
    }
  }, [isCreateSuccess, isUpdateSuccess, slug, navigate, newArticleSlug])

  useEffect(() => {
    if (isCreateError || isUpdateError) {
      navigate('/error-message')
    }
  }, [navigate, isCreateError, isUpdateError])

  return (
    <form
      style={{ width: 941, backgroundColor: '#fff', padding: '48px 32px', borderRadius: 6 }}
      className="container mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} className="mb-4">
        {isEditing ? 'Edit Article' : 'Create New Article'}
      </h2>

      <div className="mb-3" style={{ fontSize: 14 }}>
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          {...register('title', {
            required: 'Title is required',
          })}
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>

      <div className="mb-3" style={{ fontSize: 14 }}>
        <label className="form-label">Short description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Text"
          {...register('description', {
            required: 'Short description is required',
          })}
        />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>

      <div className="mb-3" style={{ fontSize: 14 }}>
        <label className="form-label">Text</label>
        <textarea
          style={{ height: 168 }}
          className="form-control"
          placeholder="Text"
          {...register('body', {
            required: 'Text is required',
          })}
        />
        {errors.body && <p className="text-danger">{errors.body.message}</p>}
      </div>

      <div className="mb-3" style={{ fontSize: 14 }}>
        <label className="form-label">Tags</label>
        {tags.map((tag, index) => (
          <div key={index} className="input-group mb-2" style={{ gap: 17 }}>
            <input
              style={{ width: 300, marginRight: 17, borderRadius: 4 }}
              type="text"
              className="form-control"
              placeholder="Tag"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ borderRadius: 4, padding: '8px 36px' }}
              onClick={() => removeTagField(index)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ borderRadius: 4, padding: '8px 36px' }}
              onClick={addTagField}
            >
              Add Tag
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary col-8">
        Send
      </button>
    </form>
  )
}

export default CreateArticle
