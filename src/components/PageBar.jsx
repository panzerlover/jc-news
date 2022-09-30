import { useEffect, useState } from "react";
import { ButtonGroup, Button, Dropdown, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function PageBar({page, setPage, total_count, limit=10, setLimit, setError, type}){
    
    const [ searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState([]);
    
    useEffect(()=> {
            let newPage = searchParams.get("page");
            let newLimit = searchParams.get("limit");
            if (null !== newPage){
                let limitCheck = (newLimit) ? newLimit : limit;
                if (newPage > Math.ceil(total_count / limitCheck)){
                    setError(`page ${newPage} does not exist`)
                } else {
                    setPage(newPage)
                }
            }
            if (null !== newLimit && !isNaN(newLimit)){
                setLimit(newLimit)
            }
    }, [searchParams, setError, limit, setLimit, setPage, total_count])    
    
    useEffect(() => {
        setPages(()=> {
            let newArr = [];
            let total = Math.ceil(total_count/limit);
            for (let i = 0; i < total; i++){
                newArr.push(i + 1);
            }
            return newArr;
        })
    },[limit, total_count, setPage])
    
    const handleClick= (e)=> {
        if (type === "article"){
            setSearchParams({page: e.target.value})
        }
        setPage(e.target.value);
    }
    
    const handleLimit=(e, num)=> {
        setLimit(num);
        if (num * page > total_count){
            if (type === "article"){
                setSearchParams({page: 1, limit: num});
            }
            setPage(1);
        }
    }
    
    if (!page || !setPage || !total_count || !limit || !setLimit || !setError ) return <ErrorPage />

    const pageButtons = (
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
    )

    return (
        <Row style={{width: '100%'}}>
        <Col>
            {pageButtons}
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