import React, { useRef, useState } from 'react'
import axios from '../../axios';
import { Container } from '../../components/Container'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea';
import fileImage from '../../assets/images/image-file.svg'
import UploadImg from '../../assets/images/upload.svg'
import filePdf from '../../assets/images/pdf-file.svg'
import fileWord from '../../assets/images/word-file.svg'
import Close from '../../assets/images/close.svg'
import { ButtonGreen } from '../../components/ButtonGreen';

export const ContactsPage = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState();
  const inputFileRef = useRef(null);


  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const files = [...event.target.files];
      files.forEach(el => {
        formData.append('docs', el);
      })
      const { data } = await axios.post('/upload', formData);
      setImageUrl([...data.url, ...imageUrl]);

    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла')
    }
  };

  const dragStartHandler = (e) => {
    e.preventDefault()
  }
  const dragLeaveHandler = (e) => {
    e.preventDefault()
  }
  const onDropHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      const file = [...e.dataTransfer.files];
      file.forEach(el => {
        formData.append('docs', el);
      })

      const { data } = await axios.post('/upload', formData);
      setImageUrl([...data.url, ...imageUrl]);

    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла')
    }
  }

  const removeFile = (el) => {
    const filteredArr = imageUrl.filter(elem => elem !== el)
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
      files: imageUrl
    }
    if (title.trim() === '' || description.trim() === '') {
      setError('Заполните все поля помеченные звездочкой!')
      return
    }
    try {
      setError('')
      await axios.post('/service/support', field)
    } catch (error) {

    }
  }

  return (
    <Container >
      <div className='max-w-xl mx-auto'>
        <h3 className='text-xl font-bold mb-3'>Свяжиетсь с нами</h3>
        {error &&
          <p className='text-red-700'>{error}</p>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <h4 className='text-lg font-bold mb-1'>Тема сообщения
              <span className='text-red-700'> *</span>
            </h4>
            <Input
              maxLength="80"
              onChange={handleChangeTitle}
              value={title}
              placeholder="Введите тему" />
          </div>
          <div>
            <div className='mb-1'>
              <h4 className='text-lg font-bold '>Соообщение
                <span className='text-red-700'> *</span>
              </h4>
              <h5 className='text-[11px] text-textOpacity mb-1'>Максимум 350 символов</h5>
            </div>
            <Textarea
              maxLength='350'
              value={description}
              onChange={handleChangeText}
            />
          </div>
          <div className='mb-3'>
            <h4 className='text-lg font-bold '>Загрузите файлы</h4>
            <h5 className='text-[11px] text-textOpacity mb-1'>Только файлы с расширением .jpg, .jpeg, .png, .pdf, .doc, .docx</h5>
            <div
              className='w-full h-[126px] p-3 flex items-center justify-center border border-dashed rounded-xl bg-blackMenu hover:bg-background cursor-pointer'
              onClick={() => inputFileRef.current.click()}
              onDragStart={dragStartHandler}
              onDragLeave={dragLeaveHandler}
              onDragOver={dragStartHandler}
              onDrop={onDropHandler}
            >
              <div className='flex flex-col items-center'>
                <img src={UploadImg} className="w-8" alt="" />
                <p className='text-textOpacity text-xs mt-2'><span className='text-mainGreen'>Выберите файл</span> или перетащите его сюда</p>
              </div>
              <Input hidden={true} multiple={true} ref={inputFileRef} onChange={handleChangeFile} type="file" accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" />
            </div>
          </div>
          <div className='mb-3'>
            {imageUrl.map(el => <div key={el} className='flex gap-3 items-center justify-between mb-2 bg-blackMenu p-3 rounded-xl'>
              <div className='flex items-center gap-3'>
                {el.includes('.jpg') || el.includes('.jpeg') || el.includes('.png')
                  ? <img src={fileImage} className="w-8 h-8" alt="" />
                  : el.includes('.pdf')
                    ? <img src={filePdf} className="w-8 h-8" alt="" />
                    : <img src={fileWord} className="w-8 h-8" alt="" />}
                <h3>{el.replace('/uploads/', '').length > 50 ? `${el.replace('/uploads/', '').substring(0, 50)}...` : el.replace('/uploads/', '')}</h3>
              </div>
              <img src={Close} onClick={() => removeFile(el)} className="w-6 h-6 cursor-pointer" alt="remove" />
            </div>)}
          </div>
          <div className='flex justify-center'>
            <ButtonGreen title="Отправить" type="submit" />
          </div>
        </form>
      </div>
    </Container>
  )
}
