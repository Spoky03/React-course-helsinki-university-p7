import { useSelector} from 'react-redux'

export const FlashMessage = () => {

    const notification = useSelector(state => state.notification)
    

    return (
        <>
        <div className='bg-gray-900 text-white p-2 rounded-md'>
            {notification.type !== 'none' && notification.message}
            {notification.type === 'error' && <span className='text-red-500'>❌</span>}
            {notification.type === 'success' && <span className='text-green-500'>✅</span>}
            {notification.type === 'info' && <span className='text-blue-500'>ℹ️</span>}
        </div>
        </>
    )
}