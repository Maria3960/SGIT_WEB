import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()
  
  const navigateTo = (page) => {
    navigate(`/${page}`)
  }
  
  return { navigateTo }
}