import { Button, Grid } from "@mantine/core";

function VotesButton({value, label, id, onVote}) {

    const addVote = async () => {

        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({value, label})
            }
    
            const response = await fetch(`http://localhost:3000/api/jokes/${id}`, requestOptions)
            
            if(!response.ok){
                throw new Error('Something went wrong, try again later!')
            }
            const updatedJoke = await response.json()
            
            onVote((prevJoke) => ({...prevJoke, votes:updatedJoke.joke.votes}))
            
        } catch (error) {
            console.error("Error: ",error)
        }
        
    }

    return (
    
        <Button 
            onClick={() => addVote()} 
            className="voteButton" 
            style={{
                width:"100%", 
                maxHeight:"3.5rem", 
                height:"4rem",
                display:"flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems:"center",
                textAlign:"center"
            }}>
            <p> {label} </p>
            <p> {value} </p>
        </Button>
     );
}

export default VotesButton;