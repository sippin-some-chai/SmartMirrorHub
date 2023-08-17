const getAccessToken = async () => {
	  const refresh_token = "AQAqito_bJOOOEv90jT8yGigx_Va5RvSW3gzrZK6TWRCPjA2yQTmcCdd4Rg8NZQ2rBMDdP0JM3iKedgzoqD5ekSxkCS-f2sLSVb_TYOhA16BA7rI6XdLFZtG1tZzAKKRpx4";

	  const response = await fetch("https://accounts.spotify.com/api/token", {
		      method: "POST",
		      headers: {
			            Authorization: `Basic ${Buffer.from(
					            `8a83aa532729407ca66c24929e6fe046:0c3961a38bf543f5b6e7243942e8a273`
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
