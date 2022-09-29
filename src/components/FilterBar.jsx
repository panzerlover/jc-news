import { useEffect, useState } from "react";
import { Container, Col, Navbar, Row, DropdownButton, Dropdown } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { getTopics } from "../utils/api";
import { upper } from "../utils/helpers";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./Spinner";

export default function FilterBar ({filters, setFilters}) {

    const {topic_slug} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [topics, setTopics] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(()=> {
        setLoading(true);
        getTopics().then(
            (res)=> {
                setTopics(res.topics)
                setLoading(false);
            }
        ).catch((err)=> {
            setLoading(false);
            setError(true);
        })
    },[])

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
    if (loading) return <LoadingSpinner loadingType="Topics"/>;
    if (error) return <ErrorPage />

    return (
        <Container>
            <Navbar bg="light" fixed="top" style={{top : "50px"}} className="justify-content-center">
            <Row sm={3}>
                <Col>
                <DropdownButton size="sm" title="Topic">
                        {topics.map((topic)=> 
                           topic.slug === topic_slug ?
                           <Dropdown.Item href={`/articles/${topic.slug}`} style={{textDecoration: 'underline'}}>
                           {topic.slug}
                       </Dropdown.Item>
                           :
                            <Dropdown.Item href={`/articles/${topic.slug}`}>
                                {topic.slug}
                            </Dropdown.Item>
                        )}
                </DropdownButton>
                </Col>
                {filterVals.map((obj)=> {
                    return (
                        <Col>
                        <DropdownButton size="sm" title={obj.label}>
                                    {obj.options.map((o)=> 
                                    searchParams.get(obj.value) === o[1] ? 
                                    <Dropdown.Item 
                                    onClick={(e)=> handleClick(e, obj.value, o[1])}
                                    style={{textDecoration: 'underline'}}
                                    >
                                    {o[0]}
                                    </Dropdown.Item>
                                    :
                                    <Dropdown.Item 
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