import React, { useRef, useState } from 'react'
import axios from '../../axios'
import { Container } from '../../components/Container'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import fileImage from '../../assets/images/image-file.svg'
import UploadImg from '../../assets/images/upload.svg'
import filePdf from '../../assets/images/pdf-file.svg'
import fileWord from '../../assets/images/word-file.svg'
import Close from '../../assets/images/close.svg'
import { ButtonGreen } from '../../components/ButtonGreen'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userIsAuth } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { MainLoading } from '../../components/MainLoading'
import { PopupWindow } from '../../components/PopupWindow'

export const ContactsPage = () => {
  const [imageUrl, setImageUrl] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputFileRef = useRef(null)
  const [isPopup, setIsPopup] = useState(false)
  const isAuth = useSelector(userIsAuth)
  const navigate = useNavigate()

  const handleChangeFile = async (event) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      const files = [...event.target.files]
      files.forEach((el) => {
        formData.append('docs', el)
      })
      const { data } = await axios.post('/upload', formData)
      setImageUrl([...data.url, ...imageUrl])
    } catch (err) {
      console.warn(err)
      alert('Ошибка при загрузке файла')
    } finally {
      setIsLoading(false)
    }
  }

  const dragStartHandler = (e) => {
    e.preventDefault()
  }
  const dragLeaveHandler = (e) => {
    e.preventDefault()
  }
  const onDropHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      const file = [...e.dataTransfer.files]
      file.forEach((el) => {
        formData.append('docs', el)
      })

      const { data } = await axios.post('/upload', formData)
      setImageUrl([...data.url, ...imageUrl])
    } catch (err) {
      console.warn(err)
      alert('Ошибка при загрузке файла')
    } finally {
      setIsLoading(false)
    }
  }

  const removeFile = (el) => {
    const filteredArr = imageUrl.filter((elem) => elem !== el)
    setImageUrl(filteredArr)
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
    setError('')
  }
  const handleChangeText = (e) => {
    setDescription(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const field = {
      title,
      description,
      files: imageUrl,
    }
    if (title.trim() === '' || description.trim() === '') {
      setError('Заполните все поля помеченные звездочкой!')
      return
    }
    setIsLoading(true)
    try {
      setError('')
      const { data } = await axios.post('/service/support', field)
      setIsPopup(true)
      setTitle('')
      setDescription('')
      setImageUrl([])
    } catch (error) {
      setError('Не удалось отправить сообщение')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token') && !isAuth) {
      navigate('/', { replace: true })
    }
  }, [])

  const togglePopup = () => {
    setIsPopup(false)
  }

  return (
    <Container>
      {isPopup && (
        <PopupWindow
          onClose={togglePopup}
          text={'Сообщение успешно отправлено'}
        />
      )}

      <div className='max-w-xl mx-auto'>
        <h3 className='text-xl font-bold mb-3'>Свяжиетсь с нами</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <h4 className='text-lg font-bold mb-1'>
              Тема сообщения
              <span className='text-red-700'> *</span>
            </h4>
            <Input
              maxLength='80'
              onChange={handleChangeTitle}
              value={title}
              placeholder='Введите тему'
            />
          </div>
          <div>
            <div className='mb-1'>
              <h4 className='text-lg font-bold '>
                Соообщение
                <span className='text-red-700'> *</span>
              </h4>
              <h5 className='text-[11px] text-textOpacity dark:text-black dark:text-opacity-75 mb-1'>
                Максимум 350 символов
              </h5>
            </div>
            <Textarea
              maxLength='350'
              value={description}
              onChange={handleChangeText}
            />
          </div>
          <div className='mb-3'>
            <h4 className='text-lg font-bold '>Загрузите файлы</h4>
            <h5 className='text-[11px] text-textOpacity dark:text-black dark:text-opacity-75 mb-1'>
              Только файлы с расширением .jpg, .jpeg, .png, .pdf, .doc, .docx
            </h5>
            <div
              className='w-full h-[126px] p-3 flex items-center justify-center border border-dashed rounded-xl bg-blackMenu hover:bg-background dark:bg-bggBottom dark:hover:bg-bggTop transition-colors cursor-pointer'
              onClick={() => inputFileRef.current.click()}
              onDragStart={dragStartHandler}
              onDragLeave={dragLeaveHandler}
              onDragOver={dragStartHandler}
              onDrop={onDropHandler}
            >
              <div className='flex flex-col items-center'>
                <img
                  src={UploadImg}
                  className='w-8 dark:bg-darkBlack dark:rounded-md'
                  alt=''
                />
                <p className='text-textOpacity dark:text-darkBlack text-xs mt-2'>
                  <span className='text-mainGreen dark:text-darkBlack dark:underline mr-2'>
                    Выберите файл
                  </span>
                  или перетащите его сюда
                </p>
              </div>
              <Input
                hidden={true}
                multiple={true}
                ref={inputFileRef}
                onChange={handleChangeFile}
                type='file'
                accept='.jpg, .jpeg, .png, .pdf, .doc, .docx'
              />
            </div>
          </div>
          <div className='mb-3'>
            {imageUrl.map((el) => (
              <div
                key={el}
                className='flex gap-3 items-center justify-between mb-2 bg-blackMenu p-3 rounded-xl'
              >
                <div className='flex items-center gap-3'>
                  {el.includes('.jpg') ||
                  el.includes('.jpeg') ||
                  el.includes('.png') ? (
                    <img src={fileImage} className='w-8 h-8' alt='' />
                  ) : el.includes('.pdf') ? (
                    <img src={filePdf} className='w-8 h-8' alt='' />
                  ) : (
                    <img src={fileWord} className='w-8 h-8' alt='' />
                  )}
                  <h3>
                    {el.replace('/uploads/', '').length > 50
                      ? `${el.replace('/uploads/', '').substring(0, 50)}...`
                      : el.replace('/uploads/', '')}
                  </h3>
                </div>
                <img
                  src={Close}
                  onClick={() => removeFile(el)}
                  className='w-6 h-6 cursor-pointer'
                  alt='remove'
                />
              </div>
            ))}
          </div>

          {error && <p className='text-red-700 text-center p-2'>{error}</p>}

          <div className='flex justify-center'>
            <div className='flex gap-3 items-center'>
              <ButtonGreen
                disabled={!isLoading}
                title='Отправить'
                type='submit'
              />
              {isLoading && <MainLoading size={20} />}
            </div>
          </div>
        </form>
      </div>
    </Container>
  )
}
