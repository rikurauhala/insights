import Skeleton from '@mui/material/Skeleton'

interface LoadingProps {
  id: string
}

const Loading = ({ id }: LoadingProps): JSX.Element => {
  return <Skeleton animation="wave" data-cy={`info-${id}-skeleton`} width={150} />
}

export default Loading
