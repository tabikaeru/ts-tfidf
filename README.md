# ts-tfidf
TypeScript tfidf library.

# Usage
```jsx
import { useModal } from 'ts-tfidf'

const MyModal = ({isVisible, onClose})=>(
    <Modal isVisible={isVisible}>
        <button onClick={onClose}>Close</button>
    </Modal>
)

const Page = ()=>{
    const [isVisible, onOpen, onClose] = useModal()
    return (
        <Fragment>
            <div>
                <button onClick={onOpen}>Open </button>
            </div>
            <MyModal isVisible={isVisible} onClose={onClose}/>
        </Fragment>
    )
}
```