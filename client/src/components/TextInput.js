import classes from './TextInput.module.css'

function TextInput({value, onChange, onEnter}) {
  return (
    <textarea
      className={classes.messageInput}
      name="message"
      rows={2}
      value={value}
      onKeyDown={onEnter}
      onChange={onChange}
    ></textarea>
  )
}

export default TextInput
