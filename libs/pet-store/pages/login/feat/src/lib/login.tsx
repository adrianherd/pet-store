import styles from './login.module.scss';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IS_AUTHENTICATED_TOKEN } from '@pet-store/shared/core/user/util';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    const loginUrl = new URL('http://localhost:8080/user/login')
    loginUrl.searchParams.append('email', email);
    loginUrl.searchParams.append('password', password);

    try {
      setLoading(true);
      const resp = await fetch(loginUrl);
      setLoading(false);
      console.log(resp)
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    sessionStorage.setItem(IS_AUTHENTICATED_TOKEN, 'true')
    navigate('/pet-list')
  }
  return (
    <Card className={styles.card}>
      <form onSubmit={(event) => {
        event.preventDefault();
        void loginHandler();
      }}>
        <CardHeader title="Pet Store SSO" />
        <CardContent>
          <div>
            <TextField
              required
              id="user-email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <TextField
              required
              id="user-password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </CardContent>
        <CardActions>
          <div>
            <Button disabled={loading} onClick={loginHandler} variant="contained">
              Login
            </Button>
            {loading && <LinearProgress />}
          </div>
        </CardActions>
      </form>
    </Card>
  );
}

export default Login;
