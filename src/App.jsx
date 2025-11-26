import React, {useState, useEffect} from 'react'
import ScheduleForm from './components/ScheduleForm'
import AppointmentList from './components/AppointmentList'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

// Simple fallback storage using localStorage when Supabase is not configured
const storageKey = 'agendamento_local'

export default function App(){
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      if (supabase){
        const { data, error } = await supabase.from('appointments').select('*').order('exam_date', {ascending: true})
        if (error){
          console.error('Supabase error', error)
          // fallback
          const local = JSON.parse(localStorage.getItem(storageKey) || '[]')
          setAppointments(local)
        } else {
          setAppointments(data || [])
        }
      } else {
        const local = JSON.parse(localStorage.getItem(storageKey) || '[]')
        setAppointments(local)
      }
      setLoading(false)
    }
    load()
  },[])

  async function addAppointment(appt){
    if (supabase){
      const { data, error } = await supabase.from('appointments').insert([appt]).select().single()
      if (error){
        console.error('Supabase insert error', error)
        return false
      }
      setAppointments(prev => [...prev, data])
      return true
    } else {
      const local = JSON.parse(localStorage.getItem(storageKey) || '[]')
      local.push({...appt, id: Date.now()})
      localStorage.setItem(storageKey, JSON.stringify(local))
      setAppointments(local)
      return true
    }
  }

  async function removeAppointment(id){
    if (supabase){
      const { error } = await supabase.from('appointments').delete().eq('id', id)
      if (error) { console.error(error); return false }
      setAppointments(prev => prev.filter(a=>a.id !== id))
      return true
    } else {
      const local = JSON.parse(localStorage.getItem(storageKey) || '[]').filter(a=>a.id !== id)
      localStorage.setItem(storageKey, JSON.stringify(local))
      setAppointments(local)
      return true
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Agendamento de Provas — Protótipo</h1>
        <p>Use o formulário para agendar uma prova. Este protótipo funciona com Supabase (recomendado) ou localStorage como fallback.</p>
      </header>

      <main>
        <ScheduleForm onSubmit={addAppointment}/>
        <hr/>
        {loading ? <p>Carregando...</p> : <AppointmentList appointments={appointments} onDelete={removeAppointment}/>}
      </main>

      <footer>
        <small>Protótipo criado pelo grupo — Unifaa</small>
      </footer>
    </div>
  )
}
