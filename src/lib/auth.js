export async function login(email, password) {
  try {
    const response = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      return { success: false, message: 'Credenciales incorrectas' }
    }

    const data = await response.json()

    return data
  } catch (err) {
    return { success: false, message: 'Error al conectar con la API' }
  }
}
