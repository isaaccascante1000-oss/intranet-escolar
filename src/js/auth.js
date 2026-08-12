const storage = window.localStorage
function seedData(){
  if(!storage.getItem('users')){
    const users = [
      {id:1,name:'Administrador',username:'admin',role:'admin',password:'admin'},
      {id:2,name:'Profesor Ejemplo',username:'docente',role:'docente',password:'docente'},
      {id:3,name:'Alumno Ejemplo',username:'estudiante',role:'estudiante',password:'estudiante'}
    ]
    storage.setItem('users',JSON.stringify(users))
  }
  if(!storage.getItem('posts')) storage.setItem('posts',JSON.stringify([]))
  if(!storage.getItem('grades')) storage.setItem('grades',JSON.stringify([]))
}
function getUsers(){return JSON.parse(storage.getItem('users')||'[]')}
function saveUsers(u){storage.setItem('users',JSON.stringify(u))}
function getSession(){return JSON.parse(storage.getItem('session')||'null')}
function setSession(user){storage.setItem('session',JSON.stringify(user))}
function clearSession(){storage.removeItem('session')}
function login(username,password){
  const user = getUsers().find(u=>u.username===username && u.password===password)
  if(user){setSession(user);return user}
  return null
}
function logout(){clearSession()}
seedData()
window.Auth = {getUsers,saveUsers,getSession,setSession,clearSession,login,logout}
