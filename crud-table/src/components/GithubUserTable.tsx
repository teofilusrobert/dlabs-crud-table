import React, { useEffect, useState } from 'react';

type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

const GithubUserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users!")
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Login</th>
          <th>ID</th>
          <th>Node ID</th>
          <th>Profile URL</th>
          <th>Followers URL</th>
          <th>Following URL</th>
          <th>Gists URL</th>
          <th>Starred URL</th>
          <th>Subscriptions URL</th>
          <th>Organizations URL</th>
          <th>Repos URL</th>
          <th>Events URL</th>
          <th>Received Events URL</th>
          <th>Type</th>
          <th>Site Admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <img src={user.avatar_url} alt={user.login} width="50" height="50" />
            </td>
            <td>{user.login}</td>
            <td>{user.id}</td>
            <td>{user.node_id}</td>
            <td>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </td>
            <td>
              <a href={user.followers_url} target="_blank" rel="noopener noreferrer">
                Followers
              </a>
            </td>
            <td>
              <a href={user.following_url.replace("{/other_user}", "")} target="_blank" rel="noopener noreferrer">
                Following
              </a>
            </td>
            <td>
              <a href={user.gists_url.replace("{/gist_id}", "")} target="_blank" rel="noopener noreferrer">
                Gists
              </a>
            </td>
            <td>
              <a href={user.starred_url.replace("{/owner}{/repo}", "")} target="_blank" rel="noopener noreferrer">
                Starred
              </a>
            </td>
            <td>
              <a href={user.subscriptions_url} target="_blank" rel="noopener noreferrer">
                Subscriptions
              </a>
            </td>
            <td>
              <a href={user.organizations_url} target="_blank" rel="noopener noreferrer">
                Organizations
              </a>
            </td>
            <td>
              <a href={user.repos_url} target="_blank" rel="noopener noreferrer">
                Repos
              </a>
            </td>
            <td>
              <a href={user.events_url.replace("{/privacy}", "")} target="_blank" rel="noopener noreferrer">
                Events
              </a>
            </td>
            <td>
              <a href={user.received_events_url} target="_blank" rel="noopener noreferrer">
                Received Events
              </a>
            </td>
            <td>{user.type}</td>
            <td>{user.site_admin ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GithubUserTable;
