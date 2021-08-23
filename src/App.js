import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [data, setData] = useState([
    { title: 'loading', img: 'loading', breed: 'loading' },
  ])
  const [search, setSearch] = useState('')
  const [breed, setBreed] = useState('All')

  useEffect(() => {
    fetch('https://dogs-api-kandratsyeu.herokuapp.com')
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setData(res)
      })
  }, [data])

  return (
    <>
      <p>
        <label>Выбрать породу:</label>
        <select
          onChange={(e) => {
            setBreed(e.target.value)
          }}
        >
          <option value="All">Все</option>
          {data
            .map((dog) => {
              return dog.breed
            })
            .filter((breed, index, arr) => {
              return arr.indexOf(breed) === index
            })
            .map((breed, ind) => {
              return (
                <option value={breed} key={ind}>
                  {breed}
                </option>
              )
            })}
        </select>
        <label>
          Поиск по заголовку:{' '}
          <input onChange={(e) => setSearch(e.target.value)}></input>
        </label>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>
              <h3>Заголовок</h3>
            </th>
            <th>
              <h3>Картинка</h3>
            </th>
            <th>
              <h3>Порода{breed}</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((dog) =>
              breed === 'All'
                ? dog.title.includes(search)
                : dog.title.includes(search) && dog.breed === breed
            )
            .map((dog, index) => {
              return (
                <tr key={index}>
                  <th>{dog.title}</th>
                  <th>
                    <img src={dog.img} />
                  </th>
                  <th>{dog.breed}</th>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default App
