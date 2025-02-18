import { Grid } from "@mantine/core";
import {useState, useEffect} from "react"
import JokeQuestion from "../components/JokeQuestion";
import JokeAnswer from "../components/JokeAnswer";

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
            console.log(data)
            setJoke(data)

        } catch (error) {
            console.error("Error fetching data:", error)
        } finally{
            setLoading(false)
        }
    };
    
    useEffect(() => {
        GetJoke();
    }, []);
    
    if(loading){
        return <p>Loading joke</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

    

    return ( <>
    <div className="">
        <Grid className="Joke">
            <Grid.Col className="Question">
                <JokeQuestion question={joke?.question} />
            </Grid.Col>
            <Grid.Col className="Answer">
                <JokeAnswer answer={joke?.answer} />
            </Grid.Col>
        </Grid>
        <Grid className="Votes">
            Votes
            <> </>
        </Grid>
    </div>
    </> );
}

export default Main;