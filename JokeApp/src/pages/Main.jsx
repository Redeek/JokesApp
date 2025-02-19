import { Button, Container, Grid, Slider} from "@mantine/core";
import {useState, useEffect} from "react"
import JokeQuestion from "../components/JokeQuestion";
import JokeAnswer from "../components/JokeAnswer";
import VotesButton from "../components/VotesButton";
import GenerateNewJokeButton from "../components/GenerateNewJokeButton";

function Main() {
    const [joke, setJoke] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const GetJoke = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/jokes")
            if(!response.ok){
                throw new Error("Something went wrong!")
            }

            const data = await response.json()
            setJoke(data)

        } catch (error) {
            console.error("Error fetching data:", error)
            setError(error)
        } finally{
            setLoading(false)
        }
    };
    
    useEffect(() => {
        GetJoke()
        
    }, []);
    
    if(loading){
        return <p>Loading joke</p>
    }

    if(error){
        return <p>Error: {error.message}</p>
    }

    

    return (
    <Container className="main">
        <Grid className="joke">
            <Grid.Col className="question" span={6}>
                <JokeQuestion question={joke?.question} />
            </Grid.Col>
            <Grid.Col className="answer" span={6}>
                <JokeAnswer answer={joke?.answer} />
            </Grid.Col>
        </Grid>

         <Grid className="votes">
            
        {
            joke?.votes?.map((vote) => (
                <Grid.Col span={4} key={vote._id}>
                    <VotesButton value={vote.value} label={vote.label} id={joke.id} onVote={setJoke} />
                </Grid.Col> 
            ))
        }
            
            
        </Grid> 

         <GenerateNewJokeButton Generate={GetJoke}/> 
        
        
    </Container>
    );
}

export default Main;