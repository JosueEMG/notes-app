import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from './theme'

export const StyledLink = styled(Link)`
  text-decoration: ${colors.primary};
  color: #09f;
  ${props => props.variant === 'bold' ? 'font-weight: bold;' : ''}

  &:hover {
    border-bottom: 2px solid ${colors.primary};
  }
`