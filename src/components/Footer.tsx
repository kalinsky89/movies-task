import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer data-testid="footer">
      <span>Copyright &copy; {currentYear}</span>
    </footer>
  )
}

export default Footer