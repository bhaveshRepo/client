import { useEffect, useState } from 'react'
import { Button } from '../components/Button';
import ReactDatePicker from 'react-datepicker';
import './App.css'
import { Chart } from '../components/Chart';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { LoginContext } from '../Auth';
import TimeSeries from '../components/TimeSeries';

function SecondPage() {


  const { token, authenticate } = LoginContext();

  const validate = localStorage.getItem('token');
  const [validDate, setValidDate] = useState(new Date().setFullYear(2021, 2));
  const [data, setdata] = useState();
  const [file, setFile] = useState();

  // in csv file data consisted only two values for year , so in ecma script by default it counted
  // them 1921 so i manually fomratted date to 2021 as a work around .

  function upload() {
    if (!file) {
      return alert('Your file is empty');
    }


    const data = new FormData();
    data.append('csvFile', file);

    axios.post('http://localhost:8000/file/upload', data,
      { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${validate}` } }
    )
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  function logout() {
    localStorage.clear();
    return location.replace('/')
  }

  function getData(date = "2021-03-19T03:31:46.000Z") {
    let from = new Date(date)
    let to = new Date(from).setHours(from.getHours() + 3)

    from = from.toISOString();
    to = new Date(to).toISOString();

    const formData = new FormData();
    formData.append("from", from);
    formData.append("to", to)
    axios.post('http://localhost:8000/data/quarter', formData, { headers: { Authorization: `Bearer ${validate}` } })
      .then(res => {
        if (res.status == 200) {
          setdata(res.data)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!token || !authenticate) {
      return location.replace('/')
    }

    getData()
  }, [])

  return (
    <div>

      {token ? (

        <div className="parent_container">
          <div className='element-chart'>
            <TimeSeries
              value={data && data.data}
            />
          </div>
          <div className='file_container'>
            <div
              style={{ display: 'flex', alignItems: 'baseline' }}>

              <input className='element-file' type={'file'} onChange={e => setFile(e.target.files[0])} accept={".csv"} />

              <Button
                label={"Upload csv file"}
                func={() => upload()}
              />
            </div>
            <div className='date_container' style={{ display: 'flex', alignItems: 'baseline' }} >
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
              label={'Previous'}
              func={() => { location.assign('/home') }}
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

export default SecondPage
