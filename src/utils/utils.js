async function getToken() {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': `Basic ${btoa("2655377d40cf4ff4b1371f74164d1f79"+ ":" + "f4166a12c47e4f70bc903a04daf170d7")}`
            },
            body: "grant_type=client_credentials"
        });
        
        const auth = await response.json();
        localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
        
    } catch (error) {
        console.log(error);   
    }
}

export { getToken };
