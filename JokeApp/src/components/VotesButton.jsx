import { Button, Notification } from "@mantine/core";
import { useState } from "react";

function VotesButton({value, label, id, onVote}) {
    const [notification, setNotification] = useState(null);
    
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
            
            setNotification({
                type: 'success',
                message: 'Voted successfully'
            })

        } catch (error) {
            console.error("Error: ",error)
            setNotification({
                type: 'error',
                message: 'Vote was unsuccessful'
            })
        }
        
    }

    return (<>
        <div>
            {notification && (
                <Notification
                    title={notification?.type === 'success' ? "You voted": "Error"}
                    onClose={() => setNotification(null)}
                    position="top-right"
                    style={{
                        zIndex:9999,
                        position: 'absolute',
                        top: '5px',
                        right: '5px'
                    }}
                >
                    {notification?.message}
                </Notification>
            )}
            
        </div>
    
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
    </> );
}

export default VotesButton;