// import socket from 'socket.io-client';

// let socketInstance = null;

// export const initializeSocket = (projectId) => {

//     socketInstance = socket(import.meta.env.VITE_API_URL, {
//         auth: {
//             token: localStorage.getItem('token')
//         },
//        query:{
//         projectId
//        }
        
//     });
//     return socketInstance;
// }


// export const receiveMessage = (eventName, cb) => {
//     socketInstance.on(eventName, cb);
// }

// export const sendMessage = (eventName, data) => {
//     socketInstance.emit(eventName, data);
// }

import { io } from 'socket.io-client';

let socket;

export const initializeSocket = (projectId) => {
    if (!socket) {
        socket = io(import.meta.env.VITE_API_URL, {
            query: { projectId },
            auth: { token: localStorage.getItem("token") }
        });
    }
};

export const sendMessage = (event, data) => {
    if (socket) socket.emit(event, data);
};

export const receiveMessage = (event, callback) => {
    if (socket) socket.on(event, callback);
};

export default socket;
