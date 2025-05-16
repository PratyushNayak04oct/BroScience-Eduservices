
const Button = ({ children, type, onClick, className }) => {
    return (
      <button 
        className = {`custom-button ${type === 'primary' ? 'primary' : 'secondary'} ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button; 