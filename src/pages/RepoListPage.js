import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Button,
  Typography
} from '@mui/material';

import * as api from '../api/repositories';
import ListFilter from '../components/ListFilter';
import RepoList from '../components/RepoList';

const PAGE_SIZE = 10;

const filters = {
  ALL: 'all',
  FAVORITE: 'favorite',
};

const RepoListPage = () => {
  const [filter, setFilter] = useState(filters.ALL);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [starred, setStarred] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);

  // Fetching initial repos on page load
  useEffect(() => { 
    const initialFetch = async () => {
      try {
        const fetchedRepos = await api.fetch(limit);
        setRepos(fetchedRepos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    initialFetch();
  }, [])

  // Fetching starred repos from local storage
  useEffect(() => {
    const savedStars = JSON.parse(localStorage.getItem('stars'));
    if (savedStars) {
      setStarred(savedStars);
    }
  }, []);

  // Saving starred repos in local storage
  const saveStarred = (newStarred) => {
    localStorage.setItem('stars', JSON.stringify(newStarred));
  }

  // Handle star button click
  const onStarClick = (repo) => {
    let newStarred;
    if (starred[repo.id]) {
      newStarred = { ...starred };
      delete newStarred[repo.id]
    } else {
      newStarred = { ...starred, [repo.id]: repo };
    }
    setStarred(newStarred);
    saveStarred(newStarred);
  }

  // Handle load more button click
  const onLoadMoreClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const count = limit + PAGE_SIZE;
      const fetchedRepos = await api.fetch(count);
      setRepos(fetchedRepos);
      setLimit(count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // Showing correct list according to filter;
  let list;
  if (filter === filters.FAVORITE) {
    list = Object.values(starred).sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else {
    list = repos;
  }
  
  let content;
  if (!list.length) {
    if (loading) {
      content = (
        <Container sx={{textAlign: 'center'}}>
          <CircularProgress />
        </Container>
      ) 
    } else {
      if (error) {
        content = (
          <Container sx={{textAlign: 'center'}}>
            <Typography>We were unable to get list of repositories at this time.</Typography>
          </Container>
        )
      } else {
        content = (
          <Container sx={{textAlign: 'center'}}>
            <Typography>No repositories found.</Typography>
          </Container>
        ) 
      }
    }
  } else {
    let action = null;
    if (loading) {
      action = <CircularProgress />
    } else if (list.length === limit) {
      // If previous call failed, show try again button
      if (error) {
        action = (
          <> 
            <Typography>Failed to load more repositories.</Typography>
            <Button onClick={onLoadMoreClick}>Try again</Button>
          </>
        );
      } else {
        action = <Button onClick={onLoadMoreClick}>Load more</Button>
      }
    }

    content =  (
      <Container>
        <RepoList
          starred={starred}
          repos={list}
          onStarClick={onStarClick}
        />
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          {action}
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ display: 'flex', alignItems: 'center', padding: '20px 0 40px' }}>
        <Typography sx={{ flexGrow: 1 }} variant="h2">Github trending repositories</Typography>
        <Box>
          <ListFilter filter={filter} onFilterChange={setFilter} />
        </Box>
      </Container>
      {content}
    </>
  );
};

export default RepoListPage;