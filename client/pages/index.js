import buildClient from '../api/buildClient';

const LandingPage = ({currentUserOutput}) => {
    console.log("currentUserOutput: ", currentUserOutput);
return currentUserOutput ? <h1>welcome {currentUserOutput.email}</h1> : <h1>You aren't signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
    console.log("getInitialProps LANDING PAGE");
    try {
        const client = buildClient(context)
        const {data} = await client.get('/api/users/current_user')
        return data;
    } catch (error) {
        return {currentUserOutput: null};
    }

}

export default LandingPage;