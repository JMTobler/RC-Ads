import React, {useState} from 'react'

export default function ScheduleForm({onSubmit}){
  const [student, setStudent] = useState('')
  const [course, setCourse] = useState('')
  const [examDate, setExamDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    if (!student || !course || !examDate){
      setMsg('Preencha nome, curso e data da prova.')
      setLoading(false)
      return
    }
    const appt = {
      student_name: student,
      course,
      exam_date: examDate,
      notes
    }
    const ok = await onSubmit(appt)
    if (ok){
      setMsg('Agendamento criado com sucesso.')
      setStudent(''); setCourse(''); setExamDate(''); setNotes('')
    } else {
      setMsg('Erro ao salvar. Veja o console.')
    }
    setLoading(false)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Agendar Prova</h2>
      <label>Nome do Aluno
        <input value={student} onChange={e=>setStudent(e.target.value)} placeholder="Nome completo"/>
      </label>
      <label>Curso
        <input value={course} onChange={e=>setCourse(e.target.value)} placeholder="Curso"/>
      </label>
      <label>Data da Prova
        <input type="datetime-local" value={examDate} onChange={e=>setExamDate(e.target.value)}/>
      </label>
      <label>Observações
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows="3"/>
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Agendar'}</button>
      {msg && <p className="msg">{msg}</p>}
    </form>
  )
}
