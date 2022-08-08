import { LoadingView, Top, ProfileWithMenu } from "../../../components"
import { useUser } from "../../../utils/hooks"
import PetContainer from "../../../containers/profile/pet"

const ProfilePet = () => {
    const { user, loading } = useUser()
    return (
        <>
            <Top label="Питомцы" />
            <LoadingView loading={loading} />
            {
                !loading && (
                    <ProfileWithMenu>
                        <PetContainer user={user} />
                    </ProfileWithMenu>
                )
            }
        </>
    )
}

export default ProfilePet