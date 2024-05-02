'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { GenerateQrService } from '../generate-qr-service/generate-qr.service'
import styles from './page.module.css'

export default function Home() {
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const linkRef = React.useRef(null)

  const handleClick = () => {
    if (!url || !url.trim()) {
      return
    }

    GenerateQrService.generate(url)
      .then((imageUrl) => {
        if (!imageUrl) {
          return
        }

        setImage(imageUrl)
      })
      .catch((err) => console.log(err))
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key !== 'Enter') {
      return
    }

    if (event.ctrlKey || event.metaKey) {
      const link = linkRef?.current as HTMLElement | null
      link?.click()
    }

    handleClick()
  }

  return (
    <div className={styles.container}>
      {image ? (
        <Image
          width={300}
          height={300}
          className={styles.image}
          src={image}
          alt={`generated qr code for ${url}`}
        />
      ) : (
        <div className={styles.emptyImage}></div>
      )}
      <input
        autoFocus
        placeholder="Enter your link"
        className={styles.input}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className={styles.actionContainer}>
        <button className={styles.button} onClick={handleClick}>
          Generate
        </button>

        {image && (
          <a
            ref={linkRef}
            className={styles.downloadLink}
            href={image}
            download="qr"
            title="You can use Ctrl+Enter for download">
            Download
          </a>
        )}
      </div>
    </div>
  )
}
