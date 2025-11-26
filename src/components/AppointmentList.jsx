import React from 'react'

export default function AppointmentList({appointments, onDelete}){
  
  if (!appointments || appointments.length === 0) {
      return (
          <div className="appointment-list-container">
              <h2>Agendamentos</h2>
              <p className="no-appointments-message">Nenhum agendamento.</p>
          </div>
      )
  }
  
  return (
    <div className="appointment-list-container">
      <h2>Agendamentos</h2>
      
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Curso</th>
            <th>Data</th>
            <th>Notas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a=>(
            <tr key={a.id}>
              <td>{a.student_name}</td>
              <td>{a.course}</td>
              <td>{new Date(a.exam_date).toLocaleString('pt-BR')}</td> 
              <td>{a.notes || 'N/A'}</td>
              <td>
                <button 
                  onClick={()=>onDelete(a.id)}
                  className="remove-button"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}