

//  封装 websocket 使用
const ws = new WebSocket('ws://localhost:3000')
 
ws.onopen = () => {
  const data = {
    msg_id: '1',
    msg_type: 'test',
    content: {
      count: '10'
    }
  }
  const jsonString = JSON.stringify(data)
  ws.send(jsonString)
}
 
ws.onmessage = (event) => {
  const response = JSON.parse(event.data)
  console.log('Received message:', response)
}
 
ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}
 
function sendWebSocketRequest(data:any) {
  const jsonString = JSON.stringify(data)
  ws.send(jsonString)
}
 
export default {
  sendWebSocketRequest
}


/*
使用方法：
import { sendWebSocketRequest } from '@/api/websocket'
 
sendWebSocketRequest({
  msg_id: '1',
  msg_type: 'test',
  content: {
    count: '10'
  }
}).then(response => {
  console.log('Received response:', response)
}).catch(error => {
  console.error('WebSocket error:', error)
})
*/ 