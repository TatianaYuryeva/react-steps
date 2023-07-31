import {nanoid} from "nanoid"
import { useState } from "react";

export function TrainingRecords() {
  
  interface Training {
    date: string;
    distance: number;
    id: string
  }
  
  const trainingList: Training[] = []

  function sortTrainingList(trainingList: Training[]) {
    const sortedTrainingList = trainingList.sort((a, b): number => {

      return stringToDate(b.date) - stringToDate(a.date)
    })

    return sortedTrainingList
  } 


  function stringToDate(str: string): any {
    const date = str.split('.').reverse().map(el => Number(el))

    return new Date(date[0], date[1] - 1, date[2])
  }

  const [trainings, setTrainings] = useState(trainingList)
  const [newTrainingDate, setNewTrainingDate] = useState('')
  const [newTrainingDistance, setNewTrainingDistance] = useState('')

  const addTraining = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTrainings(prevTrainings => {
      const newTraining = {
        id: nanoid(),
        date: newTrainingDate,
        distance: Number(newTrainingDistance)
      }

      if (trainings.length > 0) {
        trainings.forEach(tr => {
          if (tr.date === newTrainingDate) {
            newTraining.distance = Number(newTrainingDistance) + tr.distance
            removeTraining(tr.id)

            return
          } 
        })
      }

      return [...prevTrainings, newTraining]     
    })
    
    setNewTrainingDistance('')
    setNewTrainingDate('')
    }

  const removeTraining = (id: string) => {
    setTrainings(prevTrainings => prevTrainings.filter(tr => tr.id !== id))
  }

  return (
    <>
      <form className="form" onSubmit={addTraining}>
        <div className="form-group">
          <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input 
          className="input" 
          id="date" name="date" 
          value={newTrainingDate} 
          onChange={e => setNewTrainingDate(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="km">Пройдено км</label>
          <input className="input" 
          id="km" 
          name="km" 
          value={newTrainingDistance}
          onChange={e => setNewTrainingDistance(e.target.value)}/>
        </div>   
        <button className="btn" type="submit">OK</button>
      </form>
      <div className="list-header">
        <span>Дата (ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <ul className="list">
        {sortTrainingList(trainings).map(training => (
          <li className="list_item" key={training.id}>
            <span>{training.date}</span><span>{training.distance}</span>
            <button className="btn btn-remove" onClick={() => removeTraining(training.id)}>X</button>
          </li>          
        ))}
      </ul>
    </>
    )
  }
