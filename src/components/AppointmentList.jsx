import React from 'react'

export default function AppointmentList({appointments, onDelete}){
  if (!appointments || appointments.length === 0) return <p>Nenhum agendamento.</p>
  return (
    <div>
      <h2>Agendamentos</h2>
      <table className="table">
        <thead>
          <tr><th>Aluno</th><th>Curso</th><th>Data</th><th>Notas</th><th></th></tr>
        </thead>
        <tbody>
          {appointments.map(a=>(
            <tr key={a.id}>
              <td>{a.student_name}</td>
              <td>{a.course}</td>
              <td>{new Date(a.exam_date).toLocaleString()}</td>
              <td>{a.notes}</td>
              <td><button onClick={()=>onDelete(a.id)}>Remover</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
