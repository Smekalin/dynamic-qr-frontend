'use client'

import {useState} from 'react'
import styles from './page.module.css'

export default function Home() {
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('https://www.google.com/')

  const handleClick = () => {
    fetch(`http://localhost:8080/api/v1/generator/create?url=${url}`)
      .then((res) => res.blob())
      .then((res) => {
        const imageUrl = URL.createObjectURL(res)
        setImage(imageUrl)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.container}>
      {image ? (
        <img
          className={styles.image}
          src={image}
          alt={`generated qr code for ${url}`}
        />
      ) : (
        <div className={styles.emptyImage}></div>
      )}
      <input
        className={styles.input}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className={styles.button} onClick={handleClick}>
        Generate
      </button>
    </div>
  )
}
