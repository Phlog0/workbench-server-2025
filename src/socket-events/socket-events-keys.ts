export const SOCKET_EVENTS = {
  // наверно это убрать, так как есть set_user_id
  USER_SYSTEM_CONNECT: "userSystemConnect",
  USER_SYSTEM_LOGOUT: "userSystemLogout",
  BROADCAST_SYSTEM_ONLINE_COUNT: "onlineCount",
  GET_ONLINE_COUNT: "getOnlineCount",

  // при входе и регистрации (при попадании в меню короче)
  SET_USER_ID: "setUserId",

  // Отдельный проект
  JOIN_ROOM: "joinRoom",
  LEAVE_ROOM: "leaveRoom",
  PROJECT_USER_ONLINE_COUNT: "projectUserOnlineCount",
};
