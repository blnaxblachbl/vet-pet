import { Top, LoadingView, ProfileWithMenu } from "../../../components"
import { useUser } from "../../../utils/hooks"

const AddProfilePet = () => {
    const { user, loading } = useUser()
    return (
        <>
            <Top label="Питомцы" />
            <LoadingView loading={loading} />
            {
                !loading && (
                    <ProfileWithMenu>
                        {/* <PetContainer user={user} /> */}
                    </ProfileWithMenu>
                )
            }
        </>
    )
}

export default AddProfilePet