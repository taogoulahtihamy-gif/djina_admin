import {
  getAccessToken,
} from './tokenStorage'


const DEFAULT_API_URL =
  'http://127.0.0.1:8000'


function getApiBaseUrl() {
  return (
    import.meta.env
      .VITE_API_BASE_URL ||

    import.meta.env
      .VITE_API_URL ||

    DEFAULT_API_URL
  )
}


function getWebSocketBaseUrl() {
  const apiUrl =
    getApiBaseUrl()

  try {
    const url =
      new URL(apiUrl)

    const protocol =
      url.protocol ===
      'https:'
        ? 'wss:'
        : 'ws:'

    return `${protocol}//${url.host}`
  } catch {
    return (
      'ws://127.0.0.1:8000'
    )
  }
}


export function connectAdminRealtime({
  onEvent,
  onConnected,
  onDisconnected,
} = {}) {
  let socket = null

  let reconnectTimer =
    null

  let stopped = false

  let reconnectAttempt =
    0


  const scheduleReconnect =
    () => {
      if (stopped) {
        return
      }

      reconnectAttempt += 1

      const delay =
        Math.min(
          1000 *
            2 **
              Math.min(
                reconnectAttempt,
                5,
              ),
          30_000,
        )

      reconnectTimer =
        window.setTimeout(
          connect,
          delay,
        )
    }


  const connect = () => {
    if (stopped) {
      return
    }

    const accessToken =
      getAccessToken()

    if (!accessToken) {
      scheduleReconnect()
      return
    }

    const websocketBaseUrl =
      getWebSocketBaseUrl()

    const websocketUrl =
      `${websocketBaseUrl}` +
      `/ws/admin/realtime/` +
      `?token=${encodeURIComponent(
        accessToken,
      )}`

    socket =
      new WebSocket(
        websocketUrl,
      )


    socket.onopen = () => {
      reconnectAttempt = 0

      onConnected?.()
    }


    socket.onmessage = (
      event,
    ) => {
      try {
        const data =
          JSON.parse(
            event.data,
          )

        if (
          data.type ===
          'admin_event'
        ) {
          onEvent?.(
            data,
          )
        }
      } catch (error) {
        console.error(
          'Realtime message error:',
          error,
        )
      }
    }


    socket.onerror = (
      error,
    ) => {
      console.error(
        'Realtime WebSocket error:',
        error,
      )
    }


    socket.onclose = () => {
      onDisconnected?.()

      socket = null

      scheduleReconnect()
    }
  }


  connect()


  return () => {
    stopped = true

    if (reconnectTimer) {
      window.clearTimeout(
        reconnectTimer,
      )
    }

    if (
      socket &&
      (
        socket.readyState ===
          WebSocket.OPEN ||

        socket.readyState ===
          WebSocket.CONNECTING
      )
    ) {
      socket.close(
        1000,
        'Client disconnected',
      )
    }

    socket = null
  }
}