import { Col, Row, Spinner } from "react-bootstrap";

export default function LoadingSpinner({loadingType}){
    return (
      <Col className="align-middle">{`Loading ${loadingType}...`}
        <Row>
        <Spinner animation="border" role="status" className="d-block mx-auto">
        </Spinner>
        </Row>
      </Col>
    )
}