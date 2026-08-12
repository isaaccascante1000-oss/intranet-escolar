document.addEventListener('DOMContentLoaded',()=>{
  const loginSection = document.getElementById('loginSection')
  const dashboard = document.getElementById('dashboard')
  const welcome = document.getElementById('welcome')
  const sessionInfo = document.getElementById('sessionInfo')
  const logoutBtn = document.getElementById('logoutBtn')

  const userManagement = document.getElementById('userManagement')
  const usersTableBody = document.querySelector('#usersTable tbody')
  const addUserForm = document.getElementById('addUserForm')

  const gradesSection = document.getElementById('gradesSection')
  const gradeStudent = document.getElementById('gradeStudent')
  const addGradeForm = document.getElementById('addGradeForm')
  const gradesTableBody = document.querySelector('#gradesTable tbody')

  const studentGrades = document.getElementById('studentGrades')
  const myGradesTable = document.querySelector('#myGradesTable tbody')

  const boardSection = document.getElementById('boardSection')
  const postForm = document.getElementById('postForm')
  const postsList = document.getElementById('postsList')

  const loginForm = document.getElementById('loginForm')

  function showLogin(){loginSection.classList.remove('hidden');dashboard.classList.add('hidden')}
  function showDashboard(){loginSection.classList.add('hidden');dashboard.classList.remove('hidden')}

  function renderSession(){
    const session = Auth.getSession()
    if(!session) return showLogin()
    showDashboard()
    welcome.textContent = `Hola, ${session.name} (${session.role})`
    sessionInfo.textContent = `${session.username} — ${session.role}`
    userManagement.classList.toggle('hidden', session.role !== 'admin')
    gradesSection.classList.toggle('hidden', session.role === 'estudiante')
    studentGrades.classList.toggle('hidden', session.role !== 'estudiante')
    postForm.classList.toggle('hidden', !(session.role === 'admin' || session.role === 'docente'))
    renderUsers()
    renderGradeStudents()
    renderGrades()
    renderMyGrades()
    renderPosts()
  }

  loginForm.addEventListener('submit',e=>{
    e.preventDefault()
    const u = document.getElementById('username').value.trim()
    const p = document.getElementById('password').value
    const user = Auth.login(u,p)
    if(!user){alert('Credenciales incorrectas');return}
    renderSession()
  })

  logoutBtn.addEventListener('click',()=>{Auth.logout();renderSession()})

  function renderUsers(){
    const users = Auth.getUsers()
    usersTableBody.innerHTML=''
    users.forEach(u=>{
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${u.name}</td><td>${u.username}</td><td>${u.role}</td><td><button data-id="${u.id}" class="btn-edit">Editar</button> <button data-id="${u.id}" class="btn-del">Eliminar</button></td>`
      usersTableBody.appendChild(tr)
    })
  }

  addUserForm.addEventListener('submit',e=>{
    e.preventDefault()
    const users = Auth.getUsers()
    const id = Date.now()
    const user = {id,name:document.getElementById('newName').value,username:document.getElementById('newUsername').value,role:document.getElementById('newRole').value,password:document.getElementById('newPassword').value}
    users.push(user)
    Auth.saveUsers(users)
    addUserForm.reset()
    renderUsers()
    renderGradeStudents()
  })

  usersTableBody.addEventListener('click',e=>{
    if(e.target.classList.contains('btn-del')){
      const id = Number(e.target.dataset.id)
      const users = Auth.getUsers().filter(u=>u.id!==id)
      Auth.saveUsers(users)
      renderUsers()
      renderGradeStudents()
    }
  })

  function renderGradeStudents(){
    const users = Auth.getUsers().filter(u=>u.role==='estudiante')
    gradeStudent.innerHTML = ''
    users.forEach(s=>{
      const opt = document.createElement('option')
      opt.value = s.id
      opt.textContent = `${s.name} (${s.username})`
      gradeStudent.appendChild(opt)
    })
  }

  addGradeForm.addEventListener('submit',e=>{
    e.preventDefault()
    const grades = JSON.parse(localStorage.getItem('grades')||'[]')
    const session = Auth.getSession()
    const grade = {id:Date.now(),studentId:Number(gradeStudent.value),subject:document.getElementById('gradeSubject').value,grade:document.getElementById('gradeValue').value,teacherId:session.id,date:new Date().toISOString()}
    grades.push(grade)
    localStorage.setItem('grades',JSON.stringify(grades))
    addGradeForm.reset()
    renderGrades()
    renderMyGrades()
  })

  function renderGrades(){
    const grades = JSON.parse(localStorage.getItem('grades')||'[]')
    const users = Auth.getUsers()
    gradesTableBody.innerHTML = ''
    grades.forEach(g=>{
      const student = users.find(u=>u.id===g.studentId)
      const teacher = users.find(u=>u.id===g.teacherId)
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${student?student.name:'-'}</td><td>${g.subject}</td><td>${g.grade}</td><td>${teacher?teacher.name:'-'}</td><td>${new Date(g.date).toLocaleString()}</td>`
      gradesTableBody.appendChild(tr)
    })
  }

  function renderMyGrades(){
    const session = Auth.getSession()
    myGradesTable.innerHTML = ''
    if(!session || session.role !== 'estudiante') return
    const grades = JSON.parse(localStorage.getItem('grades')||'[]').filter(g=>g.studentId===session.id)
    const users = Auth.getUsers()
    grades.forEach(g=>{
      const teacher = users.find(u=>u.id===g.teacherId)
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${g.subject}</td><td>${g.grade}</td><td>${teacher?teacher.name:'-'}</td><td>${new Date(g.date).toLocaleDateString()}</td>`
      myGradesTable.appendChild(tr)
    })
  }

  postForm.addEventListener('submit',e=>{
    e.preventDefault()
    const posts = JSON.parse(localStorage.getItem('posts')||'[]')
    const session = Auth.getSession()
    const post = {id:Date.now(),title:document.getElementById('postTitle').value,content:document.getElementById('postContent').value,author:session.name,date:new Date().toISOString()}
    posts.unshift(post)
    localStorage.setItem('posts',JSON.stringify(posts))
    postForm.reset()
    renderPosts()
  })

  function renderPosts(){
    const posts = JSON.parse(localStorage.getItem('posts')||'[]')
    postsList.innerHTML = ''
    posts.forEach(p=>{
      const li = document.createElement('li')
      li.innerHTML = `<strong>${p.title}</strong> <div class="meta">${p.author} · ${new Date(p.date).toLocaleString()}</div><p>${p.content}</p>`
      postsList.appendChild(li)
    })
  }

  renderSession()
})
