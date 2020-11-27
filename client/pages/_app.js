import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../component/header';

const AppComponent = ({Component, pageProps, currentUserOutput}) => {
    return (
        <div>
            {/* <h1>WELCOME {currentUserOutput ? currentUserOutput.email : 'NOBODY'}</h1> */}
            <Header currentUserOutput={currentUserOutput} />
            <Component {...pageProps}/>
        </div>
    );
}

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    let data;
    try {
        data = await (await client.get('/api/users/current_user')).data;
    } catch (error) {
        data = {currentUserOutput: null}
    }

    let pageProps = {};
    if(appContext.Component.getInitialProps) {
        try {
            pageProps = await appContext.Component.getInitialProps(appContext.ctx);
        } catch (error) {
            pageProps = {}
        }
    }

    return {pageProps, ...data};
}

export default AppComponent