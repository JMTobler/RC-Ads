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
    <form className="schedule-form-container" onSubmit={handleSubmit}>
      <h2>Agendar Prova</h2>

      <div className="form-fields-grid">
        
        <div className="form-group">
          <label htmlFor="student-name">Nome do Aluno</label>
          <input 
            id="student-name"
            value={student} 
            onChange={e=>setStudent(e.target.value)} 
            placeholder="Nome completo"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="course-name">Curso</label>
          <input 
            id="course-name"
            value={course} 
            onChange={e=>setCourse(e.target.value)} 
            placeholder="Curso"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="exam-date">Data da Prova</label>
          <input 
            id="exam-date"
            type="datetime-local" 
            value={examDate} 
            onChange={e=>setExamDate(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Observações</label>
          <textarea 
            id="notes"
            value={notes} 
            onChange={e=>setNotes(e.target.value)} 
            rows="3"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Agendar'}
        </button>
      </div>

      {msg && <p className="msg">{msg}</p>}
    </form>
  )
}