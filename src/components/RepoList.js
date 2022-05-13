import RepoCard from './RepoCard';

const RepoList = ({ starred, repos, onStarClick }) => {
  return repos.map(repo => <RepoCard
    key={repo.id}
    isStarred={starred[repo.id]}
    onStarClick={onStarClick}
    repo={repo}/>)
};

export default RepoList;
