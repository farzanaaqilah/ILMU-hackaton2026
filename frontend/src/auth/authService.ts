import { UserManager, type UserManagerSettings } from "oidc-client-ts";

const isProduction = window.location.hostname !== "localhost";

const cognitoAuthConfig: UserManagerSettings = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_5RC7Fmxvw",
  client_id: "6uglhlag7hsj32lgepfuso6tvd",
  redirect_uri: isProduction
    ? "https://d84l1y8p4kdic.cloudfront.net/auth/callback"
    : `${window.location.origin}/auth/callback`,
  response_type: "code",
  scope: "phone openid email",
};

export const userManager = new UserManager(cognitoAuthConfig);

// 1. Redirect to Cognito Hosted Login
export async function signInWithCognito() {
  await userManager.signinRedirect();
}

// 2. Handle callback when Cognito returns with code
export async function handleCognitoCallback() {
  const user = await userManager.signinCallback();
  if (user) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", user.profile?.email || "");
    localStorage.setItem("idToken", user.id_token || "");
    localStorage.setItem("accessToken", user.access_token);
    window.dispatchEvent(new Event("authChange"));
  }
  return user;
}

// 3. Logout from Cognito
export async function signOutCognito() {
  const clientId = "6uglhlag7hsj32lgepfuso6tvd";
  const logoutUri = isProduction
    ? "https://d84l1y8p4kdic.cloudfront.net"
    : window.location.origin;

  // Replace with your Cognito domain if configured
  const cognitoDomain = "https://us-east-25rc7fmxvw.auth.us-east-2.amazoncognito.com";

  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("idToken");
  localStorage.removeItem("accessToken");
  window.dispatchEvent(new Event("authChange"));

  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
}