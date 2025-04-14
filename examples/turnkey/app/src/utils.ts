export function generateGoogleUrl(nonce: string) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    throw new Error('Google client ID not found')
  }

  const redirectUri = encodeURIComponent('http://localhost:5173')
  const scope = encodeURIComponent('openid profile email')
  const responseType = 'code'

  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&nonce=${nonce}`
}

export async function exchangeCodeForIdToken(code: string): Promise<string> {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Google client credentials not found')
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: 'http://localhost:5173',
      grant_type: 'authorization_code',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      `Failed to exchange code for token: ${
        data.error_description || data.error
      }`,
    )
  }

  return data.id_token
}
