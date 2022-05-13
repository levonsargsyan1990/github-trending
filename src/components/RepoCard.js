import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Box } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';

const RepoCard = ({ repo, isStarred = false, onStarClick }) => {
  return (
    <Card sx={{
      display: 'flex',
      marginBottom: '10px',
      width: '100%'
    }}>
      <Box sx={{ flexGrow: 1 }}>
        <CardHeader
          component="a"
          target="_blank"
          href={repo.html_url}
          title={repo.full_name}
        />
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {repo.description}
              </Typography>
            </Box>
            <Box>
              
            </Box>
          </Box>
        </CardContent>
      </Box>
      <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', flexBasis: '100px' }}>
        <Box>
          <Typography variant="button" sx={{ verticalAlign: 'middle' }}>
            {isStarred ? repo.stargazers_count + 1: repo.stargazers_count}
          </Typography>
          <IconButton aria-label="star" onClick={() => onStarClick(repo)}>
            {isStarred ? <Star /> : <StarOutline />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RepoCard;