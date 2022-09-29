import { useEffect, useState } from "react";
import { ButtonGroup, Button, Dropdown, Row, Col } from "react-bootstrap";

export default function PageBar({page, setPage, total_count, limit=10, setLimit}){

    const [pages, setPages] = useState([]);

   useEffect(() => {
    setPages(()=> {
        let newArr = [];
        let total = Math.ceil(total_count/limit);
        for (let i = 0; i < total; i++){
            newArr.push(i + 1);
        }
        return newArr;
    })
   },[])

    const handleClick= (e)=> {
        console.log(page);
        setPage(e.target.value);
    }

    const handleLimit=(e, num)=> {
        setLimit(num);
    }

    return (
        <Row style={{width: '100%'}}>
        <Col>
        <ButtonGroup>
            {pages.map((p)=> 
               <Button
               key={p}
               variant={p === parseInt(page) ? 'primary' : 'outline-primary'}
               value={p}
               onClick={handleClick}
               >
               {p}
             </Button>
            )}
        </ButtonGroup>
        </Col>
        <Col>
        <Dropdown drop={"up"}>
            <Dropdown.Toggle variant="primary" id="page-limit">
                {limit} per page
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={(e)=> handleLimit(e, 10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={(e)=> handleLimit(e, 20)}>20</Dropdown.Item>
                <Dropdown.Item onClick={(e)=> handleLimit(e, 30)}>30</Dropdown.Item>
                <Dropdown.Item onClick={(e)=> handleLimit(e, 50)}>50</Dropdown.Item>
                <Dropdown.Item onClick={(e)=> handleLimit(e, 100)}>100</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>            
        </Col>
        </Row>
    )


}