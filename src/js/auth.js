const storage = window.localStorage;

function seedData() {
  const defaultUsers = [
    { id: 1, name: 'Administrador', username: 'admin', role: 'admin', password: 'admin' },
    { id: 2, name: 'Docente', username: 'docente', role: 'docente', password: 'docente' },
    { id: 3, name: 'Estudiante', username: 'estudiante', role: 'estudiante', password: 'estudiante' }
  ];

  const defaultGrades = [
    { id: Date.now() + 1, studentId: 3, subject: 'Matemáticas', grade: 85, teacherId: 2, date: new Date().toISOString(), period: '1er Trimestre' },
    { id: Date.now() + 2, studentId: 3, subject: 'Español', grade: 90, teacherId: 2, date: new Date().toISOString(), period: '1er Trimestre' },
    { id: Date.now() + 3, studentId: 3, subject: 'Estudios Sociales', grade: 78, teacherId: 2, date: new Date().toISOString(), period: '1er Trimestre' }
  ];

  if (!storage.getItem('users')) storage.setItem('users', JSON.stringify(defaultUsers));
  if (!storage.getItem('posts')) storage.setItem('posts', JSON.stringify([]));
  if (!storage.getItem('grades')) storage.setItem('grades', JSON.stringify(defaultGrades));
}

function getUsers() {
  return JSON.parse(storage.getItem('users') || '[]');
}

function saveUsers(usersArray) {
  storage.setItem('users', JSON.stringify(usersArray));
}

function getSession() {
  return JSON.parse(storage.getItem('session') || 'null');
}

function setSession(user) {
  storage.setItem('session', JSON.stringify(user));
}

function clearSession() {
  storage.removeItem('session');
}

function login(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    setSession(user);
    return { ok: true, user };
  }
  return { ok: false };
}

function deleteUser(id) {
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
}

function addUser(userData) {
  const users = getUsers();
  const exists = users.find(u => u.username === userData.username);
  if(exists) return { ok: false, message: 'El usuario ya existe' };
  
  userData.id = Date.now();
  users.push(userData);
  saveUsers(users);
  return { ok: true };
}

seedData();

// Exposición pública de módulos
window.Auth = { getUsers, getSession, login, logout: clearSession, deleteUser, addUser };