import { v4 as uuidV4} from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is feeback item 1',
            rating:10
        },
        {
            id: 2,
            text: 'This item is feeback item 2',
            rating:9
        },
        {
            id: 3,
            text: 'This item is feeback item 3',
            rating:7
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidV4()
        setFeedback([newFeedback,...feedback])
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updItem} : item
            ))
        )
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
    {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;