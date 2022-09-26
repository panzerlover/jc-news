import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';

import { getTopics } from '../utils/api';
import ErrorPage from './ErrorPage';
import LoadingSpinner from './Spinner';

export default function TopicList(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [topics, setTopics] = useState([]);

    useEffect(()=> {
        setLoading(true);
        getTopics()
        .then((res)=> {
            setTopics(res.topics);
            setLoading(false);
        }).catch((error)=> {
            console.error(error);
            setLoading(false);
            setError(true);
        })

    }, []);

    if (loading) return <LoadingSpinner loadingType="topics"/>
    if (error) return <ErrorPage />

    return (
        <div>

            <h1>Topics</h1>
            <Accordion>
                {topics.map((topic)=> {
                    return (
                        <AccordionItem key={topic.slug} eventKey={topic.slug}>
                        <Accordion.Header>{topic.slug}
                        </Accordion.Header>
                        <Accordion.Body>
                        <p>{topic.description}</p>
                        <Button variant="light" href={`/topics/${topic.slug}`}>Check it Out</Button>
                        </Accordion.Body>
                        
                    </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )

}