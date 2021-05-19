import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const onClick = () =>{
        console.log('clicked')

    }

    return (
     <div className='header'>
         <h1> {title}</h1>
        <Button 
         color={showAdd ? 'red' : 'green'}
         text={showAdd ? 'Close' : 'Add'}
         onClick={onAdd}/>
     </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
  }
  
Header.propTypes = {
    title: PropTypes.string.isRequired,
  }

export default Header
