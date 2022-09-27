import { useEffect, useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';

import { getTopics } from '../utils/api';
import { upper } from '../utils/helpers';
import ErrorPage from './ErrorPage';
import LoadingSpinner from './Spinner';

export default function TopicList(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedtopic] = useState("");

    useEffect(()=> {
        setLoading(true);
        getTopics()
        .then((res)=> {
            setTopics(res.topics);
            setLoading(false);
        }).catch((error)=> {
            setLoading(false);
            setError(true);
        })

    }, []);

    useEffect(()=> {


    }, [selectedTopic])

    if (loading) return <LoadingSpinner loadingType="topics"/>
    if (error) return <ErrorPage />

    return (
        <Container>
                <h1>Browse Topics</h1>
            <ListGroup>
                {topics.map((topic)=> {
                    return (
                        <ListGroup.Item key={topic.slug} action href={`/articles/${topic.slug}`}>
                            {upper(topic.slug)}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Container>
    )

}