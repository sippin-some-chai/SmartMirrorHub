const getAccessToken = async () => {
	  const refresh_token = process.env.SPOTIFY_REFRESH

	  const response = await fetch("https://accounts.spotify.com/api/token", {
		      method: "POST",
		      headers: {
			            Authorization: `Basic ${Buffer.from(
					            `SPOTIFY_AUTH`
					          ).toString("base64")}`,
			            "Content-Type": "application/x-www-form-urlencoded",
			          },
		      body: new URLSearchParams({
			            grant_type: "refresh_token",
			            refresh_token,
			          }),
		    });

	  return response.json();
};


export const currentlyPlayingSong = async () => {
	  const { access_token } = await getAccessToken();

      const spotData = fetch("https://api.spotify.com/v1/me/player/currently-playing", {
              headers: {
                        Authorization: `Bearer ${access_token}`,
                      },
            });
     if (!spotData.ok) {
        return null;
     }
    return spotData;
};
