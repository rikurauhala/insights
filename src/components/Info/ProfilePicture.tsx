import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

interface ProfilePictureProps {
  url: string | null
}

const ProfilePicture = ({ url }: ProfilePictureProps): JSX.Element => {
  const size = '175px'

  const style = {
    borderRadius: '50%',
    height: size,
    margin: '2rem 0',
    width: size,
  }

  if (!url) {
    return <Skeleton data-cy="info-profile-picture-skeleton" sx={style} variant="circular" />
  }

  return (
    <Box
      alt="Profile picture"
      component="img"
      data-cy="info-profile-picture"
      src={url}
      sx={style}
    />
  )
}

export default ProfilePicture
