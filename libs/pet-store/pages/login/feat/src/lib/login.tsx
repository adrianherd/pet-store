import styles from './login.module.scss';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '@pet-store/shared/core/user/data-access';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserAuthContext)


  const loginHandler = async () => {
    const loginUrl = new URL('http://localhost:8080/api/v3/user/login')
    loginUrl.searchParams.append('email', email);
    loginUrl.searchParams.append('password', password);

    try {
      setLoading(true);
      await fetch(loginUrl);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    setIsAuthenticated(true)
    navigate('/pet-list')
  }
  return (
    <Box width={1} height={'100vh'} justifyContent={'center'} alignContent={'center'} >
      <Container maxWidth={'sm'}>
        <Card className={styles.card}>
          <form onSubmit={(event) => {
            event.preventDefault();
            void loginHandler();
          }}>
            <CardHeader title="Pet Store SSO" />
            <CardContent>
              <Stack spacing={2}>
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
              </Stack>
            </CardContent>
            <CardActions>
              <Box justifyContent={'center'} width={1}>
                <Button disabled={loading} onClick={loginHandler} variant="contained">
                  Login
                </Button>
                <Box mb={2}></Box>
                {loading && <LinearProgress />}
              </Box>
            </CardActions>
          </form>
        </Card>
      </Container>
    </Box>
  )
}

export default Login;
