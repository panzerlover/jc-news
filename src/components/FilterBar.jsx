import { Container, Col, Navbar, Row, DropdownButton, Dropdown } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "./Spinner";

export default function FilterBar ({topics}) {

    const {topic_slug} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    
    const filterVals = [
        {
            label: "Sort",
            value: "sort_by",
            options: [
                ["Number of Votes", "votes"],
                ["Post Date", "created_at"],
                ["Post Author", "author"],
                ["Number of Comments", "comment_count"],
                ["Article Title", "title"]
            ]
         },
        { label: "Order",
        value: "order",
        options: [
            ["Ascending", "asc"],
            ["Descending", "desc"]
        ]}
    ]

    function handleClick(e, filterType, filterVal){
        setSearchParams((old)=> {
            const newVals = {}
            old.forEach((a, b)=> newVals[b] = a);
            newVals[filterType] = filterVal;
            return newVals;
        })
    }


    const topicButton = (
        <DropdownButton key="topicDropdown"size="sm" title="Topic">
                        {topics.map((topic)=> 
                           topic.slug === topic_slug ?
                           <Dropdown.Item key={topic_slug} href={`/articles/${topic.slug}`} style={{textDecoration: 'underline'}}>
                           {topic.slug}
                            </Dropdown.Item>
                           :
                            <Dropdown.Item key={topic.slug} href={`/articles/${topic.slug}`}>
                                {topic.slug}
                            </Dropdown.Item>
                        )}
                </DropdownButton>
    )

    return (
        <Container>
            <Navbar bg="light" fixed="top" style={{top : "50px"}} className="justify-content-center">
            <Row sm={3}>
                <Col key="topicCol">
                {topics === [] || topics.length === 0 || !topics ? <LoadingSpinner/> : topicButton}               
                </Col>
                {filterVals.map((obj)=> {
                    return (
                        <Col key={obj.label + "column"}>
                        <DropdownButton key={obj.label + "Dropdown"} size="sm" title={obj.label}>
                                    {obj.options.map((o)=> 
                                    searchParams.get(obj.value) === o[1] ? 
                                    <Dropdown.Item key={o[1]}
                                    onClick={(e)=> handleClick(e, obj.value, o[1])}
                                    style={{textDecoration: 'underline'}}
                                    >
                                    {o[0]}
                                    </Dropdown.Item>
                                    :
                                    <Dropdown.Item key={o[1]}
                                    onClick={(e)=> handleClick(e, obj.value, o[1])}>{o[0]}</Dropdown.Item>
                                    )}
                        </DropdownButton>
                        </Col>
                    )
                })}
            </Row>
        </Navbar>
        </Container>
    )


}