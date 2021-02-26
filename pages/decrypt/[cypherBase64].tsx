import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { decrypt } from '../../lib/crypto'
import { getKeyFromRouter } from '../../lib/key'
import { useRouter } from 'next/router'


const IndexPage = () => {
  const router = useRouter()
  const { cypherBase64 } = router.query
  const [plainText, setPlainText] = useState<string>("")
  const [key, setKey] = useState<string>("") //23456ytrew56
  const [error, setError] = useState<string>("")


  useEffect(() => {
    const key = getKeyFromRouter(router)
    setKey(key)
  }, [router])

  useEffect(() => {
    // decrypt on change
    if (!key) return setError("Please enter your password")
    if (typeof cypherBase64 === "string") {
      setError("")
      try {
        const plain = decrypt(cypherBase64, key)
        if (!plain) throw new Error("Something went wrong while decrypting")
        setPlainText(plain)
      } catch (e) {
        setError("Looks like your password is wrong")
      }

    }
  }, [key, cypherBase64])

  return (
    <Layout title="Crypto string">
      <h1>Crypto string - decrypt</h1>

      <h2>Password</h2>
      <input type="text" placeholder="Enter your password" value={key} onChange={(e) => setKey(e.target.value)} />
      {error ? <p>{error}</p> : (
        <>
          <hr />
          <h2>Your secret Message</h2>
          <p>{plainText}</p>
        </>
      )}
    </Layout>
  )
}

export default IndexPage
