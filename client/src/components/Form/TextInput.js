import {forwardRef} from 'react'
import classes from './TextInput.module.css'

const TextInput = forwardRef(({onEnter}, ref) => {
  return (
    <textarea
      className={classes.messageInput}
      name="message"
      rows={2}
      onKeyDown={onEnter}
      ref={ref}
    ></textarea>
  )
})

export default TextInput
