import axios from 'axios'

// const API_URL = 'https://web-money-backend.onrender.com'
const API_URL = 'https://web-money-backend.vercel.app'
// const API_URL = 'http://localhost:8000/'

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(
          `${API_URL}/auth/refresh/${localStorage.getItem('refresh')}`,
          { withCredentials: true }
        )
        localStorage.setItem('token', response.data.accessToken)
        return instance.request(originalRequest)
      } catch (e) {
        console.log('Не авторизован')
      }
    }
    throw error
  }
)

export default instance
