import { Button, Grid } from "@mantine/core";

function GenerateNewJokeButton({Generate}) {
    return (
    <Grid className="generateJoke">
        <Grid.Col>  
            <Button onClick={() => Generate()} className="generateNewJokeButton"  style={{color:'black'}} size="lg">
                Generate new Joke!
            </Button>
        </Grid.Col>
    </Grid>
     );
}

export 

default GenerateNewJokeButton;