import { LoadingView, Top, ProfileWithMenu } from "../../components"
import { useUser } from "../../utils/hooks"
import ProfileContainer from "../../containers/profile"

const Profile = () => {
    const { user, loading } = useUser()
    return (
        <>
            <Top label="Профиль" />
            <LoadingView loading={loading} />
            {
                !loading && (
                    <ProfileWithMenu>
                        <ProfileContainer user={user} />
                    </ProfileWithMenu>
                )
            }
        </>
    )
}

export default Profile