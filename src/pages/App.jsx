import ReactDatePicker from 'react-datepicker';
import { Button } from '../components/Button';
import { Chart } from '../components/Chart';
import { useEffect, useState } from 'react'
import { LoginContext } from '../Auth';
import axios from 'axios';
import './App.css'

function App() {
  
  const { token, authenticate }   = LoginContext(); // get state of token from localStorage
  const [validDate, setValidDate] = useState(new Date().setFullYear(2021, 2));
  const [data, setData] = useState();
  const [file, setFile] = useState();
  const validate        = localStorage.getItem('token');

  // in csv file data consisted only two values for year , so in ecma script by default it counted
  // them 1921 so i manually fomratted date to 2021 as a work around .

  function upload() {
    if (!file) {
      return alert('Your file is empty');
    }

    const data = new FormData();
    data.append('csvFile', file);

    axios.post('http://localhost:8000/file/upload', 
    data, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${validate}` } }
    )
      .then(res => {
        if (res.status == 200) {
          return toast.success('Success', { autoClose: 2000 })
        }
        toast.error('something went wrong', { autoClose: 2000 })
      })
      .catch(err => {
        toast.error('something went wrong', { autoClose: 2000 })
      })
  }

  function logout() {
    localStorage.clear();
    return location.replace('/')
  }

  function getData(date = "2021-03-19T03:31:46.000Z") {

    //default date is set for intial rendering

    let from = new Date(date).toISOString()

    const data = new FormData();
    data.append("from", from);
    axios.post('http://localhost:8000/data/time', data, { headers: { Authorization: `Bearer ${validate}` } })
      .then(res => {
        if (res.status == 200) {
          setData(res.data)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => { // allows to execute functions during initialization and on each render ......
    if (!token || !authenticate) location.replace('/');
    getData();
  }, [])

  return (
    <div>
      {token ? (
        <div className="parent_container">
          <div className='element-chart'>
            <Chart data={data && data} />
          </div>
          <div className='file_container'>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>

              <input 
                className='element-file' 
                accept={".csv"} 
                type={'file'} 
                onChange={e => setFile(e.target.files[0])} 
                />

              <Button
                func={() => upload()}
                label={"Upload csv file"}
              />
            </div>
            <div 
              className='date_container' 
              style={{ display: 'flex', alignItems: 'baseline' }} >
              <ReactDatePicker
                onChange={(e) => setValidDate(e)}
                selected={validDate}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeInput
              />
              <Button
                label={"Send"}
                func={() => getData(validDate)}
              />
            </div>
            <Button
              label={'Next'}
              func={() => { location.assign('/second') }}
            />
            <Button
              label={'logout'}
              func={() => logout()}
            />
          </div>
        </div>
      ) : (<></>)}
    </div>
  )
}

export default App;