

const Student = (props) => {
    return <div>
    {
        Object.keys(props).length > 0 ? <>
        <h2>{props.name.first} {props.name.last}</h2>
        <p><strong>{props.major}</strong></p>
        <p>{props.name.first} is taking {props.numCredits} credits.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map((interest, index) => (
              <li key={`${props.id}-${index}`}>{interest}</li>
            ))}
          </ul>
    </> : <p>Loading...</p>
    }
    </div>
}

export default Student;