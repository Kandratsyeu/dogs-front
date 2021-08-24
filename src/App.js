import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

const App = () => {
  const [data, setData] = useState([
    { title: 'loading', img: 'loading', breed: 'loading' },
  ])
  const [search, setSearch] = useState('')
  const [breed, setBreed] = useState('')
  const history = useHistory()

  function historyChange(value) {
    history.push(`/${value}`, value)
  }

  useEffect(() => {
    fetch(
      'https://dogs-api-kandratsyeu.herokuapp.com' +
        (history.location.state ? `/${history.location.state}` : '')
    )
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setData(res)
      })
  })

  return (
    <>
      <p>
        {!history.location.state ? (
          <>
            <label>Выбрать породу:</label>
            <select
              onChange={(e) => {
                historyChange(e.target.value)
              }}
            >
              <option value="">Все</option>
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
          </>
        ) : (
          <>
            <button
              onClick={() => {
                history.goBack()
              }}
            >
              Назад
            </button>
          </>
        )}
        <label>
          Поиск по заголовку:{' '}
          <input onChange={(e) => setSearch(e.target.value)}></input>
        </label>
      </p>
      <Switch>
        <Route path={'/' + (history.location.state || '')}>
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
                .filter((dog) =>
                  !history.location.state
                    ? dog.title.includes(search)
                    : dog.title.includes(search) &&
                      dog.breed === history.location.state
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
        </Route>
      </Switch>
    </>
  )
}

export default App
