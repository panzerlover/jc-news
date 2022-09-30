import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function ErrorPage({error}){

    const navigate = useNavigate();

    if (error) return (
        <Container>
        <p>{error}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button href="/">Home</Button>
        </Container>
    )

    return (
        <p>Oops, something went wrong...</p>
    )

}