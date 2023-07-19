import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer data-testid="footer" className="w-full py-5 mt-5 bg-primary text-white">
      <span>Copyright &copy; {currentYear}</span>
    </footer>
  )
}

export default Footer
