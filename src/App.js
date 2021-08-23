import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [data, setData] = useState([
    { title: 'loading', img: 'loading', breed: 'loading' },
  ])
  const [search, setSearch] = useState('')

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
        <select>
          {data
            .filter((el, ind) => {
              data.indexOf(el) === ind
            })
            .map((dog) => {
              return <option key={dog.breed}>{dog.breed}</option>
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
              <h3>Порода</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((dog) => dog.title.includes(search))
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
