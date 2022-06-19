import React, {useState} from 'react'
import classes from './ChatHeader.module.css'

function ChatHeader({username = null, isTyping = false, children}) {
  return <div className={classes.headerContainer}>{children}</div>
}

export function Options({children}) {
  const [toggle, setToggle] = useState(false)
  const [selected, setSelected] = useState(0)

  const options = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {selected, setSelected, value: index})
  })
  return (
    <div className={classes.dropdown}>
      <button onClick={() => setToggle(!toggle)}>...</button>
      <div className={`${toggle ? classes.options : classes.hide}`}>
        {toggle && options}
      </div>
    </div>
  )
}

export function Option({children, selected, setSelected, value}) {
  return (
    <div className={classes.option} onClick={() => setSelected(value)}>
      {children}
    </div>
  )
}

export function Avatar({image}) {
  const {url, desc} = image
  return (
    <div>
      <img className={classes.avatar} src={url} alt={desc} />
    </div>
  )
}

export function ChatInfo({children}) {
  return <div className={classes.chatInfo}>{children}</div>
}

export default ChatHeader
