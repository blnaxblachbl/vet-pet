import { Top } from '../../components'
import CreateAdForm from '../../containers/ad/create'

const CreateAd = () => {
    return (
        <>
            <Top label='Добавление объявления' />
            <CreateAdForm />
        </>
    )
}

export default CreateAd