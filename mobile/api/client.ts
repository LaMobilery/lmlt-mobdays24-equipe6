import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer sk-proj-U8OsqvJcY0a8s21EJ1HVT3BlbkFJDzP7Q0OhhGnj50GDwu0X',
}

export const axiosInstance = axios.create({
  headers: headers,
})
