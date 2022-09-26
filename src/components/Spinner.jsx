import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner({loadingType}){
    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{`Loading ${loadingType}...`}</span>
        </Spinner>
    )
}