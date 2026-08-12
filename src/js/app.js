document.addEventListener('DOMContentLoaded',()=>{
  const UI = {
    init(){
      this.cache()
      this.bind()
      this.renderSession()
    },
    cache(){
      this.loginSection = document.getElementById('loginSection')
      this.dashboard = document.getElementById('dashboard')
      this.sessionInfo = document.getElementById('sessionInfo')
      this.logoutBtn = document.getElementById('logoutBtn')

      this.userManagement = document.getElementById('userManagement')
      this.usersTableBody = document.querySelector('#usersTable tbody')
      this.addUserForm = document.getElementById('addUserForm')

      this.gradesSection = document.getElementById('gradesSection')
      this.gradeStudent = document.getElementById('gradeStudent')
      this.addGradeForm = document.getElementById('addGradeForm')
      this.gradesTableBody = document.querySelector('#gradesTable tbody')

      this.studentGrades = document.getElementById('studentGrades')
      this.myGradesTable = document.querySelector('#myGradesTable tbody')

      this.boardSection = document.getElementById('boardSection')
      this.postForm = document.getElementById('postForm')
      this.postsList = document.getElementById('postsList')

      this.loginForm = document.getElementById('loginForm')
      this.navBtns = Array.from(document.querySelectorAll('.nav-btn'))
      this.countUsers = document.getElementById('countUsers')
      this.countStudents = document.getElementById('countStudents')
      this.countPosts = document.getElementById('countPosts')
      this.toastContainer = document.getElementById('toastContainer')
      this.studentAverage = document.getElementById('studentAverage')
    },
    bind(){
      this.loginForm.addEventListener('submit',e=>this.handleLogin(e))
      this.logoutBtn.addEventListener('click',()=>{Auth.logout();this.renderSession();this.showToast('Sesión cerrada','info')})
      this.addUserForm.addEventListener('submit',e=>this.handleAddUser(e))
      this.usersTableBody.addEventListener('click',e=>this.handleUsersTableClick(e))
      this.addGradeForm.addEventListener('submit',e=>this.handleAddGrade(e))
      this.postForm.addEventListener('submit',e=>this.handlePost(e))
      this.navBtns.forEach(btn=>btn.addEventListener('click',e=>this.handleNav(e)))
    },
    handleNav(e){
      this.navBtns.forEach(b=>b.classList.remove('active'))
      e.currentTarget.classList.add('active')
      const target = e.currentTarget.dataset.target
      // show corresponding subpanel
      const panels = ['userManagement','gradesSection','studentGrades','boardSection','dashboard']
      panels.forEach(id=>{
        const el = document.getElementById(id)
        if(el) el.classList.toggle('hidden', id !== target)
      })
    },
    renderSession(){
      const session = Auth.getSession()
      if(!session){
        this.showLogin();
        return
      }
      this.showDashboard()
      this.sessionInfo.textContent = `${session.username} — ${session.role}`
      this.logoutBtn.classList.remove('hidden')
      this.userManagement.classList.toggle('hidden', session.role !== 'admin')
      this.gradesSection.classList.toggle('hidden', session.role === 'estudiante')
      this.studentGrades.classList.toggle('hidden', session.role !== 'estudiante')
      this.postForm.classList.toggle('hidden', !(session.role === 'admin' || session.role === 'docente'))
      this.refreshAll()
    },
    showLogin(){this.loginSection.classList.remove('hidden');this.dashboard.classList.add('hidden');this.logoutBtn.classList.add('hidden')},
    showDashboard(){this.loginSection.classList.add('hidden');this.dashboard.classList.remove('hidden')},
    handleLogin(e){
      e.preventDefault()
      const u = document.getElementById('username').value.trim()
      const p = document.getElementById('password').value
      const res = Auth.login(u,p)
      if(!res.ok){this.showToast('Credenciales incorrectas','error');return}
      this.showToast('Bienvenido ' + res.user.name,'success')
      this.renderSession()
    },
    handleAddUser(e){
      e.preventDefault()
      const name = document.getElementById('newName').value.trim()
      const username = document.getElementById('newUsername').value.trim()
      const role = document.getElementById('newRole').value
      const password = document.getElementById('newPassword').value
      if(!name||!username||!password){this.showToast('Completa todos los campos','error');return}
      if(password.length<4){this.showToast('La contraseña debe tener al menos 4 caracteres','error');return}
      const res = Auth.addUser({name,username,role,password})
      if(!res.ok){this.showToast(res.message,'error');return}
      this.addUserForm.reset()
      this.showToast('Usuario agregado','success')
      this.refreshAll()
    },
    handleUsersTableClick(e){
      if(e.target.classList.contains('btn-del')){
        const id = Number(e.target.dataset.id)
        Auth.deleteUser(id)
        this.showToast('Usuario eliminado','info')
        this.refreshAll()
      }
    },
    handleAddGrade(e){
      e.preventDefault()
      const students = Auth.getUsers().filter(u=>u.role==='estudiante')
      if(students.length===0){this.showToast('No hay alumnos disponibles','error');return}
      const studentId = Number(this.gradeStudent.value)
      const subject = document.getElementById('gradeSubject').value.trim()
      const value = document.getElementById('gradeValue').value.trim()
      const period = document.getElementById('gradePeriod')?.value || 'Periodo'
      if(!subject||!value){this.showToast('Completa asignatura y nota','error');return}
      const n = Number(value)
      if(Number.isNaN(n) || n<0 || n>100){this.showToast('La nota debe ser un número entre 0 y 100','error');return}
      const grades = JSON.parse(localStorage.getItem('grades')||'[]')
      const session = Auth.getSession()
      const grade = {id:Date.now(),studentId,subject,grade:n,teacherId:session.id,date:new Date().toISOString(),period}
      grades.push(grade)
      localStorage.setItem('grades',JSON.stringify(grades))
      this.addGradeForm.reset()
      this.showToast('Calificación registrada','success')
      this.refreshAll()
    },
    handlePost(e){
      e.preventDefault()
      const title = document.getElementById('postTitle').value.trim()
      const content = document.getElementById('postContent').value.trim()
      if(!title||!content){this.showToast('Título y contenido requeridos','error');return}
      const posts = JSON.parse(localStorage.getItem('posts')||'[]')
      const session = Auth.getSession()
      const post = {id:Date.now(),title,content,author:session.name,date:new Date().toISOString()}
      posts.unshift(post)
      localStorage.setItem('posts',JSON.stringify(posts))
      this.postForm.reset()
      this.showToast('Comunicado publicado','success')
      this.refreshAll()
    },
    refreshAll(){
      this.renderUsers()
      this.renderGradeStudents()
      this.renderGrades()
      this.renderMyGrades()
      this.renderPosts()
      this.updateCounters()
    },
    renderUsers(){
      const users = Auth.getUsers()
      this.usersTableBody.innerHTML=''
      users.forEach(u=>{
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${u.name}</td><td>${u.username}</td><td><span class="badge ${u.role}">${u.role}</span></td><td><button data-id="${u.id}" class="btn-del">Eliminar</button></td>`
        this.usersTableBody.appendChild(tr)
      })
    },
    renderGradeStudents(){
      const users = Auth.getUsers().filter(u=>u.role==='estudiante')
      this.gradeStudent.innerHTML = ''
      users.forEach(s=>{
        const opt = document.createElement('option')
        opt.value = s.id
        opt.textContent = `${s.name} (${s.username})`
        this.gradeStudent.appendChild(opt)
      })
    },
    renderGrades(){
      const grades = JSON.parse(localStorage.getItem('grades')||'[]')
      const users = Auth.getUsers()
      this.gradesTableBody.innerHTML = ''
      grades.forEach(g=>{
        const student = users.find(u=>u.id===g.studentId)
        const teacher = users.find(u=>u.id===g.teacherId)
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${student?student.name:'-'}</td><td>${g.subject}</td><td>${g.grade}</td><td>${g.period||'-'}</td><td>${teacher?teacher.name:'-'}</td><td>${new Date(g.date).toLocaleString()}</td>`
        this.gradesTableBody.appendChild(tr)
      })
    },
    renderMyGrades(){
      const session = Auth.getSession()
      this.myGradesTable.innerHTML = ''
      if(!session || session.role !== 'estudiante') return
      const grades = JSON.parse(localStorage.getItem('grades')||'[]').filter(g=>g.studentId===session.id)
      const users = Auth.getUsers()
      if(grades.length===0){
        this.studentAverage.textContent = '-' 
        return
      }
      let sum = 0
      grades.forEach(g=>{
        sum += Number(g.grade)
        const teacher = users.find(u=>u.id===g.teacherId)
        const status = Number(g.grade) >= 70 ? `<span class="status pass">Aprobado</span>` : `<span class="status fail">Reprobado</span>`
        const tr = document.createElement('tr')
        tr.innerHTML = `<td>${g.subject}</td><td>${g.grade}</td><td>${g.period||'-'}</td><td>${status}</td><td>${teacher?teacher.name:'-'}</td><td>${new Date(g.date).toLocaleDateString()}</td>`
        this.myGradesTable.appendChild(tr)
      })
      const avg = sum/grades.length
      this.studentAverage.textContent = `${avg.toFixed(1)} %`
    },
    renderPosts(){
      const posts = JSON.parse(localStorage.getItem('posts')||'[]')
      this.postsList.innerHTML = ''
      posts.forEach(p=>{
        const li = document.createElement('li')
        li.innerHTML = `<strong>${p.title}</strong> <div class="meta">${p.author} · ${new Date(p.date).toLocaleString()}</div><p>${p.content}</p>`
        this.postsList.appendChild(li)
      })
    },
    updateCounters(){
      const users = Auth.getUsers()
      const students = users.filter(u=>u.role==='estudiante')
      const posts = JSON.parse(localStorage.getItem('posts')||'[]')
      this.countUsers.textContent = users.length
      this.countStudents.textContent = students.length
      this.countPosts.textContent = posts.length
    },
    showToast(message,type='info',timeout=3500){
      const el = document.createElement('div')
      el.className = `toast ${type}`
      el.textContent = message
      // ensure starting state
      el.style.opacity = '0'
      el.style.transform = 'translateY(-6px)'
      this.toastContainer.appendChild(el)
      // trigger entrance (matching CSS animation/transition)
      requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='none'})
      // hide after timeout with fade-out, then remove
      setTimeout(()=>{
        el.style.opacity = '0'
        el.style.transform = 'translateY(-6px)'
        setTimeout(()=>{ if(el && el.parentNode) el.parentNode.removeChild(el) }, 320)
      }, timeout)
    }
  }

  UI.init()
})
