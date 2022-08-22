const WeatherTable = (props) => {
  if (props.datas.length <= 0) {
    return (
      <p>Input City Name and click search button</p>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Description</th>
          <th>Date Time</th>
        </tr>
      </thead>
      <tbody>
        {props.datas.map((dt, index) => (
          <tr key={index + "tr"}>
            <td>{dt.city}</td>
            <td>{dt.description}</td>
            <td>{dt.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WeatherTable