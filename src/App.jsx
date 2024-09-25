import { useState } from 'react'
import Header from './components/Header'
import emailData from './data/emails'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails, setEmail] = useState(emailData)
  const [toggled, setToggled] = useState('Inbox')
  const [removeRead, setRemoveRead] = useState(false)

  const getEmails = () => {
    if(toggled === 'Inbox'){
      if(removeRead){
        let emailList = emails.filter( (e) => !e.read)
        return emailList
      }
      return emails
    }else if (toggled === 'Starred'){
      if(removeRead){
        let emailList = emails.filter( (e) => e.starred && !e.read)
        return emailList
      }
      let emailList = emails.filter( (e) => e.starred)
      return emailList
    }
    return []
    
  }
  const countStarred = () => {
    if(removeRead){
      let emailList = emails.filter( (e) => e.starred && !e.read)
      return emailList.length
    }
    let emailList = emails.filter( (e) => e.starred)
    return emailList.length
  }
  const countInbox = () => {
    if(removeRead){
      let emailList = emails.filter( (e) => !e.read)
      return emailList.length
    }
    return emails.length
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={toggled === 'Inbox'? "item active" : "item"}
            onClick={() => {setToggled('Inbox')}}
          >
            <span className="label">Inbox</span>
            <span className="count">{countInbox()}</span>
          </li>
          <li
            className={toggled === 'Starred'? "item active" : "item"}
            onClick={() => {setToggled('Starred')}}
          >
            <span className="label">Starred</span>
            <span className="count">{countStarred()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={removeRead}
              onChange={() => {setRemoveRead(!removeRead)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{getEmails().map(
        (object) => 
          <li className={object.read ? "email read" : "email unread"} key = {object.id}>
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked = {object.read}
                onChange={ () => {
                  object.read = !object.read
                  setEmail([...emails])
                }}
                />
                
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked = {object.starred}
                onChange={() => {
                  object.starred = !object.starred
                  setEmail([...emails])
                }}
              />
            </div>
            <div className="sender">
              {object.sender}
            </div>
            <div className="title">
              {object.title}
            </div>
          </li>
      )}</main>
    </div>
  )
}

export default App
